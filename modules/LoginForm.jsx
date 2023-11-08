import { Formik, Field, Form } from "formik";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { firebaseConfig } from "@/pages/api/firebase";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useState } from "react";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState();

  const handleLogin = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      Swal.fire("Başarılı!", "Giriş başarılı.", "success");
      localStorage.setItem("isLoggedIn", "true");

      router.push("/");
    } catch (error) {
      Swal.fire("Hata!", error.message, "error");
    }
  };
  return (
    <section className="login-form">
      <div className="login-bg"></div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
      >
        <Form className="absolute lg:left-40 left-0 top-[24%] p-4 m-3">
          <div className="flex items-center gap-3">
            <Link href={"/"}>
              <Image
                className="w-full h-auto object-cover p-3"
                // layout="responsive"
                src="/logo.png"
                width={100}
                height={40}
              />
            </Link>

            <p className="text-white font-bold text-lg">
              E-Commerce from aborkkk
            </p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              className="login-input"
              placeholder="info@example.com"
              type="email"
            />
          </div>
          <div className="mt-3 relative">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              className="login-input"
              placeholder="*******"
              type={showPassword ? "text" : "password"}
            />
            <div className="absolute right-4 top-11 opacity-20 flex items-center">
              <BsEyeSlash
                size={25}
                className={`text-white ${showPassword ? "hidden" : ""}`}
                onClick={() => setShowPassword(true)}
              />
              <BsEye
                size={25}
                className={`text-white ${showPassword ? "" : "hidden"}`}
                onClick={() => setShowPassword(false)}
              />
            </div>
            <Link
              href={"/"}
              className="text-white text-xs text-end opacity-50 transition-opacity hover:opacity-100"
            >
              Forgot Password
            </Link>
          </div>
          <div className="table m-auto w-full text-center">
            <button
              type="submit"
              className="bg-green-500 w-full rounded-md text-white mt-4 p-3 transition-all hover:bg-[#517a98]/80"
            >
              Login
            </button>
            <p className="mt-3 text-white text-sm opacity-70">or</p>
            <Link href={"/user/register"}>
              <button
                type="submit"
                className="bg-[#517a98] w-1/2 m-auto table rounded-md text-white mt-4 p-3 transition-all hover:bg-[#517a98]/80"
              >
                Register
              </button>
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

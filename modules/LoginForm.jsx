import { Formik, Field, Form } from "formik";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { firebaseConfig } from "@/pages/api/firebase";
import { useRouter } from "next/router";
import { FcFactory } from "react-icons/fc";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginForm() {
  const router = useRouter();
  const handleLogin = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      Swal.fire("Başarılı!", "Giriş başarılı.", "success");
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
        <Form className="absolute left-40 top-[30%]">
          <div className="flex items-center gap-3">
            <FcFactory size={70} className="mb-3" />
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
          <div className="mt-3">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              className="login-input"
              placeholder="*******"
              type="password"
            />
            <Link
              href={"/"}
              className="text-white text-xs text-end opacity-50 transition-opacity hover:opacity-100"
            >
              Forgot Password
            </Link>
          </div>

          <button
            className="bg-blue-500 w-full rounded-md text-white mt-4 p-3 transition-all hover:bg-blue-950"
            type="submit"
          >
            Login
          </button>
        </Form>
      </Formik>
    </section>
  );
}

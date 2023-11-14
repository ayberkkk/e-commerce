import { Formik, Field, Form, ErrorMessage } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "@/pages/api/firebase";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState();
  const handleRegistration = async (values, { resetForm }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      Swal.fire("Success!", "Registration is complete.", "success");
      resetForm();
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
      resetForm();
    }
  };

  return (
    <section className="login-form">
      <div className="login-bg"></div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          if (!values.email) {
            errors.email = "Email is required";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          return errors;
        }}
        onSubmit={handleRegistration}
      >
        <Form className="absolute lg:left-40 left-0 top-[21.5%] p-4 m-3">
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
            <label htmlFor="name">Name</label>
            <Field
              id="name"
              name="name"
              className="login-input"
              placeholder="Full Name"
              type="text"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 font-bold text-xs"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              className="login-input"
              placeholder="info@example.com"
              type="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 font-bold text-xs"
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
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 font-bold text-xs"
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
          </div>
          <div className="table m-auto w-full text-center">
            <button
              type="submit"
              className="bg-[#517a98] w-full m-auto table rounded-lg text-white mt-4 p-3 transition-all hover:bg-[#517a98]/80"
            >
              Register
            </button>
            <p className="mt-3 text-white text-sm opacity-70">or</p>
            <Link href={"/user/login"}>
              <button
                type="submit"
                className="bg-green-500 w-1/2 m-auto table rounded-lg text-white mt-4 p-3 transition-all hover:bg-[#517a98]/80"
              >
                Login
              </button>
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

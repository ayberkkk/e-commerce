import { Formik, Field, Form } from "formik";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "@/pages/api/firebase";
import Swal from "sweetalert2";
import { FcOrganization } from "react-icons/fc";
import Link from "next/link";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function RegisterForm() {
  const handleRegistration = async (values, { resetForm }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      Swal.fire("Başarılı!", "Kayıt işlemi tamamlandı.", "success");
      resetForm();
    } catch (error) {
      Swal.fire("Hata!", error.message, "error");
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
        onSubmit={handleRegistration}
      >
        <Form className="absolute left-40 top-[30%]">
          <div className="flex items-center gap-3">
            <FcOrganization size={70} className="mb-3" />
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
          </div>
          <div className="table m-auto w-full text-center">
            <button
              type="submit"
              className="bg-blue-500 w-full rounded-md text-white mt-4 p-3 transition-all hover:bg-transparent hover:bg-blue-950"
            >
              Register
            </button>
            <p className="mt-3 text-white text-sm opacity-70">or</p>
            <Link href={"./LoginForm"}>
              <button
                type="submit"
                className="bg-green-500 w-1/2 m-auto table rounded-md text-white mt-4 p-3 transition-all hover:bg-transparent hover:bg-blue-950"
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

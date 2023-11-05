import { useState } from "react";
import LoginForm from "@/modules/LoginForm";
import RegisterForm from "@/modules/RegisterForm";
import Layout from "@/pages/main/home";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      {isLoggedIn ? (
        <>
          <Layout />
        </>
      ) : (
        <>
          <LoginForm />
          <RegisterForm />
        </>
      )}
    </>
  );
}

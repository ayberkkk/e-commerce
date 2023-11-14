import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useMember = () => {
  const auth = getAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userLoggedIn");
        router.push("/");
      })
      .catch((error) => {
        console.error("Çıkış sırasında hata oluştu: ", error);
      });
  };

  return {
    userLoggedIn,
    handleLogout,
  };
};
export const adminMenu = [
  {
    path: "/admin",
    title: "Home",
  },
  {
    path: "/admin/pages/products",
    title: "Products",
  },
  {
    path: "/admin/pages//orders",
    title: "Orders",
  },
  {
    path: "/admin/pages/members",
    title: "Members",
  },
];

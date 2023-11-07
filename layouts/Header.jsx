import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import CategoryList from "@/pages/api/category";
import Link from "next/link";
import { FcCloth } from "react-icons/fc";
import { Menu } from "@headlessui/react";
import { GoPackage } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import { PiBasketLight } from "react-icons/pi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

export default function Header() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState();

  const router = useRouter();

  const auth = getAuth();

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
        localStorage.removeItem(userLoggedIn, false);
        router.push("/");
      })
      .catch((error) => {
        console.error("Çıkış sırasında hata oluştu: ", error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const mobileToggle = () => {
    setMobile(!mobile);
  };

  return (
    <header className="bg-white border border-b-2 flex justify-between items-center px-6 relative z-[99] p-3">
      <div className="lg:block flex items-center">
        <FcCloth size={50} />
        {mobile ? (
          <AiOutlineClose
            size={30}
            className="lg:hidden block z-20 absolute right-10 top-10"
            onClick={mobileToggle}
          />
        ) : (
          <AiOutlineMenu
            size={30}
            className="lg:hidden block"
            onClick={mobileToggle}
          />
        )}
      </div>
      <nav className="lg:block hidden">
        <CategoryList />
      </nav>
      {mobile && (
        <div
          className={`fixed z-10 top-0 left-0 bg-white w-full h-screen transition-transform ${
            mobile ? "translate-y-0" : "-translate-y-full"
          } ease-out duration-500`}
        >
          <CategoryList />
        </div>
      )}
      <div className="flex items-center justify-center gap-4">
        {userLoggedIn ? (
          <>
            <Menu as="div" className="relative">
              <div>
                <Menu.Button
                  className="flex items-center gap-2 bg-green-500 text-white rounded-md p-2 transition-all hover:bg-green-700"
                  onClick={toggleMenu}
                >
                  Account
                  {menuOpen ? <BsChevronUp /> : <BsChevronDown />}
                </Menu.Button>
              </div>
              {menuOpen && (
                <Menu.Items className="origin-top-right absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-[whiteSmoke] ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/account"
                        className={`${
                          active ? "bg-green-500 text-white" : "text-gray-900"
                        } group flex items-center gap-2 px-4 py-2 text-md`}
                      >
                        <GoPackage />
                        Orders
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active
                            ? "bg-green-500 text-white w-full"
                            : "text-gray-900"
                        } group flex items-center gap-2 px-4 py-2 text-md`}
                      >
                        <SlLogout />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </Menu>
            <Link
              href={"/basket"}
              className="border border-green-500 text-black rounded-md p-2 bg-transparent transition-all hover:bg-green-500 hover:text-white"
            >
              <PiBasketLight size={20} />
            </Link>
          </>
        ) : (
          <>
            <Link
              className="bg-green-500 text-white rounded-md p-2 transition-all hover:bg-green-700"
              href="/user/login"
            >
              Giriş Yap
            </Link>
            <Link
              className="border border-green-500 text-black rounded-md p-2 bg-transparent transition-all hover:bg-green-500 hover:text-white"
              href="/user/register"
            >
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

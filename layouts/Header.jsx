import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryList from "@/pages/api/category";
import { useCart } from "@/context/CartContext";
import { Menu } from "@headlessui/react";
import { useMember } from "@/utils/const";
import { AiOutlineHeart } from "react-icons/ai";
import { GoPackage } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import { PiBasketLight } from "react-icons/pi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

export default function Header() {
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState();
  const { cart } = useCart();

  const { userLoggedIn, handleLogout } = useMember();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const mobileToggle = () => {
    setMobile(!mobile);
  };

  return (
    <header className="bg-white border border-b-2 flex justify-between items-center px-6 relative z-[99] p-3">
      <div className="lg:block flex items-center">
        <Link href={"/"}>
          <Image
            className="lg:w-[100px] h-auto object-cover"
            src="/logo.png"
            width={50}
            height={40}
          />
        </Link>
        {mobile ? (
          <AiOutlineClose
            size={30}
            className="lg:hidden block z-20 absolute right-10 top-10"
            onClick={mobileToggle}
          />
        ) : (
          <AiOutlineMenu
            size={30}
            className="lg:hidden block ml-3"
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
                  className="flex items-center gap-2 bg-[#517a98] text-white rounded-lg p-2 transition-all hover:bg-green-700"
                  onClick={toggleMenu}
                >
                  Account
                  {menuOpen ? <BsChevronUp /> : <BsChevronDown />}
                </Menu.Button>
              </div>
              {menuOpen && (
                <Menu.Items className="origin-top-right absolute left-0 mt-2 w-32 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/admin"
                        target="_blank"
                        className={`${
                          active ? "bg-green-500 text-white" : "text-gray-900"
                        } group flex items-center gap-2 px-4 py-2 text-md`}
                      >
                        <RiAdminLine />
                        Admin
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/orders"
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
            <Link href={"/favorites"}>
              <div className="group">
                <div className="flex items-center justify-center border border-[#f55645] rounded-lg w-10 h-10 hover:border-[#f55645] group-hover:bg-[#f55645]/90">
                  <AiOutlineHeart
                    size={18}
                    className="text-[#f55645] group-hover:text-white"
                  />
                </div>
              </div>
            </Link>
            <Link
              href={"/basket"}
              className="border border-[#517a98] text-black rounded-lg p-2 bg-transparent transition-all relative hover:bg-[#517a98] hover:text-white"
            >
              <PiBasketLight size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-3 -right-3 bg-blue-300 text-white rounded-full px-2 py-1 text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </>
        ) : (
          <>
            <Link
              className="bg-[#517a98] text-white rounded-lg p-2 transition-all hover:bg-green-500"
              href="/user/login"
            >
              Login
            </Link>
            <Link
              className="border border-[#517a98] text-black rounded-lg p-2 bg-transparent transition-all hover:bg-[#517a98] hover:text-white"
              href="/user/register"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

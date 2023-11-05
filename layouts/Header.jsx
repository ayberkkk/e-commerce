import { mainMenu } from "@/utils/const";
import Link from "next/link";
import { FcCloth } from "react-icons/fc";

export default function Header() {
  return (
    <header className="bg-white border border-b-2 flex justify-between items-center px-6">
      <div className="">
        <FcCloth size={50} />
      </div>
      <nav className="">
        <ul className="justify-center flex">
          {mainMenu.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className="text-base p-4 scale-100 transition-all hover:scale-105"
            >
              {item.title}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-center gap-4">
        <Link
          href={"../form/login"}
          className="bg-green-500 text-white rounded-md p-2 transition-all hover:bg-green-700"
        >
          Log In
        </Link>
        <Link
          href={"../form/register"}
          className="border border-green-500 text-black rounded-md p-2 bg-transparent transition-all hover:bg-green-500 hover:text-white"
        >
          Register
        </Link>
      </div>
    </header>
  );
}

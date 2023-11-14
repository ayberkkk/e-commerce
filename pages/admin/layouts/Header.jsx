import { adminMenu } from "@/utils/const";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="bg-gray-200 border-2 shadow-lg">
      <div className="container mx-auto p-3">
        <ul className="flex items-center justify-start gap-10">
          {adminMenu.map((menu) => (
            <Link
              key={menu.id}
              href={menu.path}
              className="flex items-center justify-start"
            >
              {menu.title}
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
}

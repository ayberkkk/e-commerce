import Header from "@/layouts/Header";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

const Confirm = () => {
  const orderId = uuidv4();
  return (
    <>
      <Header />
      <div className="container mx-auto text-center mt-20 mb-20">
        <div className="grid lg:grid-cols-12 p-3">
          <div className="lg:col-span-4">
            <Image
              src="/confirm.gif"
              alt="Order Confirmation"
              className="w-full"
              width={100}
              height={100}
            />
          </div>
          <div className="lg:col-span-8 flex items-center justify-center p-3">
            <div className="table mx-auto">
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-lg">
                Your order has been successfully placed.
              </p>
              <p className="text-lg">
                Order ID: <b>{orderId}</b>
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={"/orders"}
                  className="mt-3 w-1/2 table mx-auto text-center border border-[#517a98] bg-transparent text-[#517a98] p-3 rounded-lg transition-all ease-in hover:bg-[#517a98] hover:text-white"
                >
                  Orders
                </Link>
                <Link
                  href={"/"}
                  className="mt-3 w-1/2 table mx-auto text-center border bg-green-500 text-white p-3 rounded-lg transition-all ease-in hover:bg-[#517a98] hover:text-white"
                >
                  Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;

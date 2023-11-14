// Orders.js

import Header from "@/layouts/Header";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";

const Orders = () => {
  const { orderHistory } = useCart();

  return (
    <>
      <Header />
      <div className="container mx-auto text-center mt-20 mb-20">
        <div className="table mx-auto w-full">
          <h1 className="text-3xl font-bold mb-5">Order History</h1>
          {orderHistory.length === 0 ? (
            <p className="text-lg">No orders placed yet.</p>
          ) : (
            <div className="w-full mt-5">
              {orderHistory.map((order) => (
                <div key={order.id} className="mb-3">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between text-white items-center w-full p-3 bg-[#517a98] rounded-lg">
                          <p className="text-lg">
                            Order<span className="font-bold ml-3">#{order.id}</span>{" "}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${
                              open ? 'transform rotate-180' : ''
                            } w-6 h-6 text-white transition-all ease-in duration-150`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="p-7 bg-white shadow-xl mt-2 rounded-lg">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="border-b-2 pb-3 pt-3 text-left">
                                  Image
                                </th>
                                <th className="border-b-2 pb-3 pt-3">Quantity</th>
                                <th className="border-b-2 pb-3 pt-3">Price</th>
                                <th className="border-b-2 pb-3 pt-3">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((item) => (
                                <tr key={item.id} className="border-b-2 p-3">
                                  <td className="flex items-center gap-3">
                                    <Image
                                      className="w-10 h-10 m-3"
                                      src={item.image}
                                      width={100}
                                      height={100}
                                    />
                                    {item.title}
                                  </td>
                                  <td>{item.quantity}</td>
                                  <td>{item.price} $</td>
                                  <td>{(item.quantity * item.price).toFixed(2)} $</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="3" className="text-right font-bold">
                                  Total:
                                </td>
                                <td className="font-bold">
                                  {order.items
                                    .reduce(
                                      (total, item) =>
                                        total + item.quantity * item.price,
                                      0
                                    )
                                    .toFixed(2)}{" "}
                                  $
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;

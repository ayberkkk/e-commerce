import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

const Basket = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const increaseQuantity = (itemId) => {
    updateCartQuantity(itemId, 1);
  };

  const decreaseQuantity = (itemId) => {
    updateCartQuantity(itemId, -1);
  };

  const removeItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleOrderConfirmation = () => {
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto text-center">
        <p className="text-3xl font-bold mt-10 mb-5">Your Basket is Empty</p>
        <p className="text-lg mb-5">
          Explore our products and add some items to your basket.
        </p>
        <Link
          href={"/"}
          className="text-white bg-[#517a98] py-2 px-4 rounded-md inline-block transition-all ease-in hover:bg-[#517a98]/80"
        >
          Explore Products
        </Link>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto pt-10">
        <h1 className="text-center text-3xl font-bold">Basket</h1>
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-12">
            <Link
              href={"/"}
              className="mt-3 block lg:w-1/12  text-center border border-[#517a98] bg-transparent text-[#517a98] p-3 rounded-lg transition-all ease-in hover:bg-[#517a98] hover:text-white"
            >
              Home Page
            </Link>
          </div>
          <div className="lg:col-span-10">
            <table className="w-full mt-5">
              <thead>
                <tr>
                  <th className="border-b-2 pb-3 pt-3 text-left">Image</th>
                  <th className="border-b-2 pb-3 pt-3 text-left">
                    Product Name
                  </th>
                  <th className="border-b-2 pb-3 pt-3 text-left">Quantity</th>
                  <th className="border-b-2 pb-3 pt-3 text-left">Price</th>
                  <th className="border-b-2 pb-3 pt-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b-2 p-3">
                    <td>
                      <Image
                        className="w-10 h-10 m-3"
                        src={item.image}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="lg:block hidden mt-5">{item.title}</td>
                    <td className="lg:hidden block mb-0">
                      {item.title.slice(0, 15)}
                    </td>
                    <td>
                      <ul className="flex items-center">
                        <li>
                          <button
                            className="border text-3xl bg-[#517a98]/70 transition-all ease-in hover:bg-red-500 text-white w-[40px] h-[40px] rounded-tl-lg rounded-bl-lg"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                        </li>
                        <li className="w-[30px] h-[30px] text-center mt-2 bg-white/90">
                          <input
                            type="number"
                            value={item.quantity}
                            className="w-10 text-center"
                          />
                        </li>
                        <li>
                          <button
                            className="border text-3xl bg-[#517a98]/70 transition-all ease-in hover:bg-green-500 text-white w-[40px] h-[40px] rounded-tr-lg rounded-br-lg"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <p className="text-lg font-bold">{item.price} $</p>
                    </td>
                    <td className="group">
                      <button
                        className="ml-3 border rounded-full w-10 h-10 flex items-center justify-center bg-transparent transition-all ease-in group-hover:bg-red-400"
                        onClick={() => removeItem(item.id)}
                      >
                        <BsFillTrash3Fill className="text-red-400 group-hover:text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-2 relative lg:h-[60vh] h-auto">
            <Link
              href={"/confirm"}
              className="lg:block hidden mt-3 text-center bg-green-500 w-full rounded-md text-white p-2 transition-all ease-in hover:bg-[#517a98]/80"
              onClick={handleOrderConfirmation}
            >
              Confirm
            </Link>
            <div className="lg:relative fixed lg:bottom-0 bottom-8 flex items-center justify-between py-5 lg:px-0 px-5">
              <p className="underline text-lg font-bold">Total : </p>
              <p className="font-extrabold text-lg">
                {totalPrice.toFixed(2)} $
              </p>
            </div>
            <div className="lg:absolute fixed bottom-3 lg:bottom-0 w-full lg:px-0 px-5">
              <Link
                href={"/confirm"}
                className="block text-center bg-green-500 w-full rounded-md text-white p-2 transition-all ease-in hover:bg-[#517a98]/80"
                onClick={handleOrderConfirmation}
              >
                Confirm
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Basket;

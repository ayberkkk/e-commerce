import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Header from "@/layouts/Header";
import Image from "next/image";

export default function Orders() {
  const { cart } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const toggleDetails = (orderId) => {
    setShowDetails(!showDetails);
    setSelectedOrderId(orderId);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto w-full">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            order
          </div>
        )}
      </div>
    </>
  );
}

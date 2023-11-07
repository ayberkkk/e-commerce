import React from "react";

export default function Basket({ cart }) {
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.title} - Quantity: {product.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

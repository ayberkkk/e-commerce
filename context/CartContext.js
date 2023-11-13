import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      const existingQuantity = updatedCart[existingItemIndex].quantity;

      updatedCart[existingItemIndex].quantity += item.quantity;

      setCart(updatedCart);

      Swal.fire({
        title: "Product Added to Cart",
        html: `<b>${item.title}</b> product quantity has been updated in your cart.<br/>Previous Quantity: ${existingQuantity}<br/>New Quantity: ${updatedCart[existingItemIndex].quantity}`,
        icon: "success",
      });
    } else {
      setCart((prevCart) => [...prevCart, item]);

      Swal.fire({
        title: "Product Added to Cart",
        html: `<b>${item.title}</b> product has been added to your cart.`,
        icon: "success",
      });
    }

    setCartInLocalStorage();
  };

  const setCartInLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const updateCartQuantity = (itemId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
    setCart(updatedCart);
    setCartInLocalStorage();
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    setCartInLocalStorage();
  };


  const clearCart = () => {
    setCart([]);
    setCartInLocalStorage();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

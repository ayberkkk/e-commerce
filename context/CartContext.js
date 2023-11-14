import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const setCartInLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

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
    setOrderHistory((prevOrders) => [
      ...prevOrders,
      { id: uuidv4(), items: cart, total: calculateTotalPrice() },
    ]);
    setCart([]);
    setCartInLocalStorage();
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orderHistory,
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

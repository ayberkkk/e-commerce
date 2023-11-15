import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useMember = () => {
  const auth = getAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userLoggedIn");
        router.push("/");
      })
      .catch((error) => {
        console.error("Çıkış sırasında hata oluştu: ", error);
      });
  };

  return {
    userLoggedIn,
    handleLogout,
  };
};
export const addToCart = (id, productDetail, quantity) => {
  const { cart, addToCart: updateCartInContext } = useCart();
  if (quantity === 0) {
    Swal.fire({
      title: "Product Not Added to Cart",
      text: "The quantity is 0, so the product cannot be added to the cart.",
      icon: "error",
    });
  } else {
    const existingItemIndex = cart.findIndex((item) => item.id === id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      updateCartInContext(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newItem = {
        id,
        title: productDetail.title,
        quantity,
      };
      const updatedCart = [...cart, newItem];
      updateCartInContext(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    Swal.fire({
      title: "Product Added to Cart",
      html: `<b>${productDetail.title}</b> product has been added to your cart with a quantity of <b>${quantity}</b>.`,
      icon: "success",
    });
  }
};
export const adminMenu = [
  {
    path: "/admin",
    title: "Home",
  },
  {
    path: "/",
    title: "Products",
  },
  {
    path: "/",
    title: "Orders",
  },
  {
    path: "/",
    title: "Members",
  },
  {
    path: "/",
    title: "Web Site",
  },
];

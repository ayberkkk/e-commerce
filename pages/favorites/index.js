import Cart from "@/components/Cart";
import Header from "@/layouts/Header";
import React from "react";
import ProductList from "../api/products";

const FavoriteList = ({ favoriteProducts }) => {
  return (
    <>
      <Header />
      <h2 className="text-3xl font-bold mt-10 mb-5">Favorite Products</h2>
      {favoriteProducts && favoriteProducts.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className="container mx-auto">
          {favoriteProducts &&
            favoriteProducts.map((productId) => (
              <div key={productId}>
                <ProductList />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default FavoriteList;

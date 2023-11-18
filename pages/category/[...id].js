import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import ProductCard from "@/components/ProductCard";

function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/category/${id[0]}`)
        .then((res) => res.json())
        .then((data) => {
          const productsWithAmount = data.map((product) => ({
            ...product,
            amount: 0,
          }));
          setCategoryData(productsWithAmount);
        });
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <ul className="grid lg:grid-cols-4 grid-cols-2 gap-3">
          {categoryData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default CategoryPage;

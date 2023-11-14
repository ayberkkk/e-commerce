import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcCompactCamera } from "react-icons/fc";
import StarRating from "@/components/Star";
import FavoriteButton from "@/components/FavoriteButton";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const productsWithAmount = data.map((product) => ({
          ...product,
          amount: 0,
        }));
        setProducts(productsWithAmount);
      });
  }, []);

  return (
    <>
      {products.map((product) => (
        <div
          className="border border-gray-200 rounded-lg p-3 lg:m-3 m-1 lg:px-4 relative z-50 shadow-sm transition-shadow ease-in hover:shadow-lg"
          key={product.id}
        >
          <div className="relative z-50">
            <Link href={`/products/${product.id}`}>
              <Image
                className="object-contain lg:h-72 h-52 w-96 mb-5 transition-all ease-in hover:scale-105"
                src={product.image}
                width={600}
                height={400}
                title={product.title}
                alt={product.title}
              />
              <div className="absolute left-1 lg:top-2 -top-3 z-20">
                <Image
                  className="w-12 h-auto object-cover p-1 ml-1"
                  src="/logo.png"
                  width={40}
                  height={40}
                />
              </div>
            </Link>
            <div className="absolute right-1 lg:top-2 -top-2 z-20 cursor-pointer group">
              <FavoriteButton
                productId={product.id}
              />
            </div>
            <div className="relative z-50 border-t-2 w-full pt-3 pb-3">
              <h3 className="lg:text-base font-normal">
                <span className="font-bold uppercase mr-1">
                  {product.category}
                </span>
                {product.title}
              </h3>
              <div className="flex gap-2 mt-2 mb-2">
                <StarRating rating={product.rating.rate} />
                <span className="text-gray-400 text-xs">
                  ({product.rating.count})
                </span>
                <FcCompactCamera />
              </div>
              <div className="text-green-500 font-bold text-3xl mt-2 mb-2">
                {product.price}
                <span className="text-lg ml-1">$</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function ProductList() {
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

  const increase = (product) => {
    product.amount += 1;
    setProducts([...products]);
  };

  const decrease = (product) => {
    if (product.amount > 0) {
      product.amount -= 1;
      setProducts([...products]);
    }
  };

  return (
    <>
      {products.map((product) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          className="border border-gray-200 rounded-lg p-3 m-3 px-4 relative z-10 scale-100 overflow-hidden"
        >
          <Image
            className="object-contain lg:h-72 h-52 w-96 mb-3 transition-all hover:scale-105"
            src={product.image}
            width={600}
            height={100}
            title={product.title}
            alt={product.title}
          />
          <h3 className="lg:text-lg font-normal">{product.title}</h3>
          <ul className="lg:flex items-center justify-between table mx-auto">
            <li className="text-green-500 font-bold text-2xl">
              {product.price}
              <span className="text-lg ml-1">$</span>
            </li>
            <li className="relative">
              <ul className="flex items-center mt-4">
                <li>
                  <button
                    className="border text-3xl bg-blue-400 hover:bg-blue-500 text-white w-[40px] h-[40px] rounded-tl-lg rounded-bl-lg"
                    onClick={() => decrease(product)}
                  >
                    -
                  </button>
                </li>
                <li className="w-[30px] h-[30px] text-center mt-2 bg-white/90">
                  {product.amount}
                </li>
                <li>
                  <button
                    className="border text-3xl bg-blue-400 hover:bg-blue-500 text-white w-[40px] h-[40px] rounded-tr-lg rounded-br-lg"
                    onClick={() => increase(product)}
                  >
                    +
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <button
            type="submit"
            className="text-base w-full mt-3 p-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-all"
          >
            Add
          </button>
        </Link>
      ))}
    </>
  );
}

export default ProductList;

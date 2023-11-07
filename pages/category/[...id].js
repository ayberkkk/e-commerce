import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/layouts/Header";
import Swal from "sweetalert2"; // Swal ekledik

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
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

  const increase = (product) => {
    product.amount += 1;
    setCategoryData([...categoryData]);
  };

  const decrease = (product) => {
    if (product.amount > 0) {
      product.amount -= 1;
      setCategoryData([...categoryData]);
    }
  };

  const addProductToCart = (product) => {
    if (product.amount > 0) {
      setCart((prevCart) => [
        ...prevCart,
        { ...product, amount: product.amount },
      ]);
      Swal.fire({
        title: "Product Added",
        text: `${product.title} , ${product.amount} added to your cart.`,
        icon: "success",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <ul className=" grid lg:grid-cols-4 grid-cols-2 gap-3">
          {categoryData.map((product) => (
            <div className="border border-gray-200 rounded-lg p-3 lg:m-3 m-1 lg:px-4 relative z-50">
              <Link href={`/products/${product.id}`}>
                <Image
                  className="object-contain lg:h-72 h-52 w-96 mb-5 transition-all hover:scale-105"
                  src={product.image}
                  width={600}
                  height={400}
                  title={product.title}
                  alt={product.title}
                />
              </Link>
              <div className="relative z-50 border-t-2 w-full pt-3 pb-3">
                <h3 className="lg:text-lg font-normal">
                  {product.title.slice(0, 20)}
                </h3>
                <ul className="lg:flex items-center justify-between table mx-auto w-full">
                  <li className="text-green-500 font-bold text-2xl">
                    {product.price}
                    <span className="text-lg ml-1">$</span>
                  </li>
                  <li className="relative z-50">
                    <ul className="inline-flex items-center mt-4 justify-center w-full">
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
                  onClick={() => addProductToCart(product)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CategoryPage;

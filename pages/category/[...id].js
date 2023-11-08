import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/layouts/Header";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FcCompactCamera } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";

function StarRating({ rating }) {
  const maxRating = 5;
  const fullStars = Math.floor(rating);

  const starIcons = [];

  for (let i = 1; i <= maxRating; i++) {
    if (i <= fullStars) {
      starIcons.push(<BsStarFill key={i} className="text-yellow-400" />);
    } else {
      starIcons.push(<BsStar key={i} className=" text-gray-300" />);
    }
  }

  return <div className="flex items-center">{starIcons}</div>;
}

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
              <div className="absolute right-1 top-2 z-20 cursor-pointer group">
              <div className="flex items-center justify-center border border-gray-500 rounded-full w-8 h-8 hover:border-[#f55645] group-hover:bg-[#f55645]/90">
                <AiOutlineHeart
                  size={18}
                  className="text-gray-500 group-hover:text-white"
                />
              </div>
            </div>
            <div className="relative z-50 border-t-2 w-full pt-3 pb-3">
              <h3 className="lg:text-base font-normal">
                <span className="font-bold uppercase mr-1">
                  {product.category}
                </span>
                {product.title.slice(0, 20)}
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
          ))}
        </ul>
      </div>
    </>
  );
}

export default CategoryPage;

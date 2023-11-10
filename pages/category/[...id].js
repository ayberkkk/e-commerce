import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/layouts/Header";
import StarRating from "@/components/Star";
import { FcCompactCamera } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";

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

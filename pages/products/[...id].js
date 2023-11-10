import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import { useMember } from "@/utils/const";
import { addToCart } from "@/utils/const";
import { FcCompactCamera } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import StarRating from "@/components/Star";
import AddToCartButton from "@/components/AddCart";
import FavoriteButton from "@/components/FavoriteButton";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productDetail, setProductDetail] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const { userLoggedIn } = useMember();

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProductDetail(data))
        .catch((error) => console.error("---", error));
    }
  }, [id]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const updateCartInStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Header />
      <div className="container mx-auto lg:pt-10 lg:px-12">
        {productDetail ? (
          <>
            <nav
              class="flex lg:mb-10 mb-3 py-3 text-gray-700 px-3 items-center"
              aria-label="Breadcrumb"
            >
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <a
                    href="/"
                    class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-black"
                  >
                    <svg
                      class="w-3 h-3 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                <li aria-current="page">
                  <div class="flex items-center">
                    <svg
                      class="w-3 h-3 mx-1 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span class="ml-1 text-sm font-medium md:ml-2 text-gray-400 hover:text-black">
                      {productDetail.category}
                    </span>
                  </div>
                </li>
                <li aria-current="page">
                  <div class="flex items-center">
                    <svg
                      class="w-3 h-3 mx-1 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span class="ml-1 text-xs font-medium md:ml-2 text-black hover:text-gray-400 lg:whitespace-nowrap">
                      {productDetail.title.slice(0, 29)} ...
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 lg:px-0 px-5">
              <div className="relative w-full lg:h-[70vh] h-[40vh] max-h-[100vh] border rounded-lg flex items-center justify-center">
                <Image
                  className="object-cover table mx-auto w-1/2 h-auto p-3"
                  src={productDetail.image}
                  width={200}
                  height={200}
                />
              </div>
              <div>
                <p>
                  <span className="font-bold lg:text-3xl mr-2 uppercase">
                    {productDetail.category}
                  </span>
                  <span className="font-light lg:text-3xl text-2xl block">
                    {productDetail.title}
                  </span>
                </p>
                <div className="flex items-center gap-2 mt-6 mb-2">
                  <StarRating rating={productDetail.rating.rate} />
                  <span className="text-gray-400 text-base">
                    {productDetail.rating.rate}{" "}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ({productDetail.rating.count})
                  </span>
                  <FcCompactCamera />
                </div>
                <ul className="flex items-center lg:justify-start justify-between gap-10 mt-6 mb-5">
                  <li className="text-green-500 font-bold text-5xl">
                    {productDetail.price}
                    <span className="text-lg ml-1">$</span>
                  </li>
                  <li className="relative">
                    <ul className="flex items-center mt-4">
                      <li>
                        <button
                          className="border text-3xl bg-[#517a98] hover:bg-[#517a98]/80 text-white w-[40px] h-[40px] rounded-tl-lg rounded-bl-lg"
                          onClick={decreaseQuantity}
                        >
                          -
                        </button>
                      </li>
                      <li className="w-[30px] h-[30px] text-center mt-2 bg-white/90">
                        {quantity}
                      </li>
                      <li>
                        <button
                          className="border text-3xl bg-[#517a98] hover:bg-[#517a98]/80 text-white w-[40px] h-[40px] rounded-tr-lg rounded-br-lg"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
                {userLoggedIn ? (
                  <div className="lg:w-1/2 w-full lg:relative fixed lg:bg-transparent bg-white lg:border-0 border-t-2 -bottom-2 left-0 flex items-center gap-3 justify-center mt-2 mb-2 lg:px-0 px-1 lg:py-0 py-1">
                    <AddToCartButton
                      onClick={() =>
                        addToCart(
                          id,
                          productDetail,
                          quantity,
                          cart,
                          updateCartInStorage
                        )
                      }
                    />
                    <div className="group mt-2 cursor-pointer">
                      <FavoriteButton productId={id} />
                    </div>
                  </div>
                ) : (
                  <div className="lg:w-1/2 w-full lg:relative fixed lg:bg-transparent bg-white lg:border-0 border-t-2 -bottom-2 left-0 flex items-center gap-3 justify-center mt-2 mb-2 lg:px-0 px-1 lg:py-0 py-1">
                    <Link
                      href={"/user/login"}
                      className="text-base text-center w-full mt-3 p-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-all"
                    >
                      Login
                    </Link>
                    <Link href={"/user/register"}>
                      <div className="group mt-2 cursor-pointer">
                        <div className="flex items-center justify-center border border-gray-500 rounded-full w-9 h-9 hover:border-[#f55645] group-hover:bg-[#f55645]/90">
                          <AiOutlineHeart
                            size={18}
                            className="text-gray-500 group-hover:text-white"
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                <div>
                  <h3 className="text-lg w-full border-b-2 border-[#517a98] mt-10 mb-2">
                    Description
                  </h3>
                  <p className="text-sm font-medium">
                    {productDetail.description}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="table m-auto w-full">
            <div className="flex items-center justify-center" role="status">
              <svg
                aria-hidden="true"
                class="w-12 h-12 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/layouts/Header";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [productDetail, setProductDetail] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProductDetail(data))
        .catch((error) => console.error("Ürün detayları alınamadı:", error));
    }
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [isImageZoomed, setImageZoomed] = useState(false);

  return (
    <>
      <Header />
      <div className="container mx-auto lg:pt-10">
        {productDetail ? (
          <>
            <nav
              class="flex mb-10 py-3 text-gray-700 px-3 items-center"
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
                <p className="font-bold text-2xl">{productDetail.title}</p>
                <ul className="flex items-center justify-between">
                  <li className="text-green-500 font-bold text-4xl">
                    {productDetail.price}
                    <span className="text-lg ml-1">$</span>
                  </li>
                  <li className="relative">
                    <ul className="flex items-center mt-4">
                      <li>
                        <button
                          className="border text-3xl bg-blue-400 hover:bg-blue-500 text-white w-[40px] h-[40px] rounded-tl-lg rounded-bl-lg"
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
                          className="border text-3xl bg-blue-400 hover:bg-blue-500 text-white w-[40px] h-[40px] rounded-tr-lg rounded-br-lg"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="w-full">
                  <div className="lg:w-1/2 rounded-2xl bg-white">
                    <Disclosure as="div" className="mt-2">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-400 px-4 py-2 text-left text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
                            <span>Description</span>
                            <ChevronUpIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-gray-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            {productDetail.description}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-base w-full mt-3 p-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Ürün detayları yükleniyor...</p>
        )}
      </div>
    </>
  );
};

export default ProductDetail;

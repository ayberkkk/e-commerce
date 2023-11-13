import { useCart } from "@/context/CartContext";

export default function AddToCartButton({
  productId,
  productDetail,
  image,
  price,
  quantity,
}) {
  const { addToCart } = useCart();

  const handleClick = (e) => {
    e.preventDefault();
    addToCart({
      id: productId,
      title: productDetail.title,
      image: image,
      price: price,
      quantity: quantity,
    });
  };

  return (
    <button
      type="submit"
      className="lg:mb-0 mb-3 text-base w-full mt-3 p-2 bg-[#517a98] hover:bg-[#517a98]/80 rounded-lg text-white transition-all"
      onClick={handleClick}
    >
      Add
    </button>
  );
}

export default function AddToCartButton({ onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      type="submit"
      className="text-base w-full mt-3 p-2 bg-[#517a98] hover:bg-[#517a98]/80 rounded-lg text-white transition-all"
      onClick={handleClick}
    >
      Add
    </button>
  );
}

import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FavoriteButton = ({ productId }) => {
  const localStorageKey = `isFavorite_${productId}`;

  const initialIsFavorite =
    JSON.parse(localStorage.getItem(localStorageKey)) || false;
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const favoriteToggle = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    localStorage.setItem(localStorageKey, JSON.stringify(newIsFavorite));
  };

  return (
    <div
      className={`flex items-center justify-center border bg-white shadow-lg border-gray-200 rounded-full w-10 h-10 hover:border-[#f55645] group-hover:bg-[#f55645]/90`}
      onClick={favoriteToggle}
    >
      {isFavorite ? (
        <AiFillHeart size={18} className="text-red-500" />
      ) : (
        <AiOutlineHeart
          size={18}
          className="text-gray-500 group-hover:text-white"
        />
      )}
    </div>
  );
};

export default FavoriteButton;

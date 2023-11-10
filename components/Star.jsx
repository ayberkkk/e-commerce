import { BsStar, BsStarFill } from "react-icons/bs";

export default function StarRating({ rating }) {
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

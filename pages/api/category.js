import Link from "next/link";
import { useState, useEffect } from "react";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <ul className="justify-center lg:flex block">
      {categories.map((category) => (
        <li
          key={category}
          className="mt-5 lg:block table mx-auto relative lg:-top-[10px] top-36"
        >
          <Link
            href={`/category/${category}`}
            passHref
            className="text-base uppercase p-4 scale-100 transition-all lg:hover:scale-105"
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;

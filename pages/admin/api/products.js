import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProductModal from "../pages/products/ProductModals";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-1/2">
      <table className="border-2 mt-3 rounded-lg m-3">
        <thead>
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Image</th>
            <th className="border p-3">Title</th>
            <th className="border p-3">Price</th>
            <th className="border p-3">Category</th>
            <th className="border p-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              className="border cursor-pointer hover:bg-gray-200"
              key={product.id}
              onClick={() => openModal(product)}
            >
              <td className="border text-center">{product.id}</td>
              <td className="border">
                <Image
                  className="w-10 h-10 object-cover table mx-auto"
                  src={product.image}
                  width={100}
                  height={100}
                />
              </td>
              <td className="border">{product.title}</td>
              <td className="border">${product.price}</td>
              <td className="border">{product.category}</td>
              <td className="border">{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <ProductModal product={selectedProduct} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ProductTable;

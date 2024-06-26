import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../layouts/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const AdminProducts = () => {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [newProductModal, setProductModal] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      const products = response.data;
      setProductList(products);
      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.error("Error fetching products:", error);
      setFetchError("Error fetching products. Please try again.");
      toast.error("Error fetching products. Please try again.");
    }
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProductList(JSON.parse(storedProducts));
    } else {
      fetchData();
    }
  }, []);

  const updateProduct = (id) => {
    const selected = productList.find((product) => product.id === id);
    setSelectedProduct(selected);
    setModalOpen(true);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProductList((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product. Please try again.");
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/products/${selectedProduct.id}`,
        selectedProduct
      );
      console.log("Product updated:", response.data);
      setModalOpen(false);
      toast.success("Product updated successfully!");

      setProductList((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id ? response.data : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    }
  };

  const [newProduct, setNewProduct] = useState({
    title: "",
    image: "",
    price: 0,
    category: "",
    description: "",
  });

  const addProductModal = () => {
    setProductModal((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addNewProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        newProduct
      );

      setProductList((prevProducts) => [response.data, ...prevProducts]);
      toast.success("New product added successfully!");

      setNewProduct({
        title: "",
        price: 0,
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding new product:", error);
      toast.error("Error adding new product. Please try again.");
    }
  };

  return (
    <div>
      <AdminHeader />
      {fetchError && <p>{fetchError}</p>}
      <div className="flex items-center justify-between p-3">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={addProductModal}
        >
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{product.id}</td>
                <td className="py-2 px-4 border-b flex items-center gap-5">
                  <Image
                    className="w-10 h-10"
                    src={product.image}
                    width={40}
                    height={40}
                    title={product.title}
                    alt={product.title}
                  />
                  {product.title}
                </td>
                <td className="py-2 px-4 border-b">$ {product.price}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                    onClick={() => updateProduct(product.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 w-[600px] max-w-[600px] h-[auto] rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <div>
              <label className="font-bold mr-5">Title:</label>
              <input
                className="admin-input"
                type="text"
                value={selectedProduct.title}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-bold mr-5">Price:</label>
              <input
                className="admin-input"
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-bold mr-5">Category:</label>
              <input
                className="admin-input"
                type="text"
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-bold mr-5">Description:</label>
              <textarea
                className="admin-input h-[200px] max-h-[200px]"
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex justify-end mt-4 mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded-lg"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {newProductModal === 1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 w-[600px] max-w-[600px] h-[auto] rounded-lg relative">
            <button
              className="absolute top-4 right-4 text-xl font-bold"
              onClick={() => {
                setProductModal(0);
                setNewProduct({
                  title: "",
                  price: 0,
                  category: "",
                  description: "",
                });
              }}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-2">Add New Product</h2>
            <div>
              <label className="font-bold mr-5">Title:</label>
              <input
                className="admin-input"
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label className="font-bold mr-5">Price:</label>
              <input
                className="admin-input"
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label className="font-bold mr-5">Category:</label>
              <input
                className="admin-input"
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleNewProductChange}
              />
            </div>
            <div>
              <label className="font-bold mr-5">Description:</label>
              <textarea
                className="admin-input h-[200px] max-h-[200px]"
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
              />
            </div>
            <div className="mt-4">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                onClick={addNewProduct}
              >
                Add Product
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  console.log("Selected image:", e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminProducts;

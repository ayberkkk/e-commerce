import React, { useState, useEffect } from "react";
import AdminHeader from "../layouts/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProducts = () => {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProductList(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setFetchError("Error fetching products. Please try again.");
      }
    };

    fetchData();
  }, []);

  const updateProduct = (id) => {
    const selected = productList.find((product) => product.id === id);
    setSelectedProduct(selected);
    setModalOpen(true);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProductList(productList.filter((product) => product.id !== id));
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

      setProductList((prevProducts) => {
        const updatedIndex = prevProducts.findIndex(
          (product) => product.id === selectedProduct.id
        );

        if (updatedIndex !== -1) {
          const updatedProducts = [...prevProducts];
          updatedProducts[updatedIndex] = response.data;
          return updatedProducts;
        }

        return prevProducts;
      });
    } catch (error) {
      console.error("Error updating product:", error);
      // Show error message
      toast.error("Error updating product. Please try again.");
    }
  };

  return (
    <div>
      <AdminHeader />
      {fetchError && <p>{fetchError}</p>}
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
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
                <td className="py-2 px-4 border-b">{product.title}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
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
            {/* <div className="flex items-center gap-4">
              <label className="font-bold mr-5">Image:</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              {selectedProduct.image && (
                <>
                  <button
                    className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={openImageInNewTab}
                  >
                    Open Image in New Tab
                  </button>
                </>
              )}
            </div> */}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminProducts;

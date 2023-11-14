import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const ProductModal = ({
  product,
  closeModal,
  updateProduct,
  deleteProduct,
}) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    updateProduct(editedProduct);
    closeModal();
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    closeModal();
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="w-[500px] px-4 text-center table mx-auto">
          <Dialog.Overlay className="fixed inset-0 flex items-center justify-center" />
          <div className="inline-block align-middle my-8 p-8 text-left bg-white shadow-xl rounded">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {product.title}
            </Dialog.Title>
            <div className="mt-2">
              <label
                htmlFor="editedTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="editedTitle"
                name="title"
                value={editedProduct.title}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />

              <label
                htmlFor="editedPrice"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Price:
              </label>
              <input
                type="number"
                id="editedPrice"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />

              {/* Diğer alanlar için benzer şekilde devam edebilirsiniz */}
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleUpdate}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 ml-2"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-500 border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 ml-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductModal;

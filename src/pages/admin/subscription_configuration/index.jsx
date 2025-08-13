import React, { useState, useEffect } from "react";
import Admindashboard from "../adminpanel";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { HttpClient } from "../../../server/client/http";
import ClipLoader from "react-spinners/ClipLoader";

const SubscriptionConfiguration = () => {
  const [subsData, setSubsData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatingPrice, setUpdatingPrice] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const resetAddForm = () => {
    setNewName("");
    setNewPrice("");
    setNewDescription("");
  };


  const handleAddNewProduct = async () => {
    if (!newName || !newPrice) {
      toast.error("Please provide name and price.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        productName: newName,
        price: parseInt(newPrice),
        description: newDescription,
        type: "admin",
      };
      await HttpClient.post("/product", payload);
      toast.success("Product added successfully!");
      await getSubsConfiguration();
      setAddModalOpen(false);
      resetAddForm();
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setUpdatingPrice("");
    setUpdatedDescription("");
    setSelectedItem(null);
  };

  const getSubsConfiguration = async () => {
    setLoading(true);
    try {
      const response = await HttpClient.get("/product",{
        productType:'admin'
      });
      setSubsData(response?.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("There was an error fetching product data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubsConfiguration();
  }, []);

  const clickToUpdate = async () => {
    if (!updatingPrice || !selectedItem) {
      toast.error("Please enter a valid price and select a product.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        price: parseInt(updatingPrice),
        productName: selectedItem.name,
        type: "admin",
        description: updatedDescription,
      };

      await HttpClient.put("/product", payload);
      toast.success("Price updated successfully!");
      await getSubsConfiguration();
      closeModal();
    } catch (err) {
      console.error("Error updating price:", err);
      toast.error("There was an error updating the price.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Admindashboard />
      <div className="bg-[#F2F9FF] w-full p-5">
        <div className="flex justify-between mt-10">
          <h1 className="text-xl font-bold mb-5">Product Configuration</h1>
          <p className="text-sm text-gray-500">{new Date().toDateString()}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setAddModalOpen(true)}
            className="text-[16px] bg-blue-500 text-white h-[40px] mb-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add New
          </button>
        </div>
        <hr className="mb-2" />

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-medium">
                <th className="p-3">Name</th>
                <th className="p-3">Current Price (£)</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="text-center py-10">
                    <ClipLoader size={50} color="#4ade80" />
                  </td>
                </tr>
              ) : (
                subsData.map((item) => (
                  <tr key={item.id} className="text-sm border-t hover:bg-gray-100 bg-gray-50">
                    <td className="px-4 py-2 capitalize">{item?.name}</td>
                    <td className="px-4 py-2">
                      {item?.prices?.length > 0
                        ? item.prices[0].unit_amount/100
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setUpdatedDescription(item?.description || "");
                          setUpdatingPrice(item?.prices?.length > 0
                            ? item.prices[0].unit_amount/100
                            : "N/A")
                          openModal();
                        }}
                        className="bg-green-500 text-white px-4 py-1 rounded-lg transition hover:bg-green-600"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            maxHeight: "90vh",              // Limit height to 90% of viewport
            overflowY: "auto",              // Enable vertical scroll
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            width: "90%",                   // Optional: Responsive width
            maxWidth: "500px",
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Update Product Configuration</h2>
        <p className="mb-3">
          Name:{" "}
          <span className="font-bold capitalize">{selectedItem?.name}</span>
          <br />
          Current Price:{" "}
          <span className="font-bold">
            {(selectedItem?.prices?.[0]?.unit_amount ?? null) !== null
  ? selectedItem.prices[0].unit_amount / 100
  : "N/A"}

          </span>
        </p>

        <div className="space-y-4">
          <div>

            <label htmlFor="" style={{
              fontSize: '12px',
              color: 'gray'
            }}>Price</label>
            <input
              type="number"
              required
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new price in £"
              value={updatingPrice}
              onChange={(e) => setUpdatingPrice(e.target.value)}
            />
          </div>
          <div>

            <label htmlFor="" style={{
              fontSize: '12px',
              color: 'gray'
            }}>Description</label>
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              placeholder="Enter new description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-5">
          <div className="min-w-[120px]">


            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={clickToUpdate}
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader size={20} color="#fff" /> : "Update"}
            </button>
          </div>
          <div className="min-w-[120px]">

            <button
              className=" w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>



      <Modal
        isOpen={addModalOpen}
        onRequestClose={() => {
          setAddModalOpen(false);
          resetAddForm();
        }}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            maxHeight: "90vh",
            overflowY: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "500px",
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Add New Subscription</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-5">
            <div className="min-w-[120px]">

              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={handleAddNewProduct}
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader size={20} color="#fff" /> : "Save"}
              </button>
            </div>
            <div className="min-w-[120px]">

              <button
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => {
                  setAddModalOpen(false);
                  resetAddForm();
                }}
              >
                Cancel
              </button>
            </div>

          </div>

        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionConfiguration;

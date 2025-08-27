import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { HttpClient } from "../../../server/client/http";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import AdminPanelNavbar from "../adminpanel/index";
import Modal from "react-modal";

Modal.setAppElement("#root");

const CourseCategory = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("allCategories"); // Added activeTab state

  const getAllCategories = async () => {
    setIsLoading(true);
    try {
      const response = await HttpClient.get("/category/");
      const formattedCategories = response.data.map((each) => ({
        id: each._id,
        categoryName: each.categoryName,
        createdAt: each.createdAt,
      }));
      setAllCategories(formattedCategories);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const clickToAddCategory = async () => {
    try {
      const response = await HttpClient.post("/category/", {
        categoryName: newCategory,
      });
      toast.success(response?.message);
      getAllCategories();
      setModalIsOpen(false);
      setNewCategory("");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await HttpClient.delete(`/category/${id}`);
      toast.success(response.message);
      getAllCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex">
      <AdminPanelNavbar />
      <div className="p-6 w-full min-h-screen bg-[#F2F9FF]">
        <div className="flex justify-between mt-8 items-center mb-6">
          <h2 className="text-xl font-semibold">Course Categories</h2>
          <p className="text-sm text-gray-500">{new Date().toDateString()}</p>
        </div>

        <div className="flex justify-between flex-wrap items-center mb-4">
          <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow">
            <CiSearch className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Search categories..."
              className="outline-none flex-grow text-sm"
            />
          </div>
          <button
            onClick={() => setModalIsOpen(true)}
            className="flex items-center bg-green-500 text-white px-2 py-1 w-auto rounded-full"
          >
            <FiPlus className="mr-2" />
            Add Category
          </button>
        </div>
        <hr className="mb-2 mt-2" />

        <div className="bg-white shadow rounded-lg">
          <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-full text-sm font-semibold">
              <tr >
                <th className="p-4 text-left">Number</th>
                <th className="p-4 text-left">Category Name</th>
                <th className="p-4 text-left">Created</th>
                <th className="p-4 text-left">Actions</th>

              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="bg-white text-center py-6">
                    <ClipLoader size={50} color="#4ade80" />
                  </td>
                </tr>
              ) : activeTab === "allCategories" ? (
                allCategories.length > 0 ? (
                  allCategories.map((eachCat, index) => (
                    <tr
                      key={eachCat.id}
                      className="border-b hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                      <td className="p-4 text-gray-800">{index + 1}</td>
                      <td className="p-4 text-gray-800">{eachCat.categoryName}</td>
                      <td className="p-4 text-gray-800">{eachCat.createdAt.slice(0, 10)}</td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => deleteCategory(eachCat.id)}
                          className="flex items-center ml-4 justify-center bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 shadow-md transition duration-200 ease-in-out"
                        >
                          <FiTrash2 className="mr-2" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="bg-white text-center py-6 text-gray-600">
                      No categories found
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="4" className="bg-white text-center py-6 text-gray-600">
                    Please select a category tab
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isModalOpen}
          contentLabel="Add Category Modal"
          className="modal-content bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New Job Category</h3>
            <button className="text-gray-600 font-bold" onClick={() => setModalIsOpen(false)}>X</button>
          </div>
          <input
            type="text"
            placeholder="Category Name"
            onChange={(e) => setNewCategory(e.target.value)}
            value={newCategory}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none mb-4"
          />
          <button onClick={clickToAddCategory} className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">
            Add Category
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default CourseCategory;

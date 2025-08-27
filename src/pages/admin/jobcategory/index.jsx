import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { debounce } from "lodash";
import AdminPanelNavbar from "../adminpanel/index";
import Modal from "react-modal";
import { HttpClient } from "../../../server/client/http";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

Modal.setAppElement("#root");

const JobCategory = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search function
  const handleSearch = useCallback(
    debounce((term) => {
      if (term.trim() === "") {
        setFilteredCategories(allCategories);
      } else {
        const filtered = allCategories.filter((category) =>
          category.categoryName.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCategories(filtered);
      }
    }, 300),
    [allCategories]
  );

  useEffect(() => {
    handleSearch(searchTerm);
    return () => handleSearch.cancel();
  }, [searchTerm, handleSearch]);

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
      setFilteredCategories(formattedCategories);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const clickToAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

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
      toast.error(error?.message || "Failed to add category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await HttpClient.delete(`/category/${id}`);
      toast.success(response.message);
      getAllCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to delete category");
    }
  };

  return (
    <div className="flex">
      <AdminPanelNavbar />
      <div className="p-6 w-full min-h-screen bg-[#F2F9FF]">
        <div className="flex justify-between mt-8 items-center mb-6">
          <h2 className="text-xl font-semibold">Job Categories</h2>
          <p className="text-sm text-gray-500">{new Date().toDateString()}</p>
        </div>

        <div className="flex justify-between flex-wrap gap-3 items-center mb-4">
          <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow w-full md:w-auto flex-grow">
            <CiSearch className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Search categories..."
              className="outline-none flex-grow text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setModalIsOpen(true)}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 w-auto rounded-lg transition-colors"
          >
            <FiPlus className="mr-2" />
            Add Category
          </button>
        </div>
        <hr className="mb-2 mt-2" />

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium">
                <th className="p-3">Number</th>
                <th className="p-3">Category Name</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-8">
                    <ClipLoader size={50} color="#4ade80" />
                  </td>
                </tr>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((eachCat, index) => (
                  <tr
                    key={eachCat.id}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-4 text-gray-800">{index + 1}</td>
                    <td className="p-4 text-gray-800 font-medium">
                      {eachCat.categoryName}
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(eachCat.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteCategory(eachCat.id)}
                        className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="mr-2" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    {searchTerm
                      ? "No categories match your search"
                      : "No categories found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Add Category Modal"
          className="modal-content bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Add New Job Category
            </h3>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setModalIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter category name"
            onChange={(e) => setNewCategory(e.target.value)}
            value={newCategory}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            onKeyPress={(e) => e.key === "Enter" && clickToAddCategory()}
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={clickToAddCategory}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Add Category
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default JobCategory;
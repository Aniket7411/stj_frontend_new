import React, { useState, useCallback, useMemo, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { debounce } from "lodash";
import AdminPanelNavbar from "../adminpanel/index";
import Modal from "react-modal";
import { HttpClient } from "../../../server/client/http";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader"; // Example loader from react-spinners


Modal.setAppElement("#root");

const SupportAndFeedback = () => {
  const [isModalOpen, setModalIsOpen] = useState(false)
  const [newCatgeory, setNewCategory] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)



  const getAllData = async () => {
    setIsLoading(true)
    try {
      const response = await HttpClient.get("/support")

      const formattedCategories = response.data.map((each) => ({
        id:each._id,
        name: each.name,
        email: each.email,
        message: each.message
      }))
      setAllMessages(formattedCategories)
      setIsLoading(false)

    } catch (error) {
      //console.log(error)
      toast.error(error.response.message||error.response.data.message||"internal server error")

    }
  }

  useEffect(() => {
    getAllData()
  }, [])

//   const clickToAddCategory = async () => {
//     try {
//       const response = await HttpClient.post("/category/", { categoryName: newCatgeory })
//       toast.success(response?.message)
//       getAllCategories()
//       setModalIsOpen(false)
//       setNewCategory("")

//       console.log(response)
//     } catch (error) {
//       console.log(error)
//       toast.error(error?.message)

//     }
//   }

//   const deleteCategory = async (id) => {
//     console.log("Deleting category with ID:", id);

//     try {
//       const response = await HttpClient.delete(`/category/${id}`)
//       toast.success(response.message)
//       getAllCategories()
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }

//   };


  return (
    <div className="flex">
      <AdminPanelNavbar />
      <div className="p-6 w-full min-h-screen bg-[#F2F9FF]">
        <div className="flex justify-between mt-8 items-center mb-6">
          <h2 className="text-xl font-semibold">Support & Feedback</h2>
          <p className="text-sm text-gray-500">{new Date().toDateString()}</p>
        </div>

        <div className="flex justify-between flex-wrap gap-3 items-center mb-4">
          {/* <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow">
            <CiSearch className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Search categories..."
              className="outline-none flex-grow text-sm"
            />
          </div> */}
          {/* <button onClick={() => setModalIsOpen(true)}
            className="flex items-center bg-green-500 text-white px-2 py-1 w-auto rounded-full"
          >
            <FiPlus className="mr-2" />
            Add Category
          </button> */}
        </div>
        <hr className="mb-2 mt-2" />

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          {/* <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden"> */}
            {/* <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold">
              <tr>
                <th className="p-4 text-left">Number</th>
                <th className="p-4 text-left">Category Name</th>
                <th className="p-4 text-left">Created</th>
                <th className="p-4 text-left ">Actions</th>
              </tr>
            </thead> */}



            <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-medium">
                <th className="p-3">Number</th>
                <th className="p-3"> Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
              </tr>
            </thead>



            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="bg-white text-center py-6">
                    <ClipLoader size={50} color="#4ade80" />
                  </td>
                </tr>
              ) : allMessages?.length > 0 ? (
                allMessages?.map((eachCat, index) => (
                  <tr
                    key={eachCat.id}
                    className="border-b hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <td className="p-4 text-gray-800">{index + 1}</td>
                    <td className="p-4 text-gray-800">{eachCat?.name}</td>
                    <td className="p-4 text-gray-800">{eachCat?.email}</td>
                     <td className="p-4 text-gray-800">{eachCat?.message}</td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="bg-white text-center py-6 text-gray-600">
                    No categories found
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
            <button className="text-[#fff] bg-[#c5363c] text-sm font-bold" onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
          <input
            type="text"
            placeholder="Category Name"
            onChange={(e) => setNewCategory(e.target.value)}
            value={newCatgeory}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none mb-4"
          />
          {/* <button onClick={clickToAddCategory} className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">
            Add Category
          </button> */}
        </Modal>
      </div>
    </div>
  );
};

export default SupportAndFeedback;



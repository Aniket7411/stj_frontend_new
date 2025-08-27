import React, { useEffect, useState } from "react";
import { CiSearch, CiUser, CiBellOn } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import AddAdminModal from "./addNewAdmin";
import AdminPanelnNavbar from "../admin/adminpanel";
import { debounce } from "lodash"; // Use lodash for debouncing
import ClipLoader from "react-spinners/ClipLoader";

const AdminManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminDetails, setAdminDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // Debounced search handler to optimize search performance
  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 500); // Wait for 500ms after the user stops typing

  const filteredAdmins = adminDetails.filter((admin) =>
    Object.values(admin)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const clickToDeleteUser = async (email) => {
    //console.log("Deleting admin with ID:", email);
      try {
        const response = await HttpClient.delete(`/admin/manage/${email}`)
        if (response?.success) {
          toast.success("Admin deleted")
        }
      } catch (error) {
        console.log(error)
      }
  };

  const getAllAdmins = async () => {
    setLoading(true);
    try {
      const response = await HttpClient.get("/admin/manage");
      setAdminDetails(response?.users);
      setLoading(false);
    } catch (err) {
      toast.error("There was an error fetching admins.");
      
    }
  };

  const addNewAdmin = async (data) => {
    if (data?.phoneNumber.length !== 11) {
      return toast.info("Number should have 11 digits")
    }
    try {
      const response = await HttpClient.post("/admin/manage", data);
      getAllAdmins(); // Refresh the list after adding a new admin
    } catch (err) {
      toast.error("There was an error adding the admin.");
    }
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getAllAdmins();
  }, []);

  return (
    <div className="flex">
      <AdminPanelnNavbar />
      <div className="p-6 w-[100%] min-h-screen bg-[#F2F9FF]">
        {/* Header */}
        <div className="flex justify-between mt-8 items-center mb-6">
          <h2 className="text-xl font-semibold ">Admin Management</h2>
          <p className="text-sm text-gray-500">{new Date().toDateString()}</p>
         
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between flex-wrap gap-3 items-center mb-2">
          <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow">
            <CiSearch className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Search by name, email..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="outline-none flex-grow text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full"
            >
              <FiPlus className="mr-2" />
              Add
            </button>
          </div>
        </div>
        <hr className="mb-2 mt-2" />

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-medium">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone Number</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            {isLoading ? (
              <tr>
                <td
                  colSpan="5"
                  className="bg-[#FFF] text-center min-h-screen py-4"
                >
                  <ClipLoader size={50} color="#4ade80" />
                </td>
              </tr>
            ) : (
              <tbody>
                {filteredAdmins.length > 0 ? (
                  filteredAdmins.map((admin, index) => (
                    <tr
                      key={admin._id}
                      className={`border-t text-sm ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                    >
                      <td className="p-3">{admin?.name} </td>
                      <td className="p-3">{admin?.email}</td>
                      <td className="p-3">{admin?.phoneNumber}</td>
                      <td className="p-3 text-green-600 font-medium">
                        {admin?.isVerified ? "Verified" : "Pending"}
                      </td>
                      {/* <td className="cursor-pointer">
                      <button
                        onClick={() => clickToDeleteUser(admin._id)}
                        className="flex w-[100px] items-center bg-red-100 text-red-600 py-1 rounded-full"
                      >
                        <FiTrash2 className="mr-2" />
                        Delete
                      </button>
                    </td> */}
                      <td className="flex p-3">
                        <div
                          onClick={() => clickToDeleteUser(admin?.email)}
                          className="bg-red-100 text-red-600 p-3 rounded-full cursor-pointer"
                        >
                          <FiTrash2 className="" />
                          {/* Delete */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-3 text-center text-gray-500 font-medium"
                    >
                      No matching entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>

        {/* Add Admin Modal */}
        <AddAdminModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={addNewAdmin}
        />
      </div>
    </div>
  );
};

export default AdminManagement;

import React, { useEffect, useState } from "react";
import { CiBellOn, CiSearch, CiUser } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { SlFrame } from "react-icons/sl";
import AdminPanelnNavbar from "../admin/adminpanel";
import { FiTrash2 } from "react-icons/fi";
import { HttpClient } from "../../server/client/http";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const users = [
  {
    name: "John Doe",
    email: "john.doe@email.com",
    id: "#995",
    type: "Business User",
    status: "Active",
    verify: "Unverified",
  },
  {
    name: "Sarah White",
    email: "sarah.white@email.com",
    id: "#996",
    type: "Personal User",
    status: "Active",
    verify: "Verified",
  },
  {
    name: "Mike Brown",
    email: "mike.brown@email.com",
    id: "#985",
    type: "Personal User",
    status: "Active",
    verify: "Unverified",
  },
  {
    name: "John Doe",
    email: "john.doe@email.com",
    id: "#915",
    type: "Business User",
    status: "Active",
    verify: "Unverified",
  },
  {
    name: "Sarah White",
    email: "sarah.white@email.com",
    id: "#895",
    type: "Business User",
    status: "Active",
    verify: "Verified",
  },
];

const Admindashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
   const [selectedWorkPermit, setSelectedWorkPermit] = useState('');

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await HttpClient.get("/admin/user");

      console.log(response, "ksh");

      // Format the data after fetching
      const formattedData = response.response.map((eachEmployer) => ({
        _id: eachEmployer._id,
        email: eachEmployer.email,
        phone: eachEmployer.phoneNumber,
        verify: eachEmployer.verify,
        name: eachEmployer.name,
        type: eachEmployer.userType,
        status: eachEmployer.status,
        workPermit:eachEmployer.workPermit?eachEmployer.workPermit==='NA'?'unfilled':eachEmployer.workPermit:'unfilled'
      }));
      setUsersData(formattedData);
      setFilteredUsers(formattedData); // Set the filtered data initially
    } catch (err) {
      console.error("Error fetching employers:", err);
      toast.error("There is some error");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(filteredUsers, "fus");

  // Filter employers based on search query
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredUsers(usersData); // Show all employers if search is empty
    } else {
      const filteredData = usersData.filter(
        (employer) =>
          employer.name.toLowerCase().includes(query.toLowerCase()) ||
          employer.email.toLowerCase().includes(query.toLowerCase()) ||
          employer.verify.toLowerCase().includes(query.toLowerCase()) ||
          employer.type.toLowerCase().includes(query.toLowerCase()) ||
          employer.phone.toString().toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filteredData);
    }
  };

  useEffect(() => {
    getUsers();
  }, []); // Empty dependency array ensures this runs once after component mounts

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await HttpClient.delete(`/admin/user/delete/${selectedUserId}`);
      toast.success("User deleted successfully");
      setShowModal(false);
      getUsers();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  };

  const formatDate = () => {
    const date = new Date();

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = weekdays[date.getDay()];

    const dayOfMonth = date.getDate();
    const suffix =
      dayOfMonth % 10 === 1 && dayOfMonth !== 11
        ? "st"
        : dayOfMonth % 10 === 2 && dayOfMonth !== 12
          ? "nd"
          : dayOfMonth % 10 === 3 && dayOfMonth !== 13
            ? "rd"
            : "th";

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth}${suffix} ${month} ${year}`;
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";
      await HttpClient.put(`/admin/user/edit`, {
        userId: id,
        status: updatedStatus,
      });
      //toast.success(`User status updated to ${updatedStatus}`);
      getUsers();
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  return (
    <div className="flex">
      <AdminPanelnNavbar />
      <div className="pt-12 bg-[#F2F9FF] w-[100%] p-5 ">
        {/* Search Bar */}


        {/* Header Section */}
        <div className="flex justify-between px-10 flex-wrap items-center">
          <h3 className="text-xl text-center font-semibold text-gray-800">
            User Management
          </h3>
          <p className="text-sm text-gray-500">{formatDate()}</p>
        </div>

        <hr className="mb-2 mt-2" />

        <div className="bg-white rounded-lg shadow p-2">
         <div className="flex justify-between ">
           <div
            className="flex items-center bg-white md: w-1/3 rounded-lg px-2 py-1 mb-2 border border-[#DFDFDF]"
          >
            <CiSearch className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Search by any field"
              className="p-1 w-full bg-transparent focus:outline-none"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
           <div className="max-w-xs my-4">
      <select
        className="w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring focus:border-blue-500"
       // value={selected}
        onChange={(e) => {
         // setSelected(e.target.value);
          //console.log('Selected:', e.target.value);
         // debugger
         if(e.target.value==='all'){
          setFilteredUsers(usersData);
          return;
         }
           const filteredData = usersData.filter(
        (employer) =>
          employer.type==='employee'&&
        employer?.workPermit===e.target.value
      );
      setFilteredUsers(filteredData);
        }}
      >
        <option selected value="" disabled>Filter work permit</option>
        <option value="yes">yes</option>
        <option value="no">no</option>
        <option value="unfilled">unfilled</option>
         <option value="all">all</option>
      </select>
          </div>
         </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pb-4 space-y-4 sm:space-y-0">
            <h1 className="text-lg sm:text-xl font-bold">User Details</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              {filteredUsers.length} Users
            </span>
          </div>
          {/* Add a scrollable container for the table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left text-sm font-medium">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">User Type</th>
                  {/* <th className="p-3">Status</th> */}
                  <th className="p-3">Email Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              {isLoading ? (
                <tbody>
                  <tr>
                    <td
                      colSpan="5"
                      className="bg-[#FFF] text-center min-h-screen py-4"
                    >
                      <ClipLoader size={50} color="#4ade80" />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={index}
                      className={`border-t text-sm ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                    >
                      <td className="p-3 flex items-center space-x-3">
                        {/* <img
                          src={`https://i.pravatar.cc/40?img=${index + 1}`}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        /> */}
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                      </td>
                      <td className="font-medium">{user.phone}</td>
                      <td className="">
                        {user.type?.charAt(0).toUpperCase() +
                          user.type?.slice(1)}
                      </td>
                      {/* <td className=" text-green-500 font-medium">
                        {user.status}
                      </td> */}
                      {/* <td>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={user.status === "active"}
                            onChange={() =>
                              handleStatusToggle(user._id, user.status)
                            }
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label>
                      </td> */}
                      <td
                        className={` ${user.verify === "verified"
                          ? "text-green-500"
                          : "text-red-500"
                          } font-medium`}
                      >
                        {user.verify}
                      </td>
                      <td className="m-auto">
                        <div className="">
                          <img
                            src="/assets/deleteIcon.svg"
                            onClick={() => handleDeleteClick(user._id)}
                            className="cursor-pointer h-6 w-6"
                            alt=""
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>




        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
              <p className="mt-2">Are you sure you want to delete this user?</p>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  No
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admindashboard;

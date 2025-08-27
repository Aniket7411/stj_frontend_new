import React, { useState } from "react";
import { CiBellOn, CiSearch, CiUser } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { SlFrame } from "react-icons/sl";

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

const Usermanagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchQuery)
    )
  );

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

  return (
    <div className="pt-12 px-3 md:w-[100%] min-h-screen bg-[#F2F9FF] ">
      {/* Search Bar */}
      <div
        className="flex items-center bg-[#fff] md:w-[50%] rounded-full px-3 py-2 mb-6"
        style={{
          outline: "1px solid #DFDFDF",
        }}
      >
        <CiSearch className="text-gray-500 mr-2" />
        <input
          type="search"
          className="flex-grow p-1 outline-none text-sm"
          placeholder="Search here"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Header Section */}
      <div className="flex justify-between flex-wrap  items-center">
        <h3 className="text-xl font-semibold text-gray-800">User Management</h3>
        <p className="text-sm text-gray-500">{formatDate()}</p>

        <div className="flex items-center space-x-4">
          <SlFrame className="text-gray-600 cursor-pointer" />
          <IoMdSettings className="text-gray-600 cursor-pointer" />
          <CiUser className="text-gray-600 cursor-pointer" />
          <CiBellOn className="text-gray-600 cursor-pointer" />
        </div>
      </div>

      <hr className="mb-2 mt-2" />

      <div className="bg-white rounded-lg shadow p-4">
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
                <th className="p-3">User ID</th>
                <th className="p-3">User Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Verify</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={index}
                  className={`border-t text-sm ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 flex items-center space-x-3">
                    <img
                      src={`https://i.pravatar.cc/40?img=${index + 1}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.type}</td>
                  <td className="p-3 text-green-500 font-medium">
                    {user.status}
                  </td>
                  <td
                    className={`p-3 ${
                      user.verify === "Verified"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-medium`}
                  >
                    {user.verify}
                  </td>
                  <td className="p-3 text-gray-500 cursor-pointer">⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No matching users found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Usermanagement;

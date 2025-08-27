import React, { useState } from "react";
import { CiBellOn, CiSearch, CiUser } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { SlFrame } from "react-icons/sl";
import { FiDownload } from "react-icons/fi";

const users = [
  {
    id: "#101",
    course: "React Development",
    date: "2024-01-01",
    endDate: "2024-06-01",
    amount: "$499",
    status: "Completed",
  },
  {
    id: "#102",
    course: "Node.js Mastery",
    date: "2024-02-15",
    endDate: "2024-07-15",
    amount: "$399",
    status: "In Progress",
  },
  {
    id: "#103",
    course: "Full Stack Bootcamp",
    date: "2024-03-10",
    endDate: "2024-09-10",
    amount: "$899",
    status: "Completed",
  },
  {
    id: "#104",
    course: "UI/UX Design",
    date: "2024-04-20",
    endDate: "2024-10-20",
    amount: "$299",
    status: "Pending",
  },
  {
    id: "#105",
    course: "Python for Data Science",
    date: "2024-05-05",
    endDate: "2024-11-05",
    amount: "$599",
    status: "In Progress",
  },
];

const PaymentHistory = () => {
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
    <div className="pt-12 px-3 md:w-[100%] bg-[#F2F9FF]  min-h-screen">
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
        <h3 className="text-xl font-semibold text-gray-800">Billing History</h3>
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
          <h1 className="text-lg sm:text-xl font-bold">Billing Details</h1>
          <div className="px-3 py-1 flex items-center ml-1 bg-blue-100 text-blue-600 rounded-full">
            <FiDownload />
            <span>Get Statements</span>
          </div>
        </div>
        {/* Add a scrollable container for the table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-medium">
                <th className="p-3">#ID</th>
                <th className="p-3">Applied Course</th>
                <th className="p-3">Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
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
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.course}</td>
                  <td className="p-3">{user.date}</td>
                  <td className="p-3">{user.endDate}</td>
                  <td className="p-3">{user.amount}</td>
                  <td className="p-3 text-green-500 font-medium">
                    {user.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No matching records found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

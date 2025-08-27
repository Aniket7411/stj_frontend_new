import React, { useState } from "react";
import { CiSearch, CiUser, CiBellOn } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import Admindashboard from "../admin/adminpanel";
import { useNavigate } from "react-router-dom";
const CMS = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const pages = [
    { name: "About Us", status: "Active", endPoint: "/about-us" },
    { name: "Our Purpose", status: "Active", endPoint: "/about-us" },
    { name: "Our Vision", status: "Active", endPoint: "/about-us" },
    { name: "Why Choose Us", status: "Active", endPoint: "/about-us" },
    { name: "Join Us", status: "Active", endPoint: "/about-us" },
    { name: "Terms of Service", status: "Active", endPoint: "/termsofservice" },
    { name: "Privacy Policy", status: "Active", endPoint: "/termsofservice" },
  ];

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Admindashboard />
      <div className="p-6 bg-[#F2F9FF] w-[100%] min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mt-5 mb-6">
          <h2 className="text-xl font-semibold">CMS</h2>
          <p className="text-sm text-gray-500">{new Date().toDateString()}</p>
          <div className="flex items-center space-x-4">
            <IoMdSettings className="text-gray-600 cursor-pointer" />
            <CiUser className="text-gray-600 cursor-pointer" />
            <CiBellOn className="text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center w-[40%] bg-white rounded-full px-4 py-2 shadow mb-4">
          <CiSearch className="text-gray-500 mr-2" />
          <input
            type="search"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none flex-grow text-sm"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-medium">
                <th className="p-3">Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>            
                <th className="p-3">End Point</th>


              </tr>
            </thead>
            <tbody>
              {filteredPages.length > 0 ? (
                filteredPages.map((page, index) => (
                  <tr
                    key={index}
                    className={`border-t text-sm ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3">{page.name}</td>
                    <td className="p-3 text-green-600 font-medium">
                      {page.status}
                    </td>
                    <td className="p-3 text-gray-500 cursor-pointer">
  <img
    src="/assets/editIc.svg"
    alt="profile"
    className=""
    onClick={() => navigate(`/cms-page`, { state: { endPoint: page.endPoint } })}
  />
</td>
                    <td className="p-3 text-green-600 font-medium">
                      {page.endPoint}
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="p-3 text-center text-gray-500 font-medium"
                  >
                    No matching entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CMS;

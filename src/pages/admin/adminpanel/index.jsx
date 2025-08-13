import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiDollar } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { MdContactSupport, MdDashboard, MdMenu, MdClose, MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { PiNotepad } from "react-icons/pi";
import { FaArrowRightFromBracket, FaArrowRightToBracket } from "react-icons/fa6";
import Backbutton from "../../../components/common/backbutton";

const Admindashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation(); // Get current route location

  const navItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <MdDashboard /> },
    {
      name: "Admin Management",
      path: "/admin-management",
      icon: <GrUserAdmin />,
    },
    {
      name: "Employer Management",
      path: "/employer-management",
      icon: <PiNotepad />,
    },
    {
      name: "Product Management",
      path: "/subscription-configuration",
      icon: <PiNotepad />,
    },
    { name: "Job Category", path: "/job-categories", icon: <PiNotepad /> },
     { name: "Course Category", path: "/course-categories", icon: <PiNotepad /> },

    // { name: "Courses", path: "/courses-admin", icon: <PiNotepad /> },

    {
      name: "CMS",
      path: "/cms-management",
      icon: <img src="/assets/cms.svg" alt="cms" className="w-5 h-5" />,
    },
    // { name: "Payment & Transactions", path: "/payments", icon: <CiDollar /> },
    {
      name: "Support & Feedback",
      path: "/support-feedback",
      icon: <MdContactSupport />,
    },
  ];

  const getName = localStorage.getItem("name");
  const parsedName = JSON.parse(getName);
  const name = parsedName?.role;

  return (
    <div className="flex max-h-screen overflow-auto">
      {/* Mobile Menu Icon */}
      <button
        className="lg:hidden fixed top-10 z-50 p-2 transition"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <div className="h-screen flex items-center">
         <MdOutlineArrowBackIos size={20} className="bg-[#c5363c] text-[#fff] rounded-md h-[70px]" />

         </div>

        ) : (

          <div className="h-screen flex items-center">
          <MdArrowForwardIos size={20} className="bg-[#c5363c] text-[#fff] rounded-md h-[70px]" />

         </div>


        )}
      </button>

      {/* Sidebar */}
      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`fixed lg:static top-0 left-0 w-64 h-full bg-white p-4 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:w-64 overflow-y-auto`}
      >
        <div
          className="flex flex-col items-center mb-6"
          style={{ paddingTop: "50px" }}
        >


          <img
            src="/assets/profilepic.png"
            className="w-[45px] h-[45px] mr-2 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-blue-500"
            alt="navprofile"
          />
          <h1 className="text-xl">ADMIN</h1>
          </div>
        <hr className="mb-6" />
        <Backbutton/>
        <div className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item?.name}
              to={item?.path}
              className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-all duration-300 ${location.pathname === item.path
                  ? "bg-blue-100 text-blue-600 font-medium" // Active tab styles
                  : "hover:bg-gray-200 hover:text-black" // Inactive tab hover styles
                }`}
            >
              {item?.icon}
              <p className="font-inter">{item?.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;

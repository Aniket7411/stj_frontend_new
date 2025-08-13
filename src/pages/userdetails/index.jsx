import { useState, useEffect } from "react";
import Userdashborad from "../userdashboard";
import UserPofile from "../userprofile";
import UserCourses from "../usercourses";
import CandidateDocuments from "../candidateDocuments";
import Bankdashboard from "../bankanddetails";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUser, FiHome, FiFileText, FiBook } from "react-icons/fi";
import { FaEuroSign, FaPoundSign } from "react-icons/fa";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Load the saved tab from local storage
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
    // Save the selected tab to local storage
    localStorage.setItem("activeTab", tabId);
  };

  const tabItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiHome className="mr-2" /> },
    { id: "profile", label: "Edit Profile", icon: <FiUser className="mr-2" /> },
    { id: "documents", label: "Documents", icon: <FiFileText className="mr-2" /> },
    { id: "bankdetails", label: "Bank Details", icon: <FaPoundSign className="mr-2" /> },
    { id: "courses", label: "My Courses", icon: <FiBook className="mr-2" /> },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Userdashborad />;
      case "profile":
        return <UserPofile />;
      case "courses":
        return <UserCourses />;
      case "documents":
        return <CandidateDocuments />;
      case "bankdetails":
        return <Bankdashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-3 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="flex justify-between items-center mt-10">
        <h3 className="md:text-2xl text-lg font-bold bg-gradient-to-r mt-2 mb-2 from-[#D3555A] to-[#6A5ACD] bg-clip-text text-transparent">
          Profile Information
        </h3>
        <button
          className="md:hidden text-2xl text-gray-600 hover:text-gray-900 focus:outline-none transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="mb-2">
        <div
          className={`md:flex space-y-2 md:space-y-0 md:space-x-2 rounded-lg overflow-hidden ${isMenuOpen ? "block" : "hidden"
            } md:block`}
        >
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center w-full md:w-auto px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg ${activeTab === tab.id
                ? "bg-[#D3555A] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render Active Component */}
      <div className="bg-white rounded-xl shadow-sm ">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default UserProfile;

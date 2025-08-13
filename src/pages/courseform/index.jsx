import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import CourseDetails from '../coursedetails';
import CourseRequirements from '../couserequirements';
import CourseCertificate from '../coursecertificate';
import { Link } from 'react-router-dom';

const CourseForm = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("courseDetails");

  // Function to render content based on active tab
  const renderActiveTab = () => {
    switch (activeTab) {
      case "courseDetails":
        return <CourseDetails setActiveTab={setActiveTab} />;
      case "courseRequirements":
        return <CourseRequirements  setActiveTab={setActiveTab}/>;
      case "courseCertificate":
        return <CourseCertificate setActiveTab={setActiveTab} />;
      default:
        return <CourseDetails />;
    }
  };

  return (
    <div className="p-10">
       <Link  to="/courses">
                <FaArrowLeft
                    className="mt-5 cursor-pointer text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-105"
                />
            </Link>
      <h2 className='mb-3 mt-2'>Create New Course</h2>

      {/* Tabs Section */}
      <div className="flex justify-between text-center w-full sm:w-1/2 rounded-md">
        <h3
          onClick={() => setActiveTab("courseDetails")}
          className={`font-semibold cursor-pointer ${
            activeTab === "courseDetails" ? "text-[#D3555A]" : "text-gray-700"
          }`}
        >
          Course details
        </h3>
        <h3
          onClick={() => setActiveTab("courseRequirements")}
          className={`font-semibold cursor-pointer ${
            activeTab === "courseRequirements" ? "text-[#D3555A]" : "text-gray-700"
          }`}
        >
          Course requirements
        </h3>
        <h3
          onClick={() => setActiveTab("courseCertificate")}
          className={`font-semibold cursor-pointer ${
            activeTab === "courseCertificate" ? "text-[#D3555A]" : "text-gray-700"
          }`}
        >
          Course certificates
        </h3>
      </div>

      <hr className="border-gray-300 mt-2 mb-3" />

      {/* Render Active Tab Content */}
      {renderActiveTab()}
    </div>
  );
};

export default CourseForm;

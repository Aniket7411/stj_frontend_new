import { useState } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  CiBookmark,
  CiClock1,
  CiEdit,
  CiLocationOn,
  CiShare2,
} from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { FaBookOpenReader, FaMoneyBillWave } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoIosAlert } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { TbJewishStarFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import { useEffect } from "react";
import Modal from "react-modal";
import Proposal from "./proposal";


const JobDescription = () => {
     const location=useLocation();
    const [jobDetails,setjobDetails]=useState();
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const navigate=useNavigate()
  
     const getJobDetails = async () => {
        try {
          // setLoading(true);
          const response = await HttpClient.get(`/jobs/job-posts/${location?.pathname.split('/').pop()}`);   
          setjobDetails(response?.data);
          
        } catch (error) {
          console.error("Error fetching total jobs:", error.message);
        }
      };
  
  
      useEffect(()=>{
        getJobDetails();
      },[])
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Step 2: Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Step 3: Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-start gap-6 p-5">
        {/* Job Description Section */}
        <div className="w-full md:w-[60%] mt-5 md:mt-0 p-5 md:p-10 rounded-md">
          <Link to="/createdjob">
            <FaArrowLeft className="mb-1" />
          </Link>
          <p className="text-[#976063] font-bold">{jobDetails?.companyDetails?.companyName}</p>
          <h2 className="font-futura text-xl md:text-2xl">
          {jobDetails?.jobDetails?.jobTitle}
          </h2>
          <p className="mb-1">
            <strong>Posted: </strong> 20 May, 2024
          </p>
          <div className="flex items-center text-[#976063] font-bold mb-2">
            <CiLocationOn className="mr-2" />
            <p>
              {jobDetails?.jobDetails?.city}
              {jobDetails?.jobDetails?.state}
              {jobDetails?.jobDetails?.country}
              {jobDetails?.jobDetails?.zipCode}
              </p>
          </div>
          <p className="bg-[#F0F0F0] w-fit mb-3 rounded-md px-2 py-1">
            <strong>{jobDetails?.jobDetails?.salary?.amount}{' /'}{jobDetails?.jobDetails?.salary?.frequency} </strong> Fixed price
          </p>
          <div className="flex flex-wrap gap-2 text-[#505050] mb-4">
            <p className="bg-[#EBF6FF] rounded-md px-2 py-1">{jobDetails?.workSchedule?.workingDays?.length}{" days a week"}</p>
            <p className="bg-[#EBF6FF] rounded-md px-2 py-1">
            {jobDetails?.jobRequirements?.preferredExperience?.minimumExperience}
            {'-'}
            {jobDetails?.jobRequirements?.preferredExperience?.maximumExperience}
              exp. required
            </p>
          </div>
          <hr className="border-gray-300 my-2" />

          <div className="flex flex-wrap gap-6">
            <div>
              <h4 className="font-bold mb-3">Profile Insights</h4>
              <div className="flex items-start mb-3 text-[#5F5F5F]">
                <CgProfile className="mt-1 mr-2 text-[#D3555A]" />
                <div>
                  <h4 className="font-bold">Location</h4>
                  <p>{jobDetails?.jobDetails?.city}
              {jobDetails?.jobDetails?.state}
              {jobDetails?.jobDetails?.country}
              {jobDetails?.jobDetails?.zipCode}</p>
                </div>
              </div>
              <div className="flex items-start mb-3 text-[#5F5F5F]">
                <CgProfile className="mt-1 mr-2 text-[#D3555A]" />
                <div>
                  <h4 className="font-bold">Preferred Experience Level</h4>
                  <p>
                  {jobDetails?.jobRequirements?.preferredExperience?.minimumExperience}
            {'-'}
            {jobDetails?.jobRequirements?.preferredExperience?.maximumExperience}
                    years</p>
                </div>
              </div>
              <div className="flex items-start text-[#5F5F5F]">
                <FaBookOpenReader className="mt-1 mr-2 text-[#D3555A]" />
                <div>
                  <h4 className="font-bold">Minimum Qualification</h4>
                  <p>{jobDetails?.jobRequirements?.minimumQualification}
              </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-3">Job Insights</h4>
              <div className="flex items-start mb-3 text-[#5F5F5F]">
                <CiClock1 className="mt-1 mr-2 text-[#D3555A]" />
                <div>
                  <h4 className="font-bold">Shift & Schedule</h4>
                  <p>{jobDetails?.workSchedule?.startTime}{" - "}
              {jobDetails?.workSchedule?.endTime}{" "}
              {jobDetails?.jobDetails?.country}{" "}
              {jobDetails?.jobDetails?.zipCode}</p>
                </div>
              </div>
              <div className="flex items-start mb-3 text-[#5F5F5F]">
                <AiOutlineSchedule className="mt-1 mr-2 text-[#D3555A]" />
                <div>
                  <h4 className="font-bold">Job Start Date</h4>
                  <p>{jobDetails?.workSchedule?.startDate?.substring(0,10)}</p>
                </div>
              </div>
              <div className="flex items-start text-[#5F5F5F]">
                <MdCalendarMonth className="mt-1 mr-2 text-[#D3555A]" />
                <div>
                  <h4 className="font-bold">Application Deadline</h4>
                  <p>{jobDetails?.jobDetails?.applicationDeadline?.substring(0,10)}</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 my-2" />

          <h3 className="text-[#5F5F5F] mb-2 font-semibold font-poppins">
            Job Description
          </h3>
          <p className="text-justify font-inter">
          {jobDetails?.jobDetails?.jobDescription}
          </p>

          <p className="mt-2">
            <strong className="font-inter">{"Employer name:  "}{jobDetails?.companyDetails?.employerName} </strong>
          </p>
          <p>
            <strong className="font-inter">{"Email:  "} {jobDetails?.companyDetails?.contactEmail} </strong>
          </p>
          <p>
            <strong className="font-inter">{"Contact Number:  "}{jobDetails?.companyDetails?.contactNumber} </strong>
          </p>
          <p>
            <strong className="font-inter">{"Website:  "}{jobDetails?.companyDetails?.companyWebsite} </strong>
          </p>
          <hr className="border-gray-300 my-2" />

          <div>
            <div className="flex justify-between flex-wrap p-3">
              <div className="flex items-center">
                <MdCalendarMonth className="mr-2" />
                <p className="text-[#505050] font-semibold">6 Months</p>
              </div>

              <div className="flex items-center">
                <CiClock1 className="mr-2" />
                <p className="text-[#505050] font-semibold"> {jobDetails?.workSchedule?.duration} hrs/day</p>
              </div>

              <div className="flex items-center">
                <IoIosAlert className="mr-2" />
                <p className="text-[#505050] font-semibold">Intermediate</p>
              </div>

              <div className="flex items-center">
                <FaMoneyBillWave className="mr-2" />
                <p className="text-[#505050] font-semibold">
                {jobDetails?.jobDetails?.salary?.amount}{' /'}{jobDetails?.jobDetails?.salary?.frequency} <br />
                  <span className="font-normal text-[#787878] text-[12px]">
                    Fixed price
                  </span>
                </p>
              </div>
            </div>
            <hr className="border-gray-300 my-2" />
            <div className="flex items-center p-3">
              <HiOutlineLightBulb className="mr-2 text-[#D3555A] text-2xl" />
              <p className="text-[#505050] font-semibold">Skills</p>
            </div>
            <div className="flex flex-wrap p-2">
              {
                jobDetails?.jobRequirements?.preferredSkills.map((item)=>(
                  <p className="bg-[#ECECEC] px-2 py-1 gap-2 m-1 rounded-md">
                  {item}
                </p>
                ))    
              }                    

            </div>
            <hr className="border-gray-300 my-2" />
            <strong>Activity on this job</strong>
            <p className="text-[12px]">
              Submission: <strong>5 to 10</strong>
            </p>
            <p className="text-[12px]">
              Interviewing:: <strong>0</strong>
            </p>
            <hr className="border-gray-300 my-2" />
            <strong>Upgrade your membership to see the bid range</strong>
            <hr className="border-gray-300 my-2" />
          </div>
        </div>

        {/* About Client Section */}
        <div className="w-full md:w-[35%] md:mt-8  bg-gray-100 p-5 rounded-md">
          <div className="flex mb-4">
            <CiEdit
              onClick={() => setModalIsOpen(true)}
              className="bg-[#E6E6E6] w-[30px] h-[30px] rounded-md px-1 mr-2"
            />

            <div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                  content: {
                    color: "black",
                    padding: "20px",
                    borderRadius: "10px",
                  },
                }}
              >
                <div className="flex justify-between">
                  <h2>Edit Job</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setModalIsOpen(false);
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="flex flex-col lg:flex-row justify-between mb-2 gap-4">
                  {/* Company Name Input */}
                  <div
                    className="w-full lg:w-[40%] p-4 rounded-md shadow-md bg-white"
                    style={{
                      outline: "1px solid #ccc",
                    }}
                  >
                    <label
                      htmlFor="companyName"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input                     
                      type="text"
                      id="companyName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value="companyname"
                      placeholder="Enter company name"
                    />
                  </div>

                  {/* Employee Name Input */}
                  <div
                    className="w-full lg:w-[40%] p-4 rounded-md shadow-md bg-white"
                    style={{
                      outline: "1px solid #ccc",
                    }}
                  >
                    <label
                      htmlFor="employeeName"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Employee Name
                    </label>
                    <input
                      type="text"
                      id="employeeName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value="Employename"
                      placeholder="Enter employee name"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Company Description */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{
                      outline: "1px solid #ccc",
                    }}
                  >
                    <label
                      htmlFor="companyDescription"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Company Description{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="companyDescription"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                      rows="4"
                      placeholder="Type your company description here"
                    ></textarea>
                  </div>

                  {/* Contact Email */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{
                      outline: "1px solid #ccc",
                    }}
                  >
                    <label
                      htmlFor="contactEmail"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Company Website */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{
                      outline: "1px solid #ccc",
                    }}
                  >
                    <label
                      htmlFor="companyWebsite"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Company Website
                    </label>
                    <input
                      type="url"
                      id="companyWebsite"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter company website"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Job Title */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="jobTitle"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter Job Title"
                    />
                  </div>

                  {/* Job Description */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="jobDescription"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="jobDescription"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                      rows="4"
                      placeholder="Type your job description here"
                    ></textarea>
                  </div>

                  {/* Employment Type */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="employmentType"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Employment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="employmentType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option>Select Job Type</option>
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>

                  {/* State */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="state"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter State"
                    />
                  </div>

                  {/* Zipcode */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="postcode"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Postcode
                    </label>
                    <input
                      type="text"
                      id="postcode"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter location postcode"
                    />
                  </div>

                  {/* Job Category */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="jobCategory"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Job Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="jobCategory"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option>Select Job Category</option>
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>IT</option>
                    </select>
                  </div>

                  {/* Country */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value="India"
                      readOnly
                    />
                  </div>

                  {/* City */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter City"
                    />
                  </div>

                  {/* Application Deadline */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="applicationDeadline"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Application Deadline{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="day"
                        className="w-[30%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="31"
                      />
                      <input
                        type="text"
                        id="month"
                        className="w-[30%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="12"
                      />
                      <input
                        type="text"
                        id="year"
                        className="w-[40%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="2024"
                      />
                    </div>
                  </div>

                  {/* Salary/Pay Range */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="salaryRange"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Salary/Pay Range <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="salaryAmount"
                        className="w-[70%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="0"
                      />
                      <select
                        id="salaryUnit"
                        className="w-[30%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option>Select Unit</option>
                        <option>Per Hour</option>
                        <option>Per Day</option>
                        <option>Per Month</option>
                        <option>Per Year</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Minimum Qualification */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="qualification"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Minimum Qualification{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="qualification"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option>Select Qualification</option>
                      <option>High School</option>
                      <option>Associate Degree</option>
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>PhD</option>
                    </select>
                  </div>

                  {/* Minimum and Maximum Experience */}
                  <div className="flex gap-4">
                    <div
                      className="w-1/2 p-4 rounded-md shadow-md bg-white"
                      style={{ outline: "1px solid #ccc" }}
                    >
                      <label
                        htmlFor="minExperience"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Minimum Experience{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="minExperience"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter Minimum Experience"
                        value="2 years"
                      />
                    </div>

                    <div
                      className="w-1/2 p-4 rounded-md shadow-md bg-white"
                      style={{ outline: "1px solid #ccc" }}
                    >
                      <label
                        htmlFor="maxExperience"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Maximum Experience
                      </label>
                      <input
                        type="text"
                        id="maxExperience"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Select Maximum Experience"
                      />
                    </div>
                  </div>

                  {/* Preferred Skills */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="skills"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Preferred Skills Required{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 border border-blue-400 rounded-full">
                        JavaScriptX
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 border border-blue-400 rounded-full">
                        ReactX
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 border border-blue-400 rounded-full">
                        Node.jsX
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 border border-blue-400 rounded-full">
                        Cybersecurity principlesX
                      </span>
                    </div>
                    <button className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Add Skill
                    </button>
                  </div>

                  {/* Dress Code */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="dressCode"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Dress Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="dressCode"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Describe your dress code"
                    />
                  </div>

                  {/* Field Related Documents */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="documents"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Need field-related documents?
                    </label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="resume"
                          className="form-checkbox"
                        />
                        <label htmlFor="resume" className="text-gray-700">
                          Resume
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="coverLetter"
                          className="form-checkbox"
                        />
                        <label htmlFor="coverLetter" className="text-gray-700">
                          Cover Letter
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Job-related Documents */}
                  <div
                    className="w-full p-4 rounded-md shadow-md bg-white"
                    style={{ outline: "1px solid #ccc" }}
                  >
                    <label
                      htmlFor="jobDocuments"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Need field-related documents?
                    </label>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <input
                          type="text"
                          placeholder="Title"
                          className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                          type="text"
                          placeholder="Type"
                          className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <select className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                          <option>Choose document side</option>
                          <option>Front</option>
                          <option>Front & Back</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="w-full p-6 rounded-md shadow-md bg-white"
                  style={{ outline: "1px solid #ccc" }}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Job Timings & Dates
                  </h2>
                  <div className="flex flex-col gap-6">
                    {/* Start Time */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="startTime"
                        className="text-sm font-medium text-gray-700"
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        defaultValue="09:00"
                      />
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="endTime"
                        className="text-sm font-medium text-gray-700"
                      >
                        End Time
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        defaultValue="17:00"
                      />
                    </div>

                    {/* Working Days */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">
                        Working Days
                      </label>
                      <div className="flex gap-2">
                        <label
                          htmlFor="monday"
                          className="flex items-center gap-1"
                        >
                          <input type="checkbox" id="monday" /> Mon
                        </label>
                        <label
                          htmlFor="tuesday"
                          className="flex items-center gap-1"
                        >
                          <input type="checkbox" id="tuesday" /> Tue
                        </label>
                        <label
                          htmlFor="wednesday"
                          className="flex items-center gap-1"
                        >
                          <input type="checkbox" id="wednesday" /> Wed
                        </label>
                        <label
                          htmlFor="thursday"
                          className="flex items-center gap-1"
                        >
                          <input type="checkbox" id="thursday" /> Thu
                        </label>
                        <label
                          htmlFor="friday"
                          className="flex items-center gap-1"
                        >
                          <input type="checkbox" id="friday" /> Fri
                        </label>
                        <label
                          htmlFor="saturday"
                          className="flex items-center gap-1"
                        >
                          <input type="checkbox" id="saturday" /> Sat
                        </label>
                        <label
                          htmlFor="sunday"
                          className="flex items-center gap-1"
                        >
                          <input type="checkbox" id="sunday" /> Sun
                        </label>
                      </div>
                    </div>

                    {/* Job Start Date */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="jobStartDate"
                        className="text-sm font-medium text-gray-700"
                      >
                        Job Start Date
                      </label>
                      <input
                        type="date"
                        id="jobStartDate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        defaultValue="2025-01-01"
                      />
                    </div>

                    {/* Duration (Days) */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="duration"
                        className="text-sm font-medium text-gray-700"
                      >
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter Duration in Days"
                        defaultValue="8"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full lg:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Update Job
                </button>
              </Modal>
            </div>

            <CiBookmark className="bg-[#E6E6E6] w-[30px] h-[30px] rounded-md px-1 mr-2" />
            <CiShare2 className="bg-[#E6E6E6] w-[30px] h-[30px] rounded-md px-1" />
          </div>
          <p className="text-[14px] mb-3">
            <strong>Status:</strong> Active
          </p>
          <strong>About the Client</strong>
          <div className="flex items-center my-3">
            <img
              src="/assets/verified.png"
              alt="verified"
              className="w-5 h-5 mr-2"
            />
            <p className="text-[12px] font-poppins font-semibold">
              Payment method verified
            </p>
          </div>
          <div className="flex items-center mb-2">
            <TbJewishStarFilled className="text-[#FF9746] mr-2" />
            <p>4.9</p>
          </div>
          <p className="font-thin text-[12px] mb-3">4.89 of 157 reviews</p>

          <strong className="font-poppins">Malaysia</strong>
          <p className="text-[#505050] mb-3">Malaysia 05:09 PM</p>

          <strong className="font-poppins">245 jobs posted</strong>
          <p className="text-[#505050] mb-3">80% Higher rate, 04 Open jobs</p>

          <strong className="font-poppins">$6.9K total spent</strong>
          <p className="text-[#505050] mb-3">248 hires, 09 active</p>

          <p className="text-[#505050] mb-3">Individual Client</p>

          <h3 className="font-bold mb-3">Member since Jan 8, 2020</h3>

          <strong className="font-poppins">Job Link</strong>
          <p className="bg-[#D9D9D9] px-2 py-1 text-[12px] text-[#787878] w-auto mb-2">
            weblink
          </p>
          <p className="underline font-bold text-[15px] text-blue-600 cursor-pointer">
            Copy Link
          </p>
        </div>
      </div>
        <Proposal JobId={location?.pathname.split('/').pop()} jobDetails={jobDetails}  />
    </>
  );
};

export default JobDescription;

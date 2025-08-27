import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdNotes } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { CiClock1 } from "react-icons/ci";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdCalendarMonth } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import { FaMoneyBillWave } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { JobContext } from "../jobcontext";

import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

const postingDate = new Date();  // Getting the current date

// Format the date to include only the day and date
const formattedDate = postingDate.toLocaleString('en-GB', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: '2-digit'
});

console.log(formattedDate);  // Output: Wed, 08 Jan 2025



const Publish = () => {
  const {
    jobDetails,
    jobRequirements,
    companyDetails,
    workSchedule,
    postingJob,
    setPostingJob,
  } = useContext(JobContext);

  const navigate = useNavigate();


  const jobPostingDetails = {
    workSchedule,
    jobRequirements,
    companyDetails,
    jobDetails
  }


  console.log("jobPostingDetailsjobPostingDetails", jobPostingDetails)



  const publishJob = async (type) => {

    //console.log("jobPostingDetails", jobPostingDetails?.jobDetails?.jobTitle)

    if (jobPostingDetails?.jobDetails?.jobTitle === "") {
      return toast.warn("Please fill all the job details")
    }

    try {
      // debugger
      const response = await HttpClient.post(
        "/jobs/job-posts",
        jobPostingDetails
      );
      console.log("Response Data:", response.data);

      if (type === 'normal') {
        toast.success("Job details submitted successfully!");
        // setPostingJob({
        //   jobDetails: jobDetails,
        //   jobRequirements: jobRequirements,
        //   companyDetails: companyDetails,
        //   workSchedule: workSchedule,
        // });
        navigate("/findjobs");
        // Adjust the route as needed
      }

      else if (type === 'paid') {
        toast.success("Job details submitted successfully! Kindly pay the amount to make it featured");
        const data = await HttpClient.post(`/stripe/create-checkout-session`, {
          product: 'featured',
          paidFor: 'featured',
          jobId: response.data._id
        });
        // debugger
        if (data.success === true || data.status === 200) {
          window.location.href = data.url
        }
      }



    }

    catch (error) {
      console.error("Error submitting job details:", error);
      toast.info(error?.message ? error?.message : "there is some issue. try re-login")
    }
  }

  return (
    <div>
      {/* Top section with background image */}
      <div
        className="top-section flex justify-start items-end p-3"
        style={{
          backgroundImage: 'url("/assets/publishingjob.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          width: "100vw",
        }}
      >
        <div>
          <img src="/assets/star.png" alt="star" className="w-[25px]" />

          <h1 className="text-white text-2xl">Post Job : Publishing Job</h1>
          <p className="text-[#fff]">
            Fill in the details below to reach qualified candidates quickly and
            securely.
          </p>
        </div>
      </div>

      <div className="p-3 md:p-10 bg-[#F0F0F0]">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add New Job Details
          </h2>
          <div className="hidden md:flex justify-between flex-wrap items-center mb-3">
            {[
              {
                step: 1,
                label: "Enter Company Details",
                active: true,
                navroute: "entercompanydetails",
              },
              {
                step: 2,
                label: "Enter Job Details",
                active: true,
                navroute: "enterjobdetails",
              },
              {
                step: 3,
                label: "Job Requirements",
                active: true,
                navroute: "jobrequirements",
              },
              {
                step: 4,
                label: "Job Timings & Dates",
                active: true,
                navroute: "jobtimings",
              },
              {
                step: 5,
                label: "Publish",
                active: false,
                navroute: "publishjob",
              },
            ].map((item, index, array) => (
              <React.Fragment key={item.step}>
                <div className="flex items-center flex-col">
                  {/* Step Number Circle */}
                  <div
                    className={`w-10 h-10 flex justify-center items-center rounded-full ${item.active
                      ? "bg-[#D3555A] text-white" // Highlight for active steps
                      : "bg-white text-gray-700 border border-gray-300" // Default style for inactive steps
                      }`}
                  >
                    {item.step}
                  </div>

                  {/* Step Label */}
                  <Link to={`/${item.navroute}`}>
                    <p
                      className={`text-sm font-medium w-35 text-center transition duration-200 ${item.active ? "text-[#D3555A]" : "text-gray-600 hover:text-[#D3555A]"
                        }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </div>

                {/* Dashed Line Between Steps */}
                {index !== array.length - 1 && (
                  <div
                    className={`flex-1 h-1 border-dashed mx-4 ${item.active ? "border-t-4 border-[#D3555A]" : "border-t-2 border-gray-300"
                      }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Compact Step Navigation (Visible on Small Screens) */}
          <div className="md:hidden flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-600">
              Step 5 of 5:{" "}
              <span className="text-[#D3555A] font-semibold">
                Pubishing Job
              </span>
            </p>
          </div>


          <hr className="border-gray-300 mb-2 mt-4" />
          <div className="shadow-lg  p-4">
            <p className="text-[#976063] font-bold text-xl">
              {companyDetails.companyName}
            </p>
            <h2 className="font-futura text-2xl mt-1">{jobDetails.title}</h2>
            <p className="mb-2 text-sm">
              <strong>Posting Date:</strong> {jobDetails.jobPostingDate}
            </p>
            <div className="flex items-center text-[#976063] font-bold mb-2">
              <CiLocationOn className="mb-1" />
              <p className="mb-1 text-sm">
                {jobDetails.postCode} {jobDetails.city}
              </p>
            </div>
            <span className="bg-[#F0F0F0] font-semibold mb-4 rounded-md px-3 py-1">
              £ {jobDetails.salary.amount} / {jobDetails.salary.frequency === "Monthly" ? "Month" : "Hour"}
            </span>
            <div className="flex text-[#505050] mt-3 flex-wrap gap-3">
              <p className="bg-[#EBF6FF] rounded-md px-3 py-2 text-sm">
                {postingJob.workSchedule.workingDays?.length > 0
                  ? postingJob.workSchedule.workingDays.join(", ")
                  : "N/A"}
              </p>
              <p className="bg-[#EBF6FF] rounded-md px-3 py-2 text-sm">
                {jobRequirements?.minimumExp} - {jobRequirements?.maximumExp} years
              </p>
            </div>

            <hr className="border-[#CFCFCF] my-4" />

            <div className="flex justify-between flex-wrap gap-4">
              <div className="w-full sm:w-1/2 lg:w-1/3">
                <h4 className="font-bold">Profile Insights</h4>
                <div className="flex items-start mb-3 text-[#5F5F5F]">
                  <CgProfile className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p>
                      {jobDetails.postCode ? `${jobDetails.postCode}, ` : ""}
                      {jobDetails.city || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3 items-start text-[#5F5F5F]">
                  <CgProfile className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-bold">Preferred Experience Level</h4>
                    <p>
                      {jobRequirements?.minimumExp} - {jobRequirements?.maximumExp} years
                    </p>
                  </div>
                </div>
                <div className="flex items-start text-[#5F5F5F]">
                  <FaBookOpenReader className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-bold">Minimum Qualification</h4>
                    <p>{jobRequirements?.minimumEducation}</p>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-1/2 lg:w-1/3">
                <h4 className="font-bold">Job Insights</h4>
                <div className="flex items-start mb-3 text-[#5F5F5F]">
                  <CiClock1 className="mt-1 mr-2 font-bold text-[#D3555A]" />
                  <div>
                    <h4 className="font-bold">Shift & Schedule</h4>
                    <p>
                      {workSchedule.startTime} AM - {workSchedule.endTime} PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-3 text-[#5F5F5F]">
                  <AiOutlineSchedule className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-bold">Job Start Date</h4>
                    <p>
                      {new Date(workSchedule?.startDate).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start text-[#5F5F5F]">
                  <MdCalendarMonth className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-bold">Application Deadline</h4>
                    <p>
                      {new Date(jobDetails?.applicationDeadline).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <MdNotes className="text-[#D3555A] mr-2" />
              <h3 className="text-[#5F5F5F] font-semibold">Job Description</h3>
            </div>
            <div className="bg-white mt-4 rounded-lg ">
              <p className="text-gray-700 text-sm">{postingJob.jobDetails.jobDescription}</p>

              <div className="mt-2">
                <p className="text-gray-900 font-semibold text-md">
                  <span className="text-blue-500">Employer Name:</span> {companyDetails.employerName}
                </p>
                <p className="mt-2 text-gray-800 font-medium">
                  <span className="text-blue-500">Email:</span> {companyDetails?.contactEmail}
                </p>
                <p className="mt-2 text-gray-800 font-medium">
                  <span className="text-blue-500">Contact Number:</span> {companyDetails?.contactNumber}
                </p>
                <p className="mt-2 text-gray-800 font-medium">
                  <a
                    href={`https://${companyDetails?.companyWebsite}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {companyDetails?.companyWebsite}
                  </a>
                </p>
              </div>
            </div>

            <hr className="border-[#CFCFCF] my-4" />

            <div className="flex flex-wrap gap-5 p-4">
              <div className="flex items-center">
                <MdCalendarMonth className="mr-2" />
                <p className="text-[#505050] font-semibold">{workSchedule.duration} Days</p>
              </div>

              {/* <div className="flex items-center">
                <CiClock1 className="mr-2" />
                <p className="text-[#505050] font-semibold">30+ hrs/week</p>
              </div> */}

              {/* <div className="flex items-center">
                <IoIosAlert className="mr-2" />
                <p className="text-[#505050] font-semibold">Intermediate</p>
              </div> */}

              <div className="flex items-center">
                <FaMoneyBillWave className="mr-2" />
                <p className="text-[#505050] font-semibold">£{jobDetails.salary.amount} / {jobDetails.salary.frequency}</p>
              </div>
            </div>

            <hr className="border-[#CFCFCF] my-4" />

            <div className="flex items-center p-4">
              <HiOutlineLightBulb className="mr-2 text-[#D3555A] text-2xl" />
              <p className="text-[#505050] font-semibold">Skills</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {jobRequirements.jobSkills.map((each, index) => (
                <p
                  key={index}
                  className="bg-[#ECECEC] px-3 py-2 rounded-md text-sm"
                >
                  {each}
                </p>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <Link to="/jobtimings">
                <button
                  type="button"
                  className="border bg-[#D3555A] py-1 px-2 text-white rounded-lg "
                >
                  Back
                </button>
              </Link>
              <button
                onClick={() => publishJob('paid')}
                className="bg-[#D3555A] text-white w-auto font-semibold py-1 px-2 rounded-md"
              >
                Featured Publish
              </button>
              <button
                className="bg-[#D3555A] text-white font-semibold py-1 px-2 rounded-md"
                onClick={() => publishJob('normal')}
              >
                Publish Job
              </button>
            </div>
          </div>




        </div>
      </div>
    </div>
  );
};

export default Publish;

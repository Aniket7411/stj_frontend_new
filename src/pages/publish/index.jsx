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
import { ClipLoader } from "react-spinners";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

const postingDate = new Date();
const formattedDate = postingDate.toLocaleString('en-GB', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: '2-digit'
});

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
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedJobId, setPublishedJobId] = useState(null);

  const jobPostingDetails = {
    workSchedule,
    jobRequirements,
    companyDetails,
    jobDetails
  };

  const publishJob = async (type) => {
    if (jobPostingDetails?.jobDetails?.jobTitle === "") {
      return toast.warn("Please fill all the job details");
    }

    // Prevent multiple clicks
    if (isPublishing) return;

    setIsPublishing(true);

    try {
      const response = await HttpClient.post(
        "/jobs/job-posts",
        jobPostingDetails
      );

      console.log("Response Data:", response.data);
      setPublishedJobId(response.data._id);

      if (type === 'normal') {
        setShowSuccessModal(true);
      } else if (type === 'paid') {
        toast.success("Job details submitted successfully! Kindly pay the amount to make it featured");
        const data = await HttpClient.post(`/stripe/create-checkout-session`, {
          product: 'featured',
          paidFor: 'featured',
          jobId: response.data._id
        });

        if (data.success === true || data.status === 200) {
          window.location.href = data.url;
        }
      }
    } catch (error) {
      console.error("Error submitting job details:", error);
      toast.info(error?.message ? error?.message : "There is some issue. Try re-login");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSeePostedJob = () => {
    setShowSuccessModal(false);
    navigate("/findjobs");
  };

  return (
    <div>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Job Published Successfully!</h3>
              <p className="text-gray-600 mb-6">Your job listing is now live and visible to potential candidates.</p>
              <button
                onClick={handleSeePostedJob}
                className="bg-[#c5363c] hover:bg-[#a52c31] text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                See Posted Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top section with background + overlay */}
      <div
        className="relative flex items-end p-6 h-[220px] w-full rounded-b-lg"
        style={{
          backgroundImage: 'url("/assets/publishingjob.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          <img src="/assets/star.png" alt="star" className="w-[30px] mb-2" />
          <h1 className="text-white text-3xl font-bold">Post Job: Publishing Job</h1>
          <p className="text-gray-200 text-sm max-w-lg">
            Review the job you are posting.
          </p>
        </div>
      </div>

      <div className="p-4 md:p-10 bg-[#F9FAFB]">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Publishing job
          </h2>

          {/* Stepper for desktop */}
          <div className="hidden md:flex justify-between items-center mb-8">
            {[
              { step: 1, label: "Enter Company Details", active: true, navroute: "entercompanydetails" },
              { step: 2, label: "Enter Job Details", active: true, navroute: "enterjobdetails" },
              { step: 3, label: "Job Requirements", active: true, navroute: "jobrequirements" },
              { step: 4, label: "Job Timings & Dates", active: true, navroute: "jobtimings" },
              { step: 5, label: "Publish", active: false, navroute: "publishjob" },
            ].map((item, index, array) => (
              <React.Fragment key={item.step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex justify-center items-center rounded-full shadow-sm transition-all duration-200 ${item.active
                      ? "bg-[#D3555A] text-white"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                  >
                    {item.step}
                  </div>
                  <Link to={`/${item.navroute}`}>
                    <p
                      className={`mt-2 text-sm font-bold text-center ${item.active
                        ? "text-[#D3555A]"
                        : "text-gray-600 hover:text-[#D3555A]"
                        }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </div>

                {/* Connector line */}
                {index !== array.length - 1 && (
                  <div className="flex-1 border-t-2 border-dashed mx-2 border-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Compact stepper (mobile) */}
          <div className="md:hidden flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-6">
            <p className="text-sm font-medium text-gray-600">
              Step 5 of 5:{" "}
              <span className="text-[#D3555A] font-semibold">Publishing Job</span>
            </p>
          </div>

          {/* Job Card */}
          <div className="shadow-md p-5 rounded-xl space-y-4">
            <p className="text-xl font-bold text-[#976063]">
              <span className="font-extrabold text-[#5a2d2f]">Company:</span>{" "}
              {companyDetails?.companyName || "N/A"}
            </p>

            <h2 className="text-2xl font-semibold">{jobDetails.title}</h2>
            <p className="text-sm text-gray-600">
              <strong>Posting Date:</strong> {jobDetails.jobPostingDate}
            </p>

            <div className="flex items-center text-[#976063] font-medium">
              <CiLocationOn className="mr-1" />
              <span>
                {jobDetails.postCode} {jobDetails.city} {jobDetails?.location}
              </span>
            </div>

            <span className="inline-block bg-gray-100 text-gray-800 font-semibold rounded-md px-3 py-1">
              £ {jobDetails.salary.amount} /{" "}
              {jobDetails.salary.frequency === "Monthly" ? "Month" : "Hour"}
            </span>

            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              <p className="bg-[#EBF6FF] rounded-full px-4 py-1">
                {postingJob.workSchedule.workingDays?.length > 0
                  ? postingJob.workSchedule.workingDays.join(", ")
                  : "N/A"}
              </p>
              <p className="bg-[#EBF6FF] rounded-full px-4 py-1">
                {jobRequirements?.minimumExp} - {jobRequirements?.maximumExp} years
              </p>
            </div>

            <hr className="border-gray-300" />

            {/* Insights Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Insights */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800">Profile Insights</h4>
                <div className="flex items-start text-gray-600">
                  <CgProfile className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p>
                      {jobDetails.postCode ? `${jobDetails.postCode}, ` : ""}
                      {jobDetails.city || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start text-gray-600">
                  <CgProfile className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-semibold">Preferred Experience</h4>
                    <p>
                      {jobRequirements?.minimumExp} - {jobRequirements?.maximumExp} years
                    </p>
                  </div>
                </div>
                <div className="flex items-start text-gray-600">
                  <FaBookOpenReader className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-semibold">Qualification</h4>
                    <p>{jobRequirements?.minimumQualification}</p>
                  </div>
                </div>
              </div>

              {/* Job Insights */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800">Job Insights</h4>
                <div className="flex items-start text-gray-600">
                  <CiClock1 className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-semibold">Shift & Schedule</h4>
                    <p>{workSchedule.startTime} AM - {workSchedule.endTime} PM</p>
                  </div>
                </div>
                <div className="flex items-start text-gray-600">
                  <AiOutlineSchedule className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-semibold">Job Start Date</h4>
                    <p>{new Date(workSchedule?.startDate).toLocaleDateString("en-GB")}</p>
                  </div>
                </div>
                <div className="flex items-start text-gray-600">
                  <MdCalendarMonth className="mt-1 mr-2 text-[#D3555A]" />
                  <div>
                    <h4 className="font-semibold">Application Deadline</h4>
                    <p>{new Date(jobDetails?.applicationDeadline).toLocaleDateString("en-GB")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <MdNotes className="text-[#D3555A] mr-2" />
                <h3 className="text-gray-800 font-semibold text-lg">Job Description</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {postingJob.jobDetails.jobDescription}
                </p>
                <div className="flex items-center mt-4">
                  <HiOutlineLightBulb className="mr-2 text-[#D3555A] text-xl" />
                  <p className="text-gray-700 font-semibold">Skills</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {jobRequirements.jobSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#ECECEC] hover:bg-[#D3555A] hover:text-white transition px-3 py-1 rounded-full text-sm cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Employer Info */}
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold text-blue-500">Employer:</span>{" "}
                    {companyDetails.employerName}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-500">Email:</span>{" "}
                    {companyDetails?.contactEmail}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-500">Contact:</span>{" "}
                    {companyDetails?.contactNumber}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-500">Website:</span>{" "}
                    <a
                      href={`https://${companyDetails?.companyWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {companyDetails?.companyWebsite}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <hr className="border-gray-300 my-4" />
            <div className="flex flex-wrap gap-4 text-gray-700">
              <div className="flex items-center">
                <MdCalendarMonth className="mr-2" />
                <p className="font-medium">{workSchedule.duration} Days</p>
              </div>
              <div className="flex items-center">
                <FaMoneyBillWave className="mr-2" />
                <p className="font-medium">
                  £{jobDetails.salary.amount} /{" "}
                  {jobDetails.salary.frequency === "Hourly" ? "Hour" : "Month"}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/jobtimings">
                <button style={{
                  outline: "1px solid #c5363c"
                }} className="border bg-white text-[#c5363c] px-2 py-1 rounded-lg shadow-sm hover:bg-gray-100 transition">
                  Back
                </button>
              </Link>
              <button
                onClick={() => publishJob("paid")}
                disabled={isPublishing}
                className="bg-[#c5363c] text-white w-auto px-2 py-1 rounded-lg shadow hover:bg-[#c5363c] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPublishing ? <ClipLoader size={16} color="#fff" /> : "Featured Publish"}
              </button>
              <button
                onClick={() => publishJob("normal")}
                disabled={isPublishing}
                className="bg-[#c5363c] text-white w-auto px-5 py-2 rounded-lg shadow hover:bg-[#c5363c] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPublishing ? <ClipLoader size={16} color="#fff" /> : "Publish Job"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
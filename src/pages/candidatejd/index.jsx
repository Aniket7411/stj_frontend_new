import { AiOutlineSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CiBookmark, CiClock1, CiLocationOn, CiShare2 } from "react-icons/ci";
import { FaArrowLeft, FaPaperPlane, FaTrashAlt } from "react-icons/fa";
import { FaBookOpenReader, FaMoneyBillWave } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoIosAlert } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { TbJewishStarFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Proposals from "../jobdescription/proposals";
import Proposal from "../jobdescription/proposal";
import { FiExternalLink } from "react-icons/fi";
import Backbutton from "../../components/common/backbutton";



const viewer = JSON.parse(localStorage.getItem("USER_INFO") || "{}");

console.log("viewer", viewer)


const JobDescriptionDetails = () => {
  const location = useLocation();
  const params = location?.pathname;
  const [jobDetails, setjobDetails] = useState();
  const [applyStatus, setApplyStatus] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const userType = localStorage.getItem("USER_INFO");
  const role = JSON.parse(userType || "{}").role || "";


  console.log("rolerolerolerole", role)

  const getJobDetails = async () => {
    setIsLoading(true)
    try {
      const response = await HttpClient.get(`/jobs/job-posts/${location?.pathname.split('/').pop()}`);
      setjobDetails(response?.data);
      setIsLoading(false)




      if (response?.applyStatus) {
        setApplyStatus(response?.applyStatus);
      }
    } catch (error) {

      console.error("Error fetching job details:", error.message);
      setIsLoading(false)
    }
  };

  const applyJob = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData?.role) {
      navigate(`/applyingjob/${jobDetails?._id}`);
    } else {
      toast.info("Please Login/Register First");
      navigate(`/login`);
    }
  };


  const deleteJob = async (jobId) => {
    console.log(jobId);
    setIsLoading(true)
    try {
      const response = await HttpClient.delete(`/jobs/job-posts/${jobId}`);
      toast.success(response?.message || "Job deleted successfully");
      setIsLoading(false)
      setjobDetails(undefined)
      console.log(response);
    } catch (error) {
      console.error(error); // Always good for debugging
      setIsLoading(false)


      // Access the error response safely
      const errorMessage = error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };


  useEffect(() => {
    getJobDetails();
  }, []);

  console.log("jobDetailsjobDetailsjobDetail", jobDetails?.jobDetails?.salary?.frequency)


  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#4ade80" />
        </div>
      ) : (
        <>
          {jobDetails === undefined ? (
            <div className="flex flex-col justify-center items-center min-h-[70vh] p-6 text-center bg-gray-50">
              <img
                src="/images/no-jobs-found.svg"
                alt="No jobs found"
                className="w-56 h-56 md:w-64 md:h-64 mb-3"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">No Job Found</h1>
              <p className="text-gray-500 mb-6 max-w-md">
                The job you're looking for doesn't exist or may have been removed.
              </p>
              <Link
                to="/entercompanydetails"
                className="inline-flex items-center bg-[#c5363c] text-white font-medium rounded-md px-6 py-3 hover:bg-[#a82e33] transition-colors shadow-md"
              >
                Post a Job
              </Link>
            </div>
          ) : (
            <div className="  mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col mt-4 lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                  {/* Back Button */}
                  {/* <div className="mb-3">
                    <Link
                      to="/findjobs"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FaArrowLeft className="mr-2" />
                      <span className="font-medium">Back to jobs</span>
                    </Link>
                  </div> */}
                  <Backbutton />

                  {/* Job Header */}
                  <div className="bg-white rounded-xl shadow-sm p-4 mb-2">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-gray-500 mr-2">Company:</span>
                          <span className="text-[#c5363c] font-semibold">
                            {jobDetails?.companyDetails?.companyName &&
                              jobDetails.companyDetails.companyName.charAt(0).toUpperCase() +
                              jobDetails.companyDetails.companyName.slice(1)
                            }

                          </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {jobDetails?.jobDetails?.jobTitle}
                        </h1>
                        <div className="flex flex-wrap items-center text-gray-500 text-sm gap-2 mb-4">
                          <span className="flex items-center">
                            <CiLocationOn className="mr-1" />
                            {jobDetails?.jobDetails?.city &&
                              `${jobDetails.jobDetails.city.charAt(0).toUpperCase()}${jobDetails.jobDetails.city.slice(1)}`},
                            {jobDetails?.jobDetails?.country &&
                              `${jobDetails.jobDetails.country.charAt(0).toUpperCase()}${jobDetails.jobDetails.country.slice(1)}`}

                          </span>
                          <span>•</span>
                          <span>
                            Posted {new Date(jobDetails?.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {/* Salary */}
                          <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            £ {jobDetails?.jobDetails?.salary?.amount ?? "N/A"} /{" "}
                            {jobDetails?.jobDetails?.salary?.frequency === "Hourly" ? "Hour" : "Month"}
                          </span>

                          {/* Experience */}
                          <span className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            {jobDetails?.jobRequirements?.minimumExp ?? 0} -{" "}
                            {jobDetails?.jobRequirements?.maximumExp ?? 0} yrs exp
                          </span>
                        </div>

                      </div>
                      <div className="mt-3 md:mt-0">
                        <img
                          src={jobDetails?.companyDetails?.companyLogo || "/images/default-company.png"}
                          alt="Company logo"
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Job Details Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1">
                    {/* Profile Insights */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        <CgProfile className="text-[#c5363c] mr-2" />
                        Profile Insights
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                          <p className="font-medium text-gray-800">
                            {jobDetails?.jobDetails?.city}, {jobDetails?.jobDetails?.country} {jobDetails?.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Experience Level</p>
                          <p className="font-medium text-gray-800">
                            {jobDetails?.jobRequirements?.minimumExp}-{jobDetails?.jobRequirements?.maximumExp} years
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Minimum Qualification</p>
                          <p className="font-medium text-gray-800">
                            {jobDetails?.jobRequirements?.minimumQualification || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Job Category</p>
                          <p className="font-medium text-gray-800">
                            {jobDetails?.jobDetails?.jobCategory || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Job Insights */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        <CiClock1 className="text-[#c5363c] mr-2" />
                        Job Insights
                      </h3>
                      <div className="space-y-5">
                        {/* Schedule */}
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Schedule</p>
                          <p className="font-medium text-gray-800">
                            {jobDetails?.workSchedule?.workingDays?.length
                              ? jobDetails.workSchedule.workingDays.join(", ")
                              : "Not specified"}
                            <br />
                            <span className="text-sm text-gray-600">
                              {jobDetails?.workSchedule?.startTime && jobDetails?.workSchedule?.endTime
                                ? `${jobDetails.workSchedule.startTime} - ${jobDetails.workSchedule.endTime}`
                                : "Timings not specified"}
                            </span>
                          </p>
                        </div>

                        {/* Requirements */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Dress Code</p>
                            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                              {jobDetails?.jobRequirements?.dressCode || "Not specified"}
                            </span>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Resume Required</p>
                            {jobDetails?.jobRequirements?.resumeRequired ? (
                              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                Yes
                              </span>
                            ) : (
                              <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                No
                              </span>
                            )}
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Cover Letter</p>
                            {jobDetails?.jobRequirements?.coverletterRequired ? (
                              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                Yes
                              </span>
                            ) : (
                              <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                No
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Start Date */}
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Start Date</p>
                          <p className="font-medium text-gray-800">
                            {jobDetails?.workSchedule?.startDate
                              ? new Date(jobDetails.workSchedule.startDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              : "Not specified"}
                          </p>
                        </div>

                        {/* Deadline */}
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Deadline</p>
                          <p className="font-medium text-gray-800">
                            {jobDetails?.jobDetails?.applicationDeadline
                              ? new Date(jobDetails.jobDetails.applicationDeadline).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              : "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Job Description */}
                  <div className="bg-white rounded-xl shadow-sm p-4 mb-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">Job Description</h3>
                      {["employer", "admin"].includes(
                        JSON.parse(localStorage.getItem("USER_INFO") || "{}")?.role
                      ) && (
                          <button
                            onClick={() => deleteJob(jobDetails?._id)}
                            className="inline-flex items-center bg-[#c5363c] text-white px-2 py-1 w-auto rounded-md hover:bg-[#a82e33] transition-colors text-sm"
                          >
                            <FaTrashAlt className="mr-2" />
                            Delete Job
                          </button>
                        )}

                    </div>
                    <div className="prose max-w-none text-gray-700">
                      {jobDetails?.jobDetails?.jobDescription}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="bg-white rounded-xl shadow-sm p-4 mb-1">
                    <h3 className="flex items-center text-lg font-semibold text-gray-800">
                      <HiOutlineLightBulb className="text-[#c5363c] mr-2" />
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {jobDetails?.jobRequirements?.jobSkills?.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Employer Name</p>
                        <p className="font-medium">
                          {jobDetails?.companyDetails?.employerName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a
                          href={`mailto:${jobDetails?.companyDetails?.contactEmail}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {jobDetails?.companyDetails?.contactEmail || "Not available"}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">
                          {jobDetails?.companyDetails?.contactNumber || "Not available"}
                        </p>
                      </div>
                      {jobDetails?.companyDetails?.companyWebsite && (
                        <div>
                          <a
                            href={jobDetails?.companyDetails?.companyWebsite.startsWith("http")
                              ? jobDetails?.companyDetails.companyWebsite
                              : `https://${jobDetails?.companyDetails?.companyWebsite}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:underline text-sm"
                          >
                            Visit Company Website
                            <FiExternalLink className="ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 flex-shrink-0">
                  <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                    {role === "employee" && (
                      <div className="mb-2">
                        {applyStatus === false ? (
                          <button
                            onClick={applyJob}
                            className="w-full bg-[#c5363c] text-white font-medium py-2.5 px-4 rounded-lg hover:bg-[#a82e33] transition-colors shadow-sm flex items-center justify-center"
                          >
                            <FaPaperPlane className="mr-2" />
                            Bid for job
                          </button>
                        ) : (
                          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center text-sm">
                            You've already applied for this position
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Job Status</h4>
                        <div className="flex items-center">
                          <div className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-gray-700">Active</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">About the Company</h4>
                        <div className="flex items-center mb-3">
                          <img
                            src={jobDetails?.companyDetails?.companyLogo || "/images/default-company.png"}
                            alt="Company logo"
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 mr-3"
                          />
                          <span className="font-medium text-gray-800">
                            {jobDetails?.companyDetails?.companyName}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {jobDetails?.companyDetails?.companyDescription ||
                            "No description provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {viewer.role !== "employee" && viewer.role !== "admin" && (
        <Proposal
          JobId={location?.pathname.split("/").pop()}
          jobDetails={jobDetails}
        />
      )}

    </>
  );
};

export default JobDescriptionDetails;

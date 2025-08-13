import { useEffect, useState, useMemo } from "react";
import { CiBookmark, CiLocationOn, CiSearch, CiShare2, CiTimer } from "react-icons/ci";
import { FaArrowLeft, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import ClipLoader from "react-spinners/ClipLoader";

const CreatedJobs = () => {
  const [jobs, setJobs] = useState([]);

  const { id } = useParams()
  const [jobActiveTab, setJobActiveTab] = useState(id);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Automatically filter jobs based on active tab and search term
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    // First filter by tab
    let result = jobs;
    if (jobActiveTab === "activejobs") {
      result = result.filter(item => new Date(item?.workSchedule?.startDate) > new Date());
    } else if (jobActiveTab === "completedjobs") {
      result = result.filter(item => new Date(item?.workSchedule?.startDate) <= new Date());
    }

    // Then filter by search term if exists
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job =>
        job.jobDetails.jobTitle.toLowerCase().includes(term)
      );
    }

    return result;
  }, [jobs, jobActiveTab, searchTerm]);

  const getJobsCreated = async () => {
    setIsLoading(true);
    try {
      const response = await HttpClient.get(`/jobs/job-posts/employer`);
      setJobs(response?.data || []);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobsCreated();
  }, []);

  // Calculate counts for each tab
  const allJobsCount = jobs?.length || 0;
  const activeJobsCount = jobs?.filter(j => new Date(j?.workSchedule?.startDate) > new Date()).length || 0;
  const completedJobsCount = jobs?.filter(j => new Date(j?.workSchedule?.startDate) <= new Date()).length || 0;

  return (
    <div className="p-6 sm:p-8 md:p-10">
      <div className="flex justify-between mb-2 mt-3">
        <div className="flex items-center">
          <h3 className="ml-2 text-lg font-semibold">Created Jobs</h3>
        </div>

        <div className="flex items-center border border-[#D9D9D9] p-1 rounded-md">
          <CiSearch />
          <input
            className="ml-2 p-1 outline-none"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <hr className="mb-2" />

      <div>
        {/* Tab Navigation - UI remains exactly the same */}
        <div className="p-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 font-semibold text-sm sm:text-base">
            <button
              className={`px-2 py-1 rounded-lg ${jobActiveTab === "alljobs"
                ? "bg-blue-100 text-blue-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => setJobActiveTab("alljobs")}
            >
              All Jobs ({allJobsCount})
            </button>
            <button
              className={`px-2 py-1 w-[130px] rounded-lg ${jobActiveTab === "activejobs"
                ? "bg-blue-100 text-blue-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => setJobActiveTab("activejobs")}
            >
              Active Jobs ({activeJobsCount})
            </button>
            <button
              className={`px-2 py-1 w-[130px] rounded-lg ${jobActiveTab === "completedjobs"
                ? "bg-blue-100 text-blue-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => setJobActiveTab("completedjobs")}
            >
              Completed Jobs ({completedJobsCount})
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <ClipLoader size={50} color="#4ade80" />
        </div>
      ) : (
        <>
          {filteredJobs?.map((job) => (
            <div
              key={job._id}
              className="border-2 border-blue-400 rounded-lg p-4 shadow-md mb-3 w-full"
            >
              {/* First Row - Company, Date, Status */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                <p className="text-[#976063] text-sm sm:text-base">
                  {job?.companyDetails?.companyName}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center text-sm sm:text-base">
                    <strong>Posted: </strong>
                    <span className="ml-1">
                      {new Date(job?.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}

                    </span>
                  </div>
                  <p className={`px-2 py-1 rounded-lg text-sm ${new Date(job?.workSchedule?.startDate) > new Date()
                    ? "bg-[#E1FFE9] text-[#34A853]"
                    : "bg-[#FEE2E2] text-[#F43F5E]"
                    }`}>
                    Deadline: {new Date(job?.jobDetails?.applicationDeadline).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}

                  </p>
                </div>
              </div>

              {/* Job Title */}
              <h2 className="text-md sm:text-xl font-semibold mb-1">
                {job?.jobDetails?.jobTitle}
              </h2>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-1">
                {job?.jobRequirements?.jobSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-500 rounded-md text-xs sm:text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Location */}
              <div className="flex items-center text-[#976063] text-sm sm:text-base mb-3">
                <CiLocationOn size={20} className="mr-2 min-w-[20px]" />
                <p className="font-semibold">
                  {job?.jobDetails?.city}, {job?.jobDetails?.state}, {job?.jobDetails?.country}
                </p>
              </div>

              {/* Job Details Row */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-3">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 bg-[#EBF6FF] px-2 py-1 rounded-md">
                    <CiTimer size={16} />
                    <span className="text-xs sm:text-sm">
                      {job?.workSchedule?.duration} Days
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-[#EBF6FF] px-2 py-1 rounded-md">
                    <FaBriefcase size={14} />
                    <span className="text-xs sm:text-sm">
                      {job?.jobRequirements?.minimumExp}-{job?.jobRequirements?.maximumExp} yrs
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-xs sm:text-sm">
                  <FaMoneyBillWave className="mr-2" size={14} />
                  <span className="font-semibold">
                    £{job?.jobDetails?.salary?.amount} /
                    {job?.jobDetails?.salary?.frequency === "monthly"
                      ? "mo"
                      : job?.jobDetails?.salary?.frequency === "weekly"
                        ? "wk"
                        : "hr"}
                  </span>
                </div>
              </div>

              {/* Footer Row */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#EBF6FF] rounded-lg px-2 py-1 text-xs sm:text-sm">
                    {job?.jobDetails?.employmentType}
                  </span>
                  <span className="bg-[#EBF6FF] rounded-lg px-2 py-1 text-xs sm:text-sm">
                    {job?.workSchedule?.startTime} - {job?.workSchedule?.endTime}
                  </span>
                </div>

                <Link to={`/jobdescription/${job?._id}`} className="sm:self-end">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow transition-colors">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CreatedJobs;
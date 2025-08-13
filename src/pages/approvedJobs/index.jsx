import React, { useState, useEffect } from "react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Approved = () => {
  const [createdJobs, setCreatedJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const navigate = useNavigate();

  const {id}  = useParams()

  const [activeTab, setActiveTab] = useState(id);

  console.log("paramsss",id)

  const fetchJobs = async () => {
    try {
      const response = await HttpClient.get(`/applyJob/read/complete`);
      if (response.success === true) {
        setCreatedJobs(response.jobCreated || []);
        setCompletedJobs(response.completedJob || []);
        setActiveJobs(response.activeJob || []);
      }
    } catch (err) {
      toast.error(
        err.message || err.response?.data?.message || "Internal server error"
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  let displayedJobs = [];
  if (activeTab === "applied") displayedJobs = createdJobs;
  else if (activeTab === "active") displayedJobs = activeJobs;
  else if (activeTab === "completed") displayedJobs = completedJobs;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3 mt-6 capitalize">
        {activeTab} Jobs
      </h1>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-2 py-1 w-auto rounded font-medium transition ${activeTab === "applied"
              ? "bg-[#c5363c] text-white"
              : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => setActiveTab("applied")}
        >
          Applied Jobs
        </button>
        <button
          className={`px-2 py-1 w-auto rounded font-medium transition ${activeTab === "active"
              ? "bg-[#c5363c] text-white"
              : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => setActiveTab("active")}
        >
          Active Jobs
        </button>
        <button
          className={`px-2 py-1 w-auto rounded font-medium transition ${activeTab === "completed"
              ? "bg-[#c5363c] text-white"
              : "bg-gray-200 hover:bg-gray-300"
            }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Jobs
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-[#c5363c] text-white">
              <th className="border p-2">Sr No</th>
              <th className="border p-2">Job Title</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedJobs?.length > 0 ? (
              displayedJobs.map((job, index) => (
                <tr key={job._id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    {job?.jobId?.jobDetails?.jobTitle || "N/A"}
                  </td>
                  <td className="border p-2">
                    {job?.jobId?.companyDetails?.companyName || "N/A"}
                  </td>
                  <td className="border p-2">
                    {job?.jobId?.jobDetails?.jobAddress || "N/A"}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() =>
                        navigate(`/jobdescription/${job?.jobId?._id}`, {
                          state: { job },
                        })
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      View Job
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No jobs found for this tab.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approved;

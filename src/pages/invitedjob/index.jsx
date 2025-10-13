import React, { useState, useEffect } from "react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CiSearch, CiCalendar } from "react-icons/ci";
import ClipLoader from "react-spinners/ClipLoader";

const InvitedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await HttpClient.get(`/jobs/invite`);
      if (response.success === true) {
        setJobs(response.invitations || []);
      }
    } catch (err) {
      toast.error(err.message || err.response?.data?.message || "Internal server error");
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job =>
    job?.jobDetails?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job?.jobDetails?.jobAddress?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  // Check if there are no jobs to display
  const hasNoJobs = !isLoading && filteredJobs.length === 0;

  return (
    <div className="p-6 sm:p-8 md:p-10">
      <div className="flex justify-between items-center mb-6 mt-6">
        <h1 className="text-xl font-bold">Invited Jobs</h1>
        
        {/* Search Bar */}
        <div className="flex items-center border border-[#D9D9D9] rounded-md p-2 w-64">
          <CiSearch className="text-gray-400 mr-2" />
          <input
            className="outline-none w-full"
            placeholder="Search invited jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <ClipLoader size={50} color="#4ade80" />
        </div>
      ) : hasNoJobs ? (
        // No jobs state
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-gray-400 mb-4">
            <CiCalendar size={64} />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm ? "No matching invitations" : "No job invitations"}
          </h3>
          <p className="text-gray-500 max-w-md">
            {searchTerm
              ? `No job invitations match your search for "${searchTerm}". Try adjusting your search terms.`
              : "You haven't received any job invitations yet. Employers will invite you directly when they find your profile suitable for their openings."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        // Jobs table
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#c5363c] text-white">
                <th className="border border-gray-300 p-3 text-left">Sr No</th>
                <th className="border border-gray-300 p-3 text-left">Job Title</th>
                <th className="border border-gray-300 p-3 text-left">Location</th>
                <th className="border border-gray-300 p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs?.map((job, index) => (
                <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-300 p-3">{index + 1}</td>
                  <td className="border border-gray-300 p-3 font-medium">
                    {job?.jobDetails?.jobTitle}
                  </td>
                  <td className="border border-gray-300 p-3 text-gray-600">
                    {job?.jobDetails?.jobAddress}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <button
                      onClick={() => navigate(`/jobdescription/${job?._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      View Job
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show search results count */}
      {!isLoading && filteredJobs.length > 0 && searchTerm && (
        <div className="mt-4 text-sm text-gray-600">
          Found {filteredJobs.length} invitation{filteredJobs.length !== 1 ? 's' : ''} matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default InvitedJobs;
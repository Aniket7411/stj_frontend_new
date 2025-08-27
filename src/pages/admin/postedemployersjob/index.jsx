import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { HttpClient } from "../../../server/client/http";
import ClipLoader from "react-spinners/ClipLoader"; // Example loader from react-spinners
import { toast } from "react-toastify";
import AdminPanelNavbar from "../adminpanel/index";
import Backbutton from "../../../components/common/backbutton";



const EmployersJobs = () => {
  const { id } = useParams(); // Get the 'id' from the URL params
  const navigate=useNavigate()
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null); // Reset error on each fetch

      try {
        const employerId = id || location?.pathname.split("/").pop(); // Get employer ID
        debugger
        const response = await HttpClient.get(`/jobs/job-posts/employer`, {
          employerId,
          require: 'all'
        });

        const formattedData = response.data.map((each) => ({
          id: each?._id,
          employerName:
            each?.companyDetails?.employerName || "Unknown Employer",
          companyName: each?.companyDetails?.companyName || "Unknown Company",
          jobTitle: each?.jobDetails?.jobTitle || "Untitled Job",
        }));

        setJobs(formattedData);
      } catch (err) {
        console.error("Error fetching jobs:", err);

        if (err.response && err.response.status === 400) {
          // Extract backend's custom 404 message
           toast.error(err.response.data.message || "No jobs found for this employer.");
        } else if (err.request) {
          // No response received
          console.log("No response from server. Please check your network.");
        } else {
          // Other errors
          setError("Failed to load jobs. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [id, location?.pathname]);

  return (
    
       <div className="flex">
           <AdminPanelNavbar />
           <div className="mt-[60px] w-full">
    <div className="p-6 bg-[#F2F9FF]">
      <h1 className="text-2xl font-bold mb-4 mt-5">Employer's Job Listings</h1>
      <Backbutton/>

      {isLoading && (
        <div className="text-center flex justify-center items-center h-screen ">
          <ClipLoader size={50} color="#4ade80" />
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-2 px-4">#</th>
                <th className="text-left py-2 px-4">Employer Name</th>
                <th className="text-left py-2 px-4">Company Name</th>
                <th className="text-left py-2 px-4">Job Title</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id} className="border-t">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{job.employerName}</td>
                  <td className="py-2 px-4">{job.companyName}</td>
                  <td className="py-2 px-4">{job.jobTitle}</td>
                  <td className="py-2 px-4">
                    <Link to={`/jobdescription/${job.id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </div>
    
  );
};

export default EmployersJobs;

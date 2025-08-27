import React, { useState, useEffect } from "react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InvitedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate=useNavigate();


  const fetchJobs=async()=>{
    try{
        const response = await HttpClient.get(`/jobs/invite`);
          if(response.success===true){
             setJobs(response.invitations)
          }
         
        //console.log(response,"..........................14")

    }catch(err){
      toast.err(err.message||err.response.data.message||"internal server error")

    }
  }

  // Simulate an API call with dummy data
  useEffect(() => {
    // const fetchJobs = async () => {
    //   // Simulated API response
    //   const dummyData = [
    //     {
    //       id: 1,
    //       title: "Software Engineer",
    //       location: "New York, USA",
    //       description: "Develop and maintain software solutions.",
    //     },
    //     {
    //       id: 2,
    //       title: "Product Manager",
    //       location: "San Francisco, USA",
    //       description: "Lead product development and manage teams.",
    //     },
    //     {
    //       id: 3,
    //       title: "Data Analyst",
    //       location: "Toronto, Canada",
    //       description: "Analyze and interpret complex data sets.",
    //     },
    //   ];
    //   // Simulate network delay
    //   setTimeout(() => {
    //     setJobs(dummyData);
    //   }, 1000);
    // };
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mt-6 mb-4">Invited Jobs</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#c5363c] text-[#fff]">
            <th className="border border-gray-300 p-2">Sr No</th>
            <th className="border border-gray-300 p-2">Job Title</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job, index) => (
            <tr key={job._id} className="text-center">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{job?.jobDetails?.jobTitle}</td>
              <td className="border border-gray-300 p-2">{job?.jobDetails?.jobAddress}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => navigate(`/jobdescription/${job?._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Job
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvitedJobs;

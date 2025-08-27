import React, { useState } from 'react'
import { CiBookmark, CiBookmarkCheck } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { HttpClient } from '../../server/client/http';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Spinner from '../../components/loader';



const SavedCourses = () => {
  const [jobData, setJobData] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)


  const generateRandomColor = () => {
    const letters = "89ABCDEF"; // Limit to lighter values for very soft pastel colors
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const getBookmarks = async () => {
    setIsLoading(true)
    try {
      //debugger;
      const response = await HttpClient.get('/bookmark', { type: 'job' })
      console.log(response)

      const formattedBookmarks = response?.bookmarks?.map((bookMarkJobs) => ({
        jobId: bookMarkJobs?._id,
        companyName: bookMarkJobs?.companyDetails?.companyName,
        createdAt: bookMarkJobs?.createdAt,
        jobTitle: bookMarkJobs?.jobDetails?.jobTitle,
        jobCategory: bookMarkJobs?.jobDetails?.jobCategory,
        salary: bookMarkJobs?.jobDetails?.salary?.amount,
        skills: bookMarkJobs?.jobRequirements?.jobSkills,
        maximumExp: bookMarkJobs?.jobRequirements?.maximumExp,
        minimumExp: bookMarkJobs?.jobRequirements?.minimumExp,
        frequency: bookMarkJobs?.jobDetails?.salary?.frequency,
        city: bookMarkJobs?.jobDetails?.city,
        country: bookMarkJobs?.jobDetails?.country,
        applicationDeadline: bookMarkJobs?.jobDetails?.applicationDeadline,
        employmentType: bookMarkJobs?.jobDetails?.employmentType,
      }))
      console.log(formattedBookmarks)
      setJobData(formattedBookmarks)
      setIsLoading(false)
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error('Unauthorized. Please log in.');
      } else if (err?.response?.status === 404) {
        toast.error('Bookmark endpoint not found.');
      } else {
        toast.error(`Error: ${err?.response?.data?.message || 'Something went wrong'}`);
      }

    }



  }


  useEffect(() => {
    getBookmarks();

  }, [])

  return (
    <div className='p-4 md:p-10'>

      <h1 className='mt-10 md:mt-3 font-inter'>Saved Courses</h1>
      <hr className='py-2' />

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : jobData && jobData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobData.map((job) => (
              <div
                key={job.jobId}
                className="bg-white rounded-lg p-2"
                style={{ outline: "2px solid #D0CECE" }}
              >
                <div
                  className="p-2 rounded-lg shadow-md"
                  style={{
                    backgroundColor: generateRandomColor(),
                    minHeight: "240px",
                  }}
                >
                  <div className="flex justify-between mb-2x">
                    <span style={{ outline: "1px solid #000" }}
                      className='bg-[#fff] rounded-md px-2 py-1 text-sm'>{job?.jobCategory}</span>
                    <span
                      className="bg-[#fff]  text-[#c5363c] text-[12px] px-2 py-1 rounded-md"
                      style={{ outline: "1px solid #c5363c" }}
                    >
                      Deadline {job?.applicationDeadline} 
                    </span>
                  </div>
                  <h3 className="text-lg text-black font-bold">{job.companyName}</h3>
                  <div className="flex justify-between items-center">
                    <p className="mb-2">
                      <span className="text-1xl font-bold">{job.jobTitle}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap mb-2">
                    {job?.skills?.map((skill, index) => (
                      <p
                        key={index}
                        className="text-[12px] outline outline-1 outline-gray-300 bg-white px-1 py-1 mr-2 rounded-md"
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                  <span className="text-[12px] w-auto outline outline-1 outline-gray-300 bg-white px-2 py-1 mr-2 rounded-lg">
                    {job?.minimumExp} - {job?.maximumExp} Yrs
                  </span>
                  <span className="text-[12px] w-auto mt-2 outline outline-1 outline-gray-300 bg-white px-2 py-1 mr-2 rounded-lg">
                    {job?.employmentType}
                  </span>
                  <br />
                  <p className="mt-4">
                    <span className="bg-[#fff] text-md font-semibold px-2 py-1 rounded-md">
                      Posted on {job?.createdAt?.slice(0, 10)}
                    </span>
                  </p>
                </div>
                <div className="mt-2 px-2">
                  <span className="font-semibold">{job?.salary} £</span> per year
                  <div className="flex justify-between items-center">
                    <p className="text-sm mt-2 mr-1 text-gray-600">
                      {job?.city}, {job?.country}
                    </p>
                    <button
                      onClick={() => navigate(`/jobdescription/${job?.jobId}`)}
                      className="px-1 py-1 border bg-black text-white rounded-lg hover:bg-black hover:text-white"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-600">
            <p className="text-lg font-semibold">No Course found.</p>
          </div>
        )}
      </div>


    </div>
  )
}

export default SavedCourses
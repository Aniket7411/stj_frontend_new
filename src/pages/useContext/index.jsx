import React, { createContext, useState } from 'react';

// Create the context for the job data
const JobContext = createContext();

const JobProvider = ({ children }) => {
  // Initial job object structure
  const [job, setJob] = useState({
    companyDetails: {},
    jobDetails: {},
    jobRequirements: {},
    workSchedule: {},
  });


  // Function to update a part of the job object (company, job details, etc.)
  const updateJobDetails = (section, data) => {
    setJob((prevJob) => ({
      ...prevJob,
      [section]: data,  // Update the specific section of the job object
    }));
  };

  return (
    <JobContext.Provider value={{ job, updateJobDetails }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };

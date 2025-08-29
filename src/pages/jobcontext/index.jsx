import React, { createContext, useState } from "react";

export const JobContext = createContext();


const postingDate = new Date();  // Getting the current date

// Format the date to include only the day and date
const formattedDate = postingDate.toLocaleString('en-GB', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: '2-digit'
});


const JobProvider = ({ children }) => {

  const [postingJob, setPostingJob] = useState({
    jobDetails: {},
    jobRequirements: {},
    jobCertificates: {},
    companyDetails: {},
    workSchedule: {},
  });
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobCategory: "",
    jobDescription: "",
    employmentType: "",
    country: "UK",
    location:"",
    jobPostingDate: formattedDate,
    city: "",
    state: "",
    zipCode: "",
    jobAddress: "",
    latitude:null,
    longitude:null,

    applicationDeadline: "",
    salary: {
      amount: 0,
      frequency: "Hourly",
    },
  });

  const [jobRequirements, setJobRequirements] = useState({
    jobSkills: [],
      minimumExp: "0",
      maximumExp: "0",
    minimumQualification: "",
    dressCode: "",
    resumeRequired: false,
    coverletterRequired: false,
    submitDocumentSide: "front",
    documents: [
      {
        title: "Resume",
        type: "PDF",
        url: "https://www.example.com/resumes/johndoe.pdf",
      },
      {
        title: "Cover Letter",
        type: "PDF",
        url: "https://www.example.com/coverletters/johndoe.pdf",
      },
      {
        title: "Portfolio",
        type: "Work Samples",
        url: "https://www.example.com/documents/portfolio.pdf",
      },
      {
        title: "Certification",
        type: "Professional Certification",
        url: "https://www.example.com/documents/certification.pdf",
      },
    ],
  });

  console.log(jobDetails)

  const [jobCertificates, setJobCertificates] = useState({
    jobImage: "https://example.com/job-image.jpg",
    certificateRequired: true,
    certificateName: "Certified Full-Stack Developer",
  });

  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    employerName: "",
    companyDescription: "",
    contactEmail: "",
    contactNumber: "",
    companyWebsite: "",
    extension: "44",
    companyLogoUrl: "",
    countryCode:"44"
  });

  const [workSchedule, setWorkSchedule] = useState({
    startTime: "00:00",
    endTime: "00:00",
    startDate: "",
    workingDays: [],
    duration: "",
  });

  // console.log("result", postingJob);



  return (
    <JobContext.Provider
      value={{
        postingJob,
        setPostingJob,
        jobDetails,
        setJobDetails,
        jobRequirements,
        setJobRequirements,
        jobCertificates,
        setJobCertificates,
        companyDetails,
        setCompanyDetails,
        workSchedule,
        setWorkSchedule,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;

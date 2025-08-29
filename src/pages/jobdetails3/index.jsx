import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../jobcontext";

const AddJobDetails34 = () => {
  const { jobRequirements, setPostingJob, setJobRequirements } =
    useContext(JobContext);


  const [newSkill, setNewSkill] = useState(""); // New skill input state

  // Function to handle adding a new skill
  const handleAddSkill = () => {
    if (
      newSkill.trim() &&
      !jobRequirements.jobSkills.includes(newSkill.trim())
    ) {
      setJobRequirements((prevState) => ({
        ...prevState,
        jobSkills: [...prevState.jobSkills, newSkill.trim()],
      }));
      setNewSkill(""); // Clear the input after adding
    } else {
      alert("Please enter a valid and unique skill.");
    }
  };

  // Function to handle removing a skill
  const handleRemoveSkill = (skill) => {
    setJobRequirements((prevState) => ({
      ...prevState,
      jobSkills: prevState.jobSkills.filter((item) => item !== skill),
    }));
  };





  const navigate = useNavigate();

    console.log("jobRequirements",jobRequirements);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(jobRequirements);

    setPostingJob((prevPostingJob) => ({
      ...prevPostingJob,
      jobRequirements,
    }));
    navigate("/jobtimings");

  };

  return (
    <div>
      {/* Top section with background image */}
      <div
        className="top-section flex justify-start items-end p-5"
        style={{
          backgroundImage: 'url("/assets/publishingjob.png")',

          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          width: "100vw",
        }}
      >
        <div>
          <img src="/assets/star.png" alt="star" className="w-[25px]" />

          <h1 className="text-white text-2xl">Post Job: Job Requirements</h1>
          <p className="text-[#fff]">
            Fill in the details below to reach qualified candidates quickly and
            securely.
          </p>
        </div>
      </div>

      <div className="md:p-8 p-2 bg-[#F0F0F0]">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold my-3 text-gray-800 text-center">
            Add New Job Details
          </h2>

          <div className="hidden md:flex justify-between flex-wrap items-center mb-3">
            {[
              {
                step: 1,
                label: "Enter Company Details",
                active: true,
                navroute: "entercompanydetails",
              },
              {
                step: 2,
                label: "Enter Job Details",
                active: true,
                navroute: "enterjobdetails",
              },
              {
                step: 3,
                label: "Job Requirements",
                active: false,
                navroute: "jobrequirements",
              },
              {
                step: 4,
                label: "Job Timings & Dates",
                active: false,
                navroute: "jobtimings",
              },
              {
                step: 5,
                label: "Publish",
                active: false,
                navroute: "publishjob",
              },
            ].map((item, index, array) => (
              <React.Fragment key={item.step}>
                <div className="flex items-center flex-col">
                  {/* Step Number Circle */}
                  <div
                    className={`w-10 h-10 flex justify-center items-center rounded-full ${item.active
                      ? "bg-[#D3555A] text-white" // Highlight for active steps
                      : "bg-white text-gray-700 border border-gray-300" // Default style for inactive steps
                      }`}
                  >
                    {item.step}
                  </div>

                  {/* Step Label */}
                  <Link to={`/${item.navroute}`}>
                    <p
                      className={`text-sm font-medium w-35 text-center transition duration-200 ${item.active ? "text-[#D3555A]" : "text-gray-600 hover:text-[#D3555A]"
                        }`}
                    >
                      {item.label}
                    </p>
                  </Link>
                </div>

                {/* Dashed Line Between Steps */}
                {index !== array.length - 1 && (
                  <div
                    className={`flex-1 h-1 border-dashed mx-4 ${item.active ? "border-t-4 border-[#D3555A]" : "border-t-2 border-gray-300"
                      }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Compact Step Navigation (Visible on Small Screens) */}
          <div className="md:hidden flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-600">
              Step 1 of 5:{" "}
              <span className="text-[#D3555A] font-semibold">
                Enter education Details
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Minimum Qualification Dropdown */}
            <div className="flex flex-wrap justify-between  gap-4 mb-6">
              {/* Minimum Qualification */}
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-semibold mb-2">Minimum Qualification</label>
                <select
                  value={jobRequirements?.minimumQualification || ""}
                  onChange={(e) =>
                    setJobRequirements((prevState) => ({
                      ...prevState,
                      minimumQualification: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Qualification</option>
                  <option>GCSEs</option>
                  <option>A-Levels</option>
                  <option>NVQ Level 3</option>
                  <option>HNC/HND</option>
                  <option>Foundation Degree</option>
                  <option>Bachelor’s Degree</option>
                  <option>Master’s Degree</option>
                  <option>PhD / Doctorate</option>
                </select>

              </div>

              {/* Minimum Experience Level */}
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-semibold mb-2">Minimum Experience</label>
                <select
                  value={jobRequirements?.minimumExp}
                  onChange={(e) =>
                    setJobRequirements({
                      ...jobRequirements,
                      minimumExp: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Minimum Experience</option>
                  <option value="0">0 year</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                </select>
              </div>

              {/* Maximum Experience Level */}
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-semibold mb-2">Maximum Experience</label>
                <select
                  value={jobRequirements?.maximumExp}
                  onChange={(e) =>
                    setJobRequirements({
                      ...jobRequirements,
                      maximumExp: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Maximum Experience</option>
                  {
                    (() => {
                      const min = Number(jobRequirements?.minimumExp || 0);
                      const maxLimit = 4;
                      const options = [];

                      for (let i = min + 1; i <= maxLimit; i++) {
                        options.push(
                          <option key={i} value={i}>
                            {i} {i === 1 ? "year" : "years"}
                          </option>
                        );
                      }

                      return options;
                    })()
                  }
                  <option value="5">5+ years</option>
                </select>

              </div>
            </div>

            {/* Preferred Skills Required */}
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Preferred Skills Required *</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {jobRequirements.jobSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-[#505050] border border-gray-300 rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 w-[20px] text-md text-red-500 bg-transparent rounded-full"
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="border w-[200px] md:w-[300px] border-gray-300 rounded-lg p-3 flex-grow"
                  placeholder="Add a skill"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-[#D3555A] text-white rounded-lg hover:bg-[#A73C40] transition"
                >
                  Add Skill
                </button>
              </div>
            </div>


            {/* Dress Code */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Dress Code *
              </label>
              <select
                required
                value={jobRequirements.dressCode || ""}
                onChange={(e) =>
                  setJobRequirements((prevState) => ({
                    ...prevState,
                    dressCode: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-lg mb-2 p-3"
              >
                <option value="">Select Dress Code</option>
                <option value="Formal">Formal</option>
                <option value="Informal">Informal</option>
              </select>
            </div>

            <h2 className="text-2xl font-semibold mb-2">
              Need field related documents?
            </h2>
            <label className="block mb-3 text-lg">
              Add fields for candidates to add (Resume and Cover letter)
              documents.
            </label>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                id="resume"
                checked={jobRequirements.resumeRequired || false} // Default to false if undefined
                onChange={() =>
                  setJobRequirements((prevState) => ({
                    ...prevState,
                    resumeRequired: !prevState.resumeRequired, // Toggle the value of resumeRequired
                  }))
                }
              />
              <label htmlFor="resume" className="text-lg">
                Resume
              </label>
            </div>

            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                id="cover"
                checked={jobRequirements.coverletterRequired || false} // Default to false if undefined
                onChange={() =>
                  setJobRequirements((prevState) => ({
                    ...prevState,
                    coverletterRequired: !prevState.coverletterRequired, // Toggle the value of coverletterRequired
                  }))
                }
              />
              <label htmlFor="cover" className="text-lg">
                Cover letter
              </label>
            </div>

            {/* <h2 className="text-2xl font-semibold mb-2">
              Need field related documents?
            </h2> */}
            {/* <label className="block mb-3 text-lg">
              Add fields for candidates to add job-related documents.
            </label> */}
{/* 
            <div className="flex flex-wrap gap-4 mb-2">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="document-title" className="block mb-2">
                  Title
                </label>
                <div className="border border-gray-300 rounded-lg p-2 bg-white">
                  <input
                    type="text"
                    id="document-title"
                    className="outline-none w-full"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label htmlFor="document-type" className="block mb-2">
                  Type
                </label>
                <div className="border border-gray-300 rounded-lg p-2 bg-white">
                  <input
                    type="text"
                    id="document-type"
                    className="outline-none w-full"
                  />
                </div>
              </div>
            </div> */}

            <label className="block mb-3 text-lg">Choose document side</label>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="document"
                  id="front"
                  value="front" // Set value as a string "front"
                  checked={jobRequirements.submitDocumentSide === "front"} // Check if the current state is "front"
                  onChange={() =>
                    setJobRequirements((prevState) => ({
                      ...prevState,
                      submitDocumentSide: "front", // Update state to "front" on change
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="front" className="text-lg">
                  Front
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="document"
                  id="front-back"
                  value="front and back" // Set value as a string "front and back"
                  checked={
                    jobRequirements.submitDocumentSide === "front and back"
                  } // Check if the current state is "front and back"
                  onChange={() =>
                    setJobRequirements((prevState) => ({
                      ...prevState,
                      submitDocumentSide: "front and back", // Update state to "front and back" on change
                    }))
                  }
                  className="mr-2"
                />
                <label htmlFor="front-back" className="text-lg">
                  Front & Back
                </label>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              {/* Submit Button */}

              <Link to="/enterjobdetails">
                <button
                  style={{
                    outline: "1px solid #c5363c"
                  }}
                  type="button"
                  className="py-1 mr-2 px-2  border text-[#c5363c] rounded-lg  hover:bg-gray-200"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className=" px-6 py-1 bg-[#c5363c] text-white rounded-lg  w-full md:w-auto"
              >
                Save & Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobDetails34;

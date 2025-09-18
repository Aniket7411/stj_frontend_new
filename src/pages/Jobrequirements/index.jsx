import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../jobcontext";


const AddJobDetails3 = () => {
  const [tags, setTags] = useState(["Accounting", "Management Skills", "Retail Sales"]);
  const { jobRequirements, setJobRequirements, setPostingJob } = useContext(JobContext);
  const [qualification, setQualification] = useState("");
  const [experienceLevels, setExperienceLevels] = useState({
    entryLevel: false,
    midLevel: false,
    seniorLevel: false,
  });
  const [skills, setSkills] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [documents, setDocuments] = useState({ resume: null, coverLetter: null });
  const [additionalTitle, setAdditionalTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [error, setError] = useState(""); // Validation error state

  const navigate = useNavigate();

  const handleAddTag = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      setTags([...tags, event.target.value.trim()]);
      event.target.value = "";
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments((prevState) => ({
        ...prevState,
        [type]: file,
      }));
    }
  };

  const handleExperienceChange = (level) => {
    setExperienceLevels((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation logic
    if (
      !qualification ||
      !Object.values(experienceLevels).some(Boolean) ||
      !skills ||
      !areaCode ||
      !tags.length ||
      !additionalTitle ||
      !documentType ||
      !documents.resume ||
      !documents.coverLetter
    ) {
      setError("Please fill in all required fields and upload all documents.");
      return;
    }

    // Prepare data to send in the specified format
    const payload = {
      qualification,
      experienceLevels: Object.keys(experienceLevels).filter((key) => experienceLevels[key]),
      skills,
      areaCode,
      tags,
      documents: {
        resume: documents.resume.name,
        coverLetter: documents.coverLetter.name,
      },
      additionalDocument: {
        title: additionalTitle,
        type: documentType,
      },
    };

    console.log("Submitted Data:", payload);

    // Update jobRequirements in context
    setJobRequirements((prevState) => ({
      ...prevState,
      ...payload,
    }));

    // Update postingJob with the new jobRequirements
    setPostingJob((prevPostingJob) => ({
      ...prevPostingJob,
      jobRequirements: {
        ...jobRequirements,
        ...payload,
      },
    }));

    // Navigate to the next page
    navigate("/jobtimings");
  };

  return (
    <>
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

      <div className="min-h-screen bg-[#F0F0F0] py-8 p-2 md:p-10 flex justify-center">
        <div className="w-full bg-white shadow-md rounded-lg p-3 md:p-8">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add New Job Details
          </h2>

          {/* Step Indicator */}
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
              Step 3 of 5:{" "}
              <span className="text-[#D3555A] font-semibold">
                Job Requirements
              </span>
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Minimum Qualification */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Minimum Qualification
              </label>
              <select
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white"
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Experience Level
              </label>
              <div className="flex gap-4">
                {["entryLevel", "midLevel", "seniorLevel"].map((level) => (
                  <label key={level} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={experienceLevels[level]}
                      onChange={() => handleExperienceChange(level)}
                    />
                    {level.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Required Skills
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="List skills required for the job..."
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Area Code */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Area Code</label>
              <input
                type="text"
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
                placeholder="Enter area code"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Add Relevant Tags
              </label>
              <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-lg p-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-red-100 text-red-600 rounded-full px-3 py-1"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type and press Enter"
                  className="flex-1 p-2 border-none outline-none"
                  onKeyPress={handleAddTag}
                />
              </div>
            </div>

            {/* Documents */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Resume</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "resume")}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Cover Letter
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "coverLetter")}
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Additional Document Info */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={additionalTitle}
                onChange={(e) => setAdditionalTitle(e.target.value)}
                placeholder="Document Title"
                className="border border-gray-300 rounded-lg p-3"
              />
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 bg-white"
              >
                <option value="">Select Document Type</option>
                <option value="PDF">PDF</option>
                <option value="Image">Image</option>
                <option value="Word Document">Word Document</option>
              </select>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Action Buttons */}
            <div className="flex justify-center mt-8">
              <Link to="/enterjobdetails">
                <button
                  style={{
                    outline: "1px solid #c5363c"
                  }}
                  type="button"
                  className="py-1 mr-2 px-2 border text-[#c5363c] rounded-lg hover:bg-gray-200"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="py-1 px-2 bg-[#c5363c] text-white rounded-lg hover:bg-[#c5363c]"
              >
                Save & Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddJobDetails3;

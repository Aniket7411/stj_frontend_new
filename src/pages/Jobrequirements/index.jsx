import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../useContext";


const AddJobDetails3 = () => {
  const [tags, setTags] = useState(["Accounting", "Management Skills", "Retail Sales"]);
  const { updateJobDetails } = useContext(JobContext); // Access context function
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
    updateJobDetails('jobRequirements', payload);

    // Navigate to the next page
    navigate("/jobtimings");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Job Details
        </h2>

        {/* Step Indicator */}
        <div className="flex justify-between flex-wrap items-center mb-6">
          {[
            { step: 1, label: "Enter Company Details", active: false, navroute: "/entercompanydetails" },
            { step: 2, label: "Enter Job Details", active: false, navroute: "/enterjobdetails" },
            { step: 3, label: "Job Requirements", active: true, navroute: "/jobrequirements " },
            { step: 4, label: "Job Timings & Dates", active: false, navroute: "/jobtimings" },
            { step: 5, label: "Publish", active: false, navroute: "publish" },
          ].map((item, index, array) => (
            <React.Fragment key={item.step}>
              <div className="flex items-center flex-col">
                <div
                  className={`w-10 h-10 flex justify-center items-center rounded-full ${item.active
                    ? "bg-[#D3555A] text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                    }`}
                >
                  {item.step}
                </div>
                <Link to={item.navroute} className="mt-2">
                  <p className="text-sm font-medium w-24 text-center text-gray-600 hover:text-[#D3555A] transition duration-200">
                    {item.label}
                  </p>
                </Link>
              </div>
              {index !== array.length - 1 && (
                <div className="flex-1 h-1 border-dashed border-t border-gray-300 mx-4"></div>
              )}
            </React.Fragment>
          ))}
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
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="py-2 px-6 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Save & Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobDetails3;

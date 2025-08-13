import { useState } from "react";

const NewJobForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    employerName: "",
    jobDescription: "",
    contactEmail: "",
    contactNumber: "",
    companyWebsite: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div
        className="w-full h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/viplav2411/image/upload/v1731910574/postjobtopimage_stngbg.jpg")',
        }}
      >
        {/* Optional overlay for better text visibility */}
        <div className="w-full h-full bg-black bg-opacity-30 flex flex-col justify-center items-start p-5">
          <img
            src="https://res.cloudinary.com/viplav2411/image/upload/v1731911218/star_edap9b.jpg"
            className="w-[50px]"
            alt="star"
          />
          <h1 className="text-white text-4xl font-bold">
            Post a Job and Find the Perfect Candidate
          </h1>
          <p className="text-white w-[896px]">
            Fill in the details below to reach qualified candidates quickly and
            securely.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-center text-2xl font-semibold text-red-500 mb-6">
          Add New Job Details
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-lg rounded-lg border">
          {/* Company Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Company Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter Job Title"
              className="p-2 rounded-md border border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Employer Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Employer Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="employerName"
              value={formData.employerName}
              onChange={handleInputChange}
              placeholder="Enter Job Address"
              className="p-2 rounded-md border border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Job Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Company Description <span className="text-red-600">*</span>
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Type your job description here"
              rows="4"
              className="p-2 rounded-md border border-gray-300 focus:ring-red-500 focus:border-red-500"
            ></textarea>
          </div>

          {/* Contact Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Contact Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="Enter Email Address"
              className="p-2 rounded-md border border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Contact Number */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Contact Number <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center">
              <select className="p-2 rounded-l-md border-t border-b border-l border-gray-300 bg-gray-100 focus:ring-red-500 focus:border-red-500">
                <option value="+1">+1</option>
                <option value="+91">+91</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Enter Contact Number"
                className="flex-1 p-2 rounded-r-md border-t border-b border-r border-gray-300 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Company Website */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Company Website
            </label>
            <input
              type="text"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              placeholder="Enter Company Website"
              className="p-2 rounded-md border border-gray-300 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Buttons */}
          <div
            className="flex justify-between md:col-span-2 mt-4"
            style={{ width: "85%", margin: "0 auto" }}
          >
            <button
              type="button"
              className="py-2 px-4 text-red-500 border border-red-500 rounded-md hover:bg-red-50 w-full mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
            >
              Save & Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewJobForm;

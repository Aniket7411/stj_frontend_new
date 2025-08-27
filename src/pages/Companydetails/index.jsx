import React, { useState, useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { JobContext } from "../jobcontext";



const AddJobDetailsStep = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    logoUrl: "",
    companyDescription: "",
    contactEmail: "",
    companyWebsite: "",
    employerName: "",
    contactNumber: "",
    countryCode: "+44",
    companyLogo: "",
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { companyDetails, setCompanyDetails } = useContext(JobContext);





  const navigate = useNavigate();



  // Handle image upload
  const getImageUrl = useCallback(async (e) => {
    setLoading(true);
    try {
      const url = await uploadImageOnCloudinary(e);
      setCompanyDetails((prevState) => ({
        ...prevState,
        companyLogo: url,
      }));
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove image
  const removeImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      companyLogo: "",
    }));
    setLogoPreview(null);
  };



  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();

    const { companyName, employerName, companyDescription, contactEmail, companyWebsite, contactNumber } = companyDetails;

    // Check if any field is empty
    if (!companyName || !employerName || !companyDescription || !contactEmail || !companyWebsite || !contactNumber) {
      alert("Please fill in all the details.");
      return; // Prevent further execution if any field is empty
    }
    navigate("/enterjobdetails");
  };


  return (
    <>
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

          <h1 className="text-white text-2xl">Post Job: Company Details</h1>
          <p className="text-[#fff]">
            Fill in the details below to reach qualified candidates quickly and
            securely.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 p-2 md:p-10 ">
        <form
          className="w-full bg-white shadow-lg rounded-lg p-3 md:p-8"
          onSubmit={handleSave}
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Add New Job Details
          </h2>

          <div className="hidden md:flex mt-3 justify-between flex-wrap items-center mb-3">
            {[
              {
                step: 1,
                label: "Enter Company Details",
                active: false,
                navroute: "entercompanydetails",
              },
              {
                step: 2,
                label: "Enter Job Details",
                active: false,
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
                Job Requirements
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                value={companyDetails.companyName}
                onChange={(e) => {
                  const value = e.target.value;
                  const wordCount = value.trim().split(/\s+/).length; // Split by whitespace and count words
                  if (wordCount <= 30) {
                    setCompanyDetails((prevDetails) => ({
                      ...prevDetails,
                      companyName: value,
                    }));
                  }
                }}
                required
              />



              <label className="block text-gray-700 font-medium mb-2">
                Company Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="companyDescription"
                placeholder="Type your company description here (max 150 words)"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                rows="4"
                value={companyDetails.companyDescription}
                onChange={(e) => {
                  const words = e.target.value.trim().split(/\s+/);
                  if (words.length <= 150 || e.target.value.length < companyDetails.companyDescription.length) {
                    setCompanyDetails(prevDetails => ({
                      ...prevDetails,
                      companyDescription: e.target.value
                    }));
                  }
                }}
                required
              ></textarea>


              <label className="block text-gray-700 font-medium mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                placeholder="Enter Email Address"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                value={companyDetails.contactEmail}
                onChange={(e) => setCompanyDetails(prevDetails => ({ ...prevDetails, contactEmail: e.target.value }))}
                required
              />

              <label className="block text-gray-700 font-medium mb-2">
                Company Website    <span className="text-[#D3555A] font-semibold">
                  *
                </span>
              </label>
              <input
                type="text"
                name="companyWebsite"
                placeholder="Enter Company Website"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={companyDetails.companyWebsite}
                onChange={(e) => setCompanyDetails(prevDetails => ({ ...prevDetails, companyWebsite: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Employer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="employerName"
                placeholder="Enter Employer Name"
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                value={companyDetails.employerName}
                onChange={(e) => setCompanyDetails(prevDetails => ({ ...prevDetails, employerName: e.target.value }))}
                required
              />

              <label className="block text-gray-700 font-medium mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-4 mb-4">
                <select
                  className="border border-gray-300 rounded-lg p-2 bg-gray-50 sm:w-[80px] w-full"
                  value={companyDetails.countryCode}
                  onChange={(e) => setCompanyDetails(prevDetails => ({ ...prevDetails, employerName: e.target.value }))}
                  name="countryCode"
                >
                  <option value="+44">+44</option>
                </select>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  className="flex-1 border border-gray-300 rounded-lg p-3 w-full"
                  value={companyDetails.contactNumber}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Allow only digits
                    if (!/^\d*$/.test(value)) return;

                    // Prevent first or second digit from being '4'
                    if (value.length >= 1 && value[0] === '4') return;
                    if (value.length >= 2 && value[1] === '4') return;

                    // Update state
                    setCompanyDetails(prev => ({ ...prev, contactNumber: value }));
                  }}
                  required
                  maxLength={11}
                  minLength={11}
                />


              </div>

              <label className="block text-gray-700 font-medium mb-2">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded-lg p-3"
                onChange={(e) => {
                  const file = e.target.files[0]; // Get the selected file
                  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes

                  if (file) {
                    if (file.size > maxSizeInBytes) {
                      alert("File size must not exceed 5MB.");
                      e.target.value = ""; // Clear the input value
                      return;
                    }
                    getImageUrl(e); // Call your existing function if size is valid
                  }
                }}
              />

              {logoPreview && (
                <div className="relative w-32 h-32 mt-4">
                  <img
                    src={logoPreview}
                    alt="Company Logo Preview"
                    className="object-cover border rounded-lg w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-0 bg-[#c5363c] text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-[#c5363c]"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-8 gap-4">
            {/* <button
              type="button"
              className="py-1 px-6 border-[#c5363c] border-2 outline-[#05363c] rounded-lg text-[#c5363c] hover:bg-gray-200 w-full md:w-auto"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="py-1 px-6 bg-[#c5363c] text-white rounded-lg hover:bg-[#c5363c] w-full md:w-auto"
            >
              Save & Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};



export default AddJobDetailsStep;

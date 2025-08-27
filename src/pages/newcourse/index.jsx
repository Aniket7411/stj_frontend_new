import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { duration } from "moment";
import MapSearch from "../../components/mapsearch";

const AddNewCourse = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    category: "",
    amount: "",
    recoginsedBody: "",
    enrollmentLimit: "",
    duration: "",
    address: "",
    latitude:null,
    longitude:null,
    postcode: "",
    courseImage: null,
    courseDescription: "",
    skillRequired: false,
    certificateImage: null,
    startTimePeriod: "AM",
    endTimePeriod: "AM",
    townCity: "",
    instructorName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [courseImage, setCourseImage] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);

  const [selectedDays, setSelectedDays] = useState([]);
  const [allCategories, setAllCategories] = useState([]);





  const getAllCategories = async () => {
    setIsLoading(true);
    try {
      const response = await HttpClient.get("/category/");
      const formattedCategories = response.data.map((each) => ({
        id: each._id,
        categoryName: each.categoryName,
        createdAt: each.createdAt,
      }));
      setAllCategories(formattedCategories);

      console.log("formattedCategories", formattedCategories)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories()
  }, [])


  const handleDaySelection = (e) => {
    const { value, checked } = e.target;

    setSelectedDays(
      (prevDays) =>
        checked
          ? [...prevDays, value] // Add the day if checked
          : prevDays.filter((day) => day !== value) // Remove the day if unchecked
    );
  };

  const addCourse = async () => { };

  const getImageUrl = async (e, type) => {
    setIsLoading(true);
    try {
      const url = await uploadImageOnCloudinary(e);
      if (type === "course-img") {
        setCourseImage(url);
        setFormData((prevData) => ({
          ...prevData,
          courseImage: url,
        }));
      } else if (type === "certificate-img") {
        setCertificateImage(url);
        setFormData((prevData) => ({
          ...prevData,
          certificateImage: url,
        }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (type) => {
    if (type === "course-img") {
      setCourseImage(null);
    } else if (type === "certificate-img") {
      setCertificateImage(null);
    }
  };

  // Handle changes for inputs dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for checkboxes (for skill required)
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const [errors, setErrors] = useState({});

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    const validationErrors = {};
    // if (!formData.title) validationErrors.title = "Course Title is required";
    // if (!formData.startDate) validationErrors.startDate = "Start Date is required";
    // if (!formData.endDate) validationErrors.endDate = "End Date is required";
    // if (!formData.amount) validationErrors.amount = "Amount is required";
    // if (!formData.enrollmentLimit) validationErrors.enrollmentLimit = "Enrollment Limit is required";
    // if (!formData.postcode) validationErrors.postcode = "Postcode is required";
    // if (!formData.courseDescription) validationErrors.courseDescription = "Course Description is required";
    // console.log("eroor")

    // // If there are validation errors, set them and stop submission
    // if (Object.keys(validationErrors).length > 0) {
    //     setErrors(validationErrors);
    //     return;
    // }

    const courseCategory = formData.category === "custom"
      ? formData.customCourse
      : formData.category;


    const courseData = {
      courseCertificates: {
        certificateImage: certificateImage,
        courseImage: courseImage,
        declaration: declaration, // Fixed spelling from "declarartion" to "declaration"
      },
      courseDetails: {
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        duration: formData.duration,
        days: selectedDays,
        description: formData.courseDescription,
        startTime: {
          hour: formData.startTime.slice(0, 2),
          am_pm: formData.startTimePeriod,
          mins: 0,
        },
        endTime: {
          hour: formData.endTime.slice(0, 2),
          am_pm: formData.endTimePeriod,
          mins: 0,
        },
        enrollmentLimit: formData.enrollmentLimit,
        amount: formData.amount,
        address: {
          address: formData.address,
          postCode: formData.postcode,
          town_city: formData.townCity,
          latitude:formData.latitude,
          longitude:formData.longitude
        },
        instructorName: formData.instructorName,

        category: courseCategory,
      },
      enrollmentLimit: formData.enrollmentLimit,
      amount: formData.amount,
      technology: "",
    };

    console.log(courseData);

    if (declaration) {
      // If no validation errors, submit form data
      try {
        const response = await HttpClient.post("/course/create", courseData);

        console.log("Response:", response);

        // Reset form state on success
        setFormData({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          category: "",
          amount: "",
          recoginsedBody: "",
          enrollmentLimit: "",
          duration: "",
          address: "",
          postcode: "",
          courseImage: null,
          courseDescription: "",
          skillRequired: false,
          certificateImage: null,
          startTimePeriod: "AM",
          endTimePeriod: "AM",
          townCity: "",
          instructorName: ""
        });
        setCertificateImage(null);
        setCourseImage(null);
        setDeclaration(false);
        setSelectedDays([]);
        setDeclaration(false);

        // Show success message
        toast.success("Course created successfully!");
      } catch (error) {
        console.error("Error creating course:", error);

        // Show error notification
        toast.error(
          error.response?.data?.message ||
          "An error occurred. Please try again."
        );
      }
    } else {
      toast.warning("Please Acknowledge");
      setDeclaration(false);
    }
  };

  return (
    <div className="md:p-10 p-4 ">
      {/* <Link to="/courses">
        <FaArrowLeft className="mt-5 cursor-pointer text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-105" />
      </Link> */}
      <h2 className="text-3xl font-bold mt-5 text-gray-800 mb-4">
        Create New Course
      </h2>

      <h3 className="text-xl font-semibold text-gray-700">Course Details</h3>

      <hr className="border-gray-300 mb-4" />

      <form onSubmit={handleSubmit}>
        {/* Course Title */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Course Title<span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <input
            type="text"
            placeholder="Enter Course Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
            style={{ outline: "1px solid gray" }}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <hr className="border-gray-300 mt-4 mb-4" />


        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Course Instructor<span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <input
            type="text"
            placeholder="Instructor Name"
            name="instructorName"
            value={formData.instructorName}
            onChange={handleInputChange}
            required
            className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
            style={{ outline: "1px solid gray" }}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <hr className="border-gray-300 mt-4 mb-4" />

        {/* Course Body */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Recognised Course Body{" "}
            <span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <textarea
            name="recoginsedBody"
            value={formData.recoginsedBody}
            onChange={handleInputChange}
            className="lg:w-[40%] w-[100%] border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="3"
            placeholder="Enter your course body (Max 100 words)"
            required
            maxLength={100}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <hr className="border-gray-300 mt-2 mb-3" />
         

        {/* Days Selection */}
        <div className="mt-3">
          <div className="flex justify-between">
            <div className="flex items-center flex-wrap gap-2">
              <p className="text-sm font-bold ">
                Select Days <span className="text-[red] ml-1 font-bold">*</span>
              </p>
              {selectedDays.length === 0 && (
                <p className="text-red-500 ">Please select at least one day.</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"].map(
                (day) => (
                  <label
                    key={day}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="days"
                      value={day}
                      checked={selectedDays.includes(day)}
                      onChange={handleDaySelection}
                      className="accent-blue-600"
                    />
                    <span className="text-sm">{day}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <p className="font-bold">Selected Days:</p>
            <p>{selectedDays.length > 0 ? selectedDays.join(", ") : "None"}</p>
          </div>
        </div>

        <hr className="border-gray-300 mt-3 mb-3" />

        {/* Course Description */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Course Description{" "}
            <span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <textarea
            name="courseDescription"
            value={formData.courseDescription}
            maxLength={250}
            onChange={handleInputChange}
            className="lg:w-[40%] w-[100%] border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="3"
            placeholder="Enter course description"
            required
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <hr className="border-gray-300 mt-2 mb-3" />

        {/* Start Date */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Course Start Date{" "}
            <span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]} // Sets minimum to today
            required
            className="rounded-lg text-sm p-2 lg:w-[40%] w-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.startDate && (
            <p className="text-red-500">{errors.startDate}</p>
          )}
        </div>
        <hr className="border-gray-300 mt-2 mb-3" />

        {/* End Date */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Course End Date <span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]} // Sets minimum to today

            required
            className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
            style={{ outline: "1px solid gray" }}
          />
          {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
        </div>
        <hr className="border-gray-300 mt-2 mb-3" />

        {/* Start Time */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Course Start Time{" "}
            <span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <div
            className="lg:w-[40%] w-[100%] flex gap-2 shadow-lg rounded-lg p-2"
            style={{ outline: "1px solid gray" }}
          >
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              required
              className="rounded-lg text-sm p-2 flex-1"
            />
            <select
              name="startTimePeriod"
              value={formData.startTimePeriod}
              onChange={handleInputChange}
              required
              className="rounded-lg text-sm p-2 flex-shrink-0"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <hr className="border-gray-300 mt-2 mb-3" />

        {/* End Time */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Course End Time <span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <div
            className="lg:w-[40%] w-[100%] flex gap-2 shadow-lg rounded-lg p-2"
            style={{ outline: "1px solid gray" }}
          >
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              required
              className="rounded-lg text-sm p-2 flex-1"
            />
            <select
              name="endTimePeriod"
              value={formData.endTimePeriod}
              onChange={handleInputChange}
              required
              className="rounded-lg text-sm p-2 flex-shrink-0"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <hr className="border-gray-300 mt-2 mb-3" />

        {/* Category */}


        <div className="flex justify-between mt-3 flex-wrap items-center">
          {/* Label with required indicator */}
          <p className="text-sm font-bold mb-3">
            Course Category <span className="text-red-500 ml-1 font-bold">*</span>
          </p>

          {/* Input container with dropdown and custom option */}
          <div className="lg:w-[40%] w-full flex flex-wrap gap-2 shadow-lg rounded-lg p-2 border border-gray-300">
            {/* Category dropdown select (hidden when custom is selected) */}
            {formData.category !== "custom" && (
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="flex-grow"
              >
                <option value="" disabled>
                  Select Course Category
                </option>
                {allCategories.map((category) => (
                  <option key={category.id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            )}

            {/* Show "Add Custom" button only when not in custom mode */}
            {formData.category !== "custom" && (
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: "custom" }))}
                className="bg-[#c5363c] text-white px-3 py-1 rounded"
              >
                Add Custom
              </button>
            )}

            {/* Custom category input (shown only when 'custom' is selected) */}
            {formData.category === "custom" && (
              <div className="flex-grow  flex gap-2">
                <input
                  type="text"
                  name="customCourse"
                  placeholder="Enter Custom Course"
                  value={formData.customCourse || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, customCourse: e.target.value }))}
                  className="rounded-lg text-sm p-2 w-full border border-gray-300"
                />
                {/* Option to go back to normal selection */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: "", customCourse: "" }))}
                  className="bg-[#c5363c] text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Error message display */}
          {errors.category && (
            <p className="text-red-500 text-sm mt-1 w-full">{errors.category}</p>
          )}
        </div>


        <hr className="border-gray-300 mt-4 mb-4" />

        {/* Duration */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Duration<span className="text-[red] ml-1 font-bold">*</span>
          </p>


          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={(e) => {
              const value = e.target.value;
              // Ensure the duration is greater than 0
              if (value > 0 || value === "") {
                handleInputChange(e);  // Only update if valid
              }
            }}
            required
            placeholder="Enter duration in days"
            className="rounded-lg lg:w-[40%] w-[100%] text-sm p-2 shadow-lg"
            min="1"
            style={{ outline: "1px solid gray" }}
          />
          {errors.duration && <p className="text-red-500">{errors.duration}</p>}
        </div>

        <hr className="border-gray-300 mt-2 mb-3" />

        {/* Amount */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Amount<span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <input
            type="number"
            name="amount"
            value={formData.amount}

            onChange={(e) => {
              const value = e.target.value;
              // Ensure the duration is greater than 0
              if (value > 0) {
                handleInputChange(e);  // Only update if valid
              }
            }}
            required
            placeholder="Enter Course Amount "
            className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
            style={{ outline: "1px solid gray" }}
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
        </div>

        <hr className="border-gray-300 mt-2 mb-3" />

        {/* Enrollment Limit */}
        <div className="flex justify-between mt-3 flex-wrap items-center">
          <p className="text-sm font-bold mb-3">
            Enrollment Limit<span className="text-[red] ml-1 font-bold">*</span>
          </p>
          <input
            type="number"
            name="enrollmentLimit"
            value={formData.enrollmentLimit}
            onChange={(e) => {
              const value = e.target.value;
              // Ensure the duration is greater than 0
              if (value > 0 || value === "") {
                handleInputChange(e);  // Only update if valid
              }
            }}
            required
            placeholder="Enter Entrollment lmit"
            className="rounded-lg text-sm p-2 lg:w-[40%] w-[100%] shadow-lg"
            style={{ outline: "1px solid gray" }}
          />
          {errors.enrollmentLimit && (
            <p className="text-red-500">{errors.enrollmentLimit}</p>
          )}
        </div>

        <hr className="border-gray-300 mt-4 mb-4" />

        {/* Address */}
        <div className="flex justify-between flex-wrap gap-4">
          <p className="text-sm font-bold flex items-center">
            Address <span className="text-red-500 ml-1">*</span>
          </p>
          <div className="w-full lg:w-[35%]">
            <MapSearch setJobDetails={setFormData} type={"course"} />
            <div className="flex flex-wrap justify-between lg:flex-row">
              <div>
                <p className="text-sm font-bold flex items-center">
                  Postcode <span className="text-red-500 ml-1">*</span>
                </p>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="postcode"
                  value={formData.postcode}
                  className="rounded-lg mt-1 px-2 py-1"
                  style={{
                    outline: "1px solid gray",
                  }}
                />
              </div>

              <div>
                <p className="text-sm font-bold flex items-center">
                  Town/City <span className="text-red-500 ml-1">*</span>
                </p>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="townCity"
                  value={formData.townCity}
                  className="rounded-lg mt-1 px-2 py-1"
                  style={{
                    outline: "1px solid gray",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-300 mt-2 mb-3" />

        <div className="flex flex-col space-y-8">
          {/* Course Image */}
          <div>
            <p className="text-sm font-bold mb-3">
              {/* Course Image<span className="text-[red] ml-1 font-bold">*</span> */}
            </p>
            <div className="flex flex-col items-center mt-4 justify-center space-y-6">
              {/* Upload Image Section */}
              {!courseImage && (
                <label className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm lg:max-w-md h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition hover:border-gray-400 hover:shadow-md p-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => getImageUrl(e, "course-img")}
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 3l-4.586 4.586a1 1 0 01-1.414 0L8 8l-4 4h12V6z" />
                    </svg>
                    <span className="text-sm text-gray-500 font-medium text-center">
                      Click to upload an image
                    </span>
                  </div>
                </label>
              )}


              {/* Image Preview Section */}
              {courseImage && (
                <div className="relative w-64">
                  <img
                    src={courseImage}
                    alt="Course"
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full text-sm transition"
                    onClick={() => handleRemoveImage("course-img")}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
          <hr className="border-gray-300 mt-4 mb-4" />

          {/* Certificate Image */}
          <div>
            <p className="text-sm font-bold mb-3">
              Certificate Image
              {/* <span className="text-[red] ml-1 font-bold">*</span> */}
            </p>
            <div className="flex flex-col items-center mt-4 justify-center space-y-6">
              {/* Upload Certificate Section */}


              {!certificateImage && (
                <label className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm lg:max-w-md h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition hover:border-gray-400 hover:shadow-md p-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => getImageUrl(e, "certificate-img")}
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 3l-4.586 4.586a1 1 0 01-1.414 0L8 8l-4 4h12V6z" />
                    </svg>
                    <span className="text-sm text-gray-500 font-medium text-center">
                      Click to upload an image
                    </span>
                  </div>
                </label>
              )}


              {/* Certificate Image Preview Section */}
              {certificateImage && (
                <div className="relative w-64">
                  <img
                    src={certificateImage}
                    alt="Certificate"
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full text-sm transition"
                    onClick={() => handleRemoveImage("certificate-img")}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex mt-3 items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-md">
          <input
            type="checkbox"
            id="declaration"
            onClick={() => setDeclaration((prev) => !prev)}
            className="w-5 h-5 accent-blue-600 cursor-pointer"
          />
          <label
            htmlFor="declaration"
            className="text-sm md:text-base text-gray-700 cursor-pointer"
          >
            I have reviewed all the details.
          </label>
        </div>

        {/* Submit button */}
        <div className="flex mt-4 justify-center gap-3">
          <button
            style={{
              outline: "1px solid #C5363C",
            }}
            type="button"
            className="bg-[#fff]  text-[#C5363C] py-1 w-auto px-2  rounded-lg "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#C5363C] text-white py-1 w-auto px-2 rounded-lg "
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCourse;

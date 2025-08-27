import React, { useContext, useEffect, useState } from "react";
import { CourseContext } from "../useContext2";
import axios from "axios";
import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HttpClient } from "../../server/client/http";

const CourseCertificate = () => {
  const [courseImage, setCourseImage] = useState(null);
  const [certificateImage, setCertificateImage] = useState(null);
  const [declaration, setDeclaration] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
    const [employerDetails,setEmployerDetails] = useState()
    console.log("abbajsbj")


    
  const getEmployerDetails = async () => {
    try {
      const response = await HttpClient.get("/user/profile/");
      setEmployerDetails(response.user);

      console.log("employerDetails.....",employerDetails?.profile?.uploads?.profilePicture)
  
    
      
    } catch (error) {
      console.error("Error fetching employer details:", error);
    }
  };

  useEffect(()=> {
    getEmployerDetails()
  },[])

  

  const { course } = useContext(CourseContext);
   const { updateCourseDetails } = useContext(CourseContext); 
  const navigate=useNavigate();

  const getImageUrl = async (e, type) => {
    setLoading(true);
    try {
      const url = await uploadImageOnCloudinary(e);
      if (type === "course-img") {
        setCourseImage(url);
        
      } else if (type === "certificate-img") {
        setCertificateImage(url);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (type) => {
    if (type === "course-img") setCourseImage(null);
    else if (type === "certificate-img") setCertificateImage(null);
  };

  const handleSubmit = async () => {

    const validationErrors = {};
    if (!courseImage) validationErrors.courseImage = "Course image is required.";
    if (!certificateImage) validationErrors.certificateImage = "Certificate image is required.";
    if (!declaration) validationErrors.declaration = "You must declare that the course is legitimate.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const courseCertificates = {
      
      //declaration,
    };
    updateCourseDetails("courseCertificates", {
      courseImage:courseImage,
      certificateImage:certificateImage,
    });

    //console.log("Submitted Data:", formData);

    try {
      // const response = await axios.post(
      //   "https://stj-backend.onrender.com/api/course/create",
      //   course
      // );
       const response = await HttpClient.post(
        "/course/create",
        course
      );
      if(response){
        toast.success("Course details submitted successfully!");
        navigate('/courses')
      }
      
     // console.log("Response Data:", response.data);
     
     
    } catch (error) {
      console.error("Error submitting Course details:", error);
      alert("Failed to submit course details. Please try again.");
    }
  };



  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Course Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Course Image:</label>
        <div
          className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md bg-white h-40"
          style={{ cursor: "pointer" }}
        >
          {courseImage ? (
            <div className="relative w-32 h-32">
              <img src={courseImage} alt="Course" className="object-cover rounded-md w-full h-full" />
              <button
                onClick={() => removeImage("course-img")}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-700"
              >
                &times;
              </button>
            </div>
          ) : (
            <>
              {loading ? (
                <p className="text-gray-500">Uploading...</p>
              ) : (
                <label
                  htmlFor="course-image-upload"
                  className="text-gray-500 flex flex-col items-center"
                >
                  <img
                    src="/assets/upload-icon.svg"
                    alt="Upload"
                    className="w-10 h-10 mb-2"
                  />
                  <span>Drop your image here or <span className="text-blue-500 underline">browse</span></span>
                </label>
              )}
              <input
                id="course-image-upload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => getImageUrl(e, "course-img")}
              />
            </>
          )}
        </div>
        {errors.courseImage && <p className="text-red-500 mt-2">{errors.courseImage}</p>}
      </div>

      {/* Certificate Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Certificate Image:</label>
        <div
          className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md bg-white h-40"
          style={{ cursor: "pointer" }}
        >
          {certificateImage ? (
            <div className="relative w-32 h-32">
              <img
                src={certificateImage}
                alt="Certificate"
                className="object-cover rounded-md w-full h-full"
              />
              <button
                onClick={() => removeImage("certificate-img")}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-700"
              >
                &times;
              </button>
            </div>
          ) : (
            <>
              {loading ? (
                <p className="text-gray-500">Uploading...</p>
              ) : (
                <label
                  htmlFor="certificate-image-upload"
                  className="text-gray-500 flex flex-col items-center"
                >
                  <img
                    src="/assets/upload-icon.svg"
                    alt="Upload"
                    className="w-10 h-10 mb-2"
                  />
                  <span>Drop your image here or <span className="text-blue-500 underline">browse</span></span>
                </label>
              )}
              <input
                id="certificate-image-upload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => getImageUrl(e, "certificate-img")}
              />
            </>
          )}
        </div>
        {errors.certificateImage && <p className="text-red-500 mt-2">{errors.certificateImage}</p>}
      </div>

      {/* Declaration Checkbox */}
      <div className="mb-4">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            className="mr-2"
            checked={declaration}
            onChange={() => setDeclaration(!declaration)}
          />
          I declare that I am posting a legitimate course
        </label>
        {errors.declaration && <p className="text-red-500 mt-2">{errors.declaration}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-center">
        <button
          className="mr-3 text-gray-600 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          type="button"
        >
          Cancel
        </button>
        <button
          className={`bg-blue-500 text-white w-[130px] py-1 rounded-lg hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          Save & Publish
        </button>
      </div>
    </div>
  );
};

export default CourseCertificate;

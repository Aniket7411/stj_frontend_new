import { CiLocationOn } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { FaArrowLeft, FaClock, FaCalendarAlt, FaUsers, FaChalkboardTeacher, FaBookOpen, FaMapMarkerAlt, FaPoundSign, FaCheckCircle } from "react-icons/fa";
import { MdCategory, MdAccessTime } from "react-icons/md";
import { useState } from "react";

const CourseDescription = () => {
  const { state } = useLocation();
  console.log(state, ".................state")
  const { course } = state || {};
  console.log(course, ".................state")
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const deleteCourse = async () => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await HttpClient.delete(`/course/${course?.courseId}`);
      toast.success("Course deleted successfully");
      setTimeout(() => navigate("/courses"), 1500);
    } catch (error) {
      toast.error("Failed to delete course");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      const response = await HttpClient.post(`/stripe/create-checkout-session`, {
        product: course.productId,
        paidFor: 'course',
        courseId: course.courseId
      });

      if (response.success === true || response.status === 200) {
        window.location.href = response.url;
      }
    } catch (err) {
      if (err.status === 400) {
        toast.info(err.response.data.message || err.message || "internal server error");
        return;
      }
      toast.error('Internal server error');
    } finally {
      setIsEnrolling(false);
    }
  };

  const userRole = JSON.parse(localStorage.getItem("USER_INFO"))?.role;

  if (!course) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
      <div className="text-center">
        <FaBookOpen className="text-6xl text-gray-400 mx-auto mb-4" />
        <p className="text-xl text-gray-600 font-medium">No course data available</p>
        <button
          onClick={() => navigate("/courses")}
          className="mt-6 px-6 py-3 bg-[#c5363c] text-white rounded-lg hover:bg-[#a02d31] transition-colors"
        >
          Browse Courses
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Breadcrumb & Back Button */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center text-gray-600 hover:text-[#c5363c] transition-colors duration-200 group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Courses</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#c5363c] to-[#8b1e24] rounded-3xl shadow-2xl overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-3xl">
          <div className="p-7 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 mb-6 md:mb-0">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <FaBookOpen className="text-white mr-2" />
                  <span className="text-white text-sm font-semibold">Course Details</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {course.courseTitle || "Course Title"}
                </h1>

                {/* Instructor Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <FaChalkboardTeacher className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Instructor</p>
                    <p className="text-white text-lg font-semibold">
                      {course.courseInstructor || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                {course.address && (
                  <div className="flex items-center text-white/90">
                    <FaMapMarkerAlt className="mr-2 text-lg" />
                    <span className="text-sm">{course.address}</span>
                  </div>
                )}
              </div>

              {/* Price Card */}
              <div className="bg-white rounded-2xl shadow-xl p-4 md:ml-4 transform transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium mb-2">Course Price</p>
                  <div className="flex items-center justify-center">
                    <FaPoundSign className="text-[#c5363c] text-2xl mr-1" />
                    <span className="text-5xl font-bold text-gray-800">{course.amount ?? "N/A"}</span>
                  </div>
                  {/* <p className="text-gray-500 text-sm mt-2">One-time payment</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Duration Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FaClock className="text-purple-500 text-xl mr-2" />
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Duration</p>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {course.duration ? `${course.duration}` : "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1">Days</p>
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-purple-500 text-2xl" />
              </div>
            </div>
          </div>

          {/* Seats Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FaUsers className="text-green-500 text-xl mr-2" />
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Available Seats</p>
                </div>
                <p className="text-3xl font-bold text-gray-800">
                  {course.enrollmentLimit ?? "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1">Students</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-green-500 text-2xl" />
              </div>
            </div>
          </div>

          {/* Timings Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500 transform transition-all duration-300 hover:scale-105 hover:shadow-xl sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <MdAccessTime className="text-amber-500 text-xl mr-2" />
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Class Timings</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {course.startHour ? `${course.startHour}${course.startAmPM} - ${course.endHour}${course.endAmPM}` : "N/A"}
                </p>
                <p className="text-sm text-gray-500 mt-1">Daily schedule</p>
              </div>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <FaClock className="text-amber-500 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Schedule and Course Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Schedule Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <div className="flex items-center">
                <FaCalendarAlt className="text-white text-2xl mr-3" />
                <h3 className="text-xl font-bold text-white">Schedule Details</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FaCalendarAlt className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Course Days</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {course.days?.length ? (
                        course.days.map((day, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                          >
                            <FaCheckCircle className="mr-1 text-xs" />
                            {day}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-600">No schedule available</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {course.startHour && (
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                      <MdAccessTime className="text-amber-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Class Timings</p>
                      <p className="text-lg font-semibold text-gray-800 mt-1">
                        {`${course.startHour}${course.startAmPM} - ${course.endHour}${course.endAmPM}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Course Info Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
              <div className="flex items-center">
                <FaBookOpen className="text-white text-2xl mr-3" />
                <h3 className="text-xl font-bold text-white">Course Information</h3>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <FaBookOpen className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500">Course ID</p>
                  <p className="text-lg font-semibold text-gray-800 mt-1">
                    {course.courseId || "N/A"}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <MdCategory className="text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="text-lg font-semibold text-gray-800 mt-1">
                      {course.courseCategory || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6">
            <div className="flex items-center">
              <FaBookOpen className="text-white text-2xl mr-3" />
              <h3 className="text-xl font-bold text-white">Course Description</h3>
            </div>
          </div>
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                {course.courseDescription || "No description available for this course."}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 pb-8">
          {userRole === "employee" && (
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="w-full sm:w-auto bg-gradient-to-r from-[#c5363c] to-[#8b1e24] hover:from-[#a02d31] hover:to-[#6b1618] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-lg"
            >
              {isEnrolling ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  <span>Enroll Now</span>
                </>
              )}
            </button>
          )}

          {userRole === 'employer' && (
            <button
              onClick={deleteCourse}
              disabled={isDeleting}
              className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-lg border-2 border-red-600"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin h-5 w-5  text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete Course</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
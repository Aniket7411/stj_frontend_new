import { CiLocationOn } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

const CourseDescription = () => {
  const { state } = useLocation();
  console.log(state,".................state")
  const { course } = state || {};
  console.log(course,".................state")
  const navigate = useNavigate();

  const deleteCourse = async () => {
    try {
      await HttpClient.delete(`/course/${course?.courseId}`);
      toast.success("Course deleted successfully");
      navigate("/courses");
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const userRole = JSON.parse(localStorage.getItem("USER_INFO"))?.role;

  if (!course) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="p-6 text-lg text-gray-600 bg-gray-50 rounded-xl">No course data available.</p>
    </div>
  );

  return (
    <div className=" mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r mt-8 from-blue-50 to-indigo-50 p-6 sm:p-8 border-b border-gray-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            <span className="text-[#c5363c]"> Course Description</span>    : {course.courseTitle || "Course Title"}
          </h2>

          <div className="mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Course Instructor</p>
                <p className="text-lg font-semibold text-gray-800">
                  {course.courseInstructor || "Not specified"}
                </p>
              </div>
            </div>
          </div>
          {course.address && (
            <div className="flex items-center text-gray-600 mt-1">
              <CiLocationOn className="text-xl text-indigo-500 mr-2" />
              <span>{course.address}</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 transition-transform hover:scale-[1.02]">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Price</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">£{course.amount ?? "N/A"}</p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 transition-transform hover:scale-[1.02]">
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider">Duration</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {course.duration ? `${course.duration} Days` : "N/A"}
              </p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-100 transition-transform hover:scale-[1.02]">
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Seats</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{course.enrollmentLimit ?? "N/A"}</p>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 transition-transform hover:scale-[1.02]">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Timings</p>
              <p className="text-lg font-medium text-gray-800 mt-1">
                {course.startHour ? `${course.startHour}${course.startAmPM} - ${course.endHour}${course.endAmPM}` : "N/A"}
              </p>
            </div>
          </div>

          {/* Schedule and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <span className="w-1 h-6 bg-indigo-500 mr-2 rounded-full"></span>
                Schedule Details
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Days</p>
                  <p className="text-gray-800 font-medium mt-1">
                    {course.days?.length ? course.days.join(", ") : "No schedule available"}
                  </p>
                </div>
                {course.startHour && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Timings</p>
                    <p className="text-gray-800 font-medium mt-1">
                      {`${course.startHour}${course.startAmPM} - ${course.endHour}${course.endAmPM}`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <span className="w-1 h-6 bg-indigo-500 mr-2 rounded-full"></span>
                Course Information
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Course ID</p>
                  <p className="text-gray-800 font-medium mt-1">{course.courseId || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <p className="text-gray-800 font-medium mt-1">{course.courseCategory || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="w-1 h-6 bg-indigo-500 mr-2 rounded-full"></span>
              Description
            </h3>
            <div className="bg-gray-50 p-5 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {course.courseDescription || "No description available"}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-start space-x-2">
            {userRole === "employee" && (
              <button onClick={async() =>{
                try{
                  const response=await HttpClient.post(`/stripe/create-checkout-session`,{
        product:course.productId,
        paidFor:'course',
        courseId:course.courseId
      });
     // debugger
      if(response.success===true|| response.status===200){
        window.location.href=response.url
      }

                }catch(err){
                  if(err.status===400){
                    toast.info(err.response.data.message||err.message||"internal server error");
                    return
                  }
                  toast.error('internal server error')

                }
                 
     
              }} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-md text-white w-auto font-medium py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
                Enroll Now
              </button>

            ) 
             }
             {userRole==='employer' &&(
              (
              <button
                onClick={deleteCourse}
                className="bg-gradient-to-r from-red-100 to-rose-100 hover:from-red-200 hover:to-rose-200 text-red-600 text-md font-medium w-auto py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 border border-red-200 shadow-md"
              >
                Delete Course
              </button>
            )
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
import { TbJewishStarFilled } from "react-icons/tb";
import ClipLoader from "react-spinners/ClipLoader";
import React, { useState } from "react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CertificateEditor from "../testing/testing";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [certificatePage, setCertificatePage] = useState(false);
  const [image, setImage] = useState();

  const getBookmarks = async () => {
    setLoading(true);
    try {
      //debugger
      const response = await HttpClient.get('/course/purchased', { type: 'course' });
      const formattedCourses = response?.purchasedCourses?.map((eachCourse) => ({
        courseId: eachCourse?._id,
        courseImage: eachCourse?.courseCertificates?.courseImage,
        certificate: eachCourse?.courseCertificates?.certificateImage,
        courseTitle: eachCourse?.courseDetails?.title,
        cratedOn: eachCourse?.createdAt,
        createdBy: eachCourse?.createdBy,
        address: eachCourse?.courseDetails?.address?.address,
        townCity: eachCourse?.courseDetails?.address?.town_city,
        postCode: eachCourse?.courseDetails?.address?.postCode,
        amount: eachCourse?.courseDetails?.amount,
        days: eachCourse?.courseDetails?.days,
        duration: eachCourse?.courseDetails?.duration,
        enrollmentLimit: eachCourse?.courseDetails?.enrollmentLimit,
        startDate: eachCourse?.courseDetails?.startDate,
        endDate: eachCourse?.courseDetails?.endDate,
        courseCategory: eachCourse?.courseDetails?.category,
        startHour: eachCourse?.courseDetails?.startTime?.hour,
        startAmPM: eachCourse?.courseDetails?.startTime?.am_pm,
        endHour: eachCourse?.courseDetails?.endTime?.hour,
        endAmPM: eachCourse?.courseDetails?.endTime?.am_pm,
        courseDescription: eachCourse?.courseDetails?.description,
        certificateImage: eachCourse?.courseCertificates?.certificateImage
      }));
      const filteredCourse = formattedCourses.filter(
        (course) => course?.courseId !== undefined 
      );
      setCourses(filteredCourse);
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error('Unauthorized. Please log in.');
      } else if (err?.response?.status === 404) {
        toast.error('Bookmark endpoint not found.');
      } else {
        toast.error(`Error: ${err?.response?.data?.message || 'Something went wrong'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="flex w-full justify-between items-center mb-6">
        <h5 className="font-bold text-gray-600 text-lg">All Courses</h5>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <ClipLoader color="#D3555A" size={50} />
        </div>
      ) : courses?.length > 0 ? (
        <div className="w-full max-w-4xl">
          {courses?.map((course, index) => (
            <div key={index} className="shadow-xl rounded-2xl p-6 mb-6 bg-white transition-all duration-300 transform hover:scale-[1.02]">
              {certificatePage ? (
                <CertificateEditor imageUrl={image} />
              ) : (
                <div className="flex flex-col lg:flex-row justify-between items-start">
                  {/* Course Image */}
                  <img
                    src={course?.courseImage || "/assets/laptop.png"}
                    alt={course?.courseTitle || "Course Image"}
                    className="rounded-xl w-28 h-28 md:w-36 md:h-36 object-cover shadow-md"
                  />

                  {/* Course Info */}
                  <div className="flex flex-col flex-grow mt-4 lg:mt-0 lg:ml-6">
                    <h3 className="font-bold text-xl md:text-2xl text-gray-800">{course?.courseTitle}</h3>
                    <p className="text-gray-600 text-sm md:text-base mt-2 leading-relaxed">
                      {course?.courseDescription || "Course description goes here..."}
                    </p>

                    {/* Course Tags */}
                    <div className="flex flex-wrap mt-3">
                      {course.tags?.map((tag, tagIndex) => (
                        <p
                          key={tagIndex}
                          className="bg-blue-100 text-blue-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1 mr-2 mb-2"
                        >
                          {tag}
                        </p>
                      ))}
                    </div>

                    {/* Course Start Date & Buttons */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                      <p className="text-gray-700 font-medium">
                        Starts: <strong className="text-gray-900">{course?.startDate?.substring(0, 10) || "TBA"}</strong>
                      </p>
                      <p className="text-gray-700 font-medium">
                        Ends: <strong className="text-gray-900">{course?.endDate?.substring(0, 10) || "TBA"}</strong>
                      </p>

                      {/* Action Buttons */}
                      {/* <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                        <button
                          type="button"
                          className="bg-gradient-to-r from-red-500 to-red-700 text-white px-2 py-1 w-auto rounded-xl shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
                        >
                          View More
                        </button>
                        <button
                          onClick={() => {
                            if (
                              ((new Date(course?.endDate) - new Date()) / (new Date(course?.endDate) - new Date(course?.startDate))) * 100 > 80
                            ) {
                              setCertificatePage(true);
                              setImage(course?.certificate);
                            }

                            else {
                              toast.error('Your course status is less than 80%. ')
                            }



                          }}
                          type="button"
                          className="bg-gradient-to-r from-red-500 to-red-700 text-white px-2 py-1 w-auto rounded-xl shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
                        >
                          Generate Certificate
                        </button>
                      </div> */}
                    </div>
                    <div className="flex flex-col md:flex-row gap-5 items-center mt-4">
                      <p className="text-gray-700 font-medium">
                        Course progress:
                         {
                         new Date(course.startDate)<=new Date()?
                        <b>
                          {" "}
                          {
                            Math.ceil(
                              Math.abs(new Date() - new Date(course?.startDate?.substring(0, 10))) /
                              (1000 * 60 * 60 * 24)
                            )
                          }{" "}
                          /{" "}
                          {
                            Math.ceil(
                              Math.abs(new Date(course?.endDate?.substring(0, 10)) - new Date(course?.startDate?.substring(0, 10))) /
                              (1000 * 60 * 60 * 24)
                            )
                          }{" "}
                          days
                        </b>:
                        <b>
                        0/{
                            Math.ceil(
                              Math.abs(new Date(course?.endDate?.substring(0, 10)) - new Date(course?.startDate?.substring(0, 10))) /
                              (1000 * 60 * 60 * 24)
                            )
                          }{" "}
                          days
                        </b>
}
                      </p>

                      <p className="text-gray-700 font-medium">
                        Completion percent:
                        <b>
                          {" "}
                         {
                         new Date(course.startDate)<=new Date()?
                          <>
                           {
                            Math.min(100,
                              Math.ceil(
                                (
                                  Math.abs(new Date() - new Date(course?.startDate?.substring(0, 10))) /
                                  Math.abs(new Date(course?.endDate?.substring(0, 10)) - new Date(course?.startDate?.substring(0, 10)))
                                ) * 100
                              )
                            )
                          }

                          </>:
                          <>
                          0
                          </>
                         }
                          %
                        </b>
                      </p>


                      {/* Action Buttons */}

                    </div>
                  </div>
                </div>
              )}
            </div>

          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg">No courses added yet.</p>
      )}
    </div>
  );
};

export default UserCourses;
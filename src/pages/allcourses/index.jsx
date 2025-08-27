import { useEffect, useState } from "react";
import { CiBookmark, CiBookmarkCheck, CiLocationOn } from "react-icons/ci";
import { TbJewishStarFilled } from "react-icons/tb";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../components/loader";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

const AllCourses = ({
  courseData,
  paginate,
  currentPage,
  allJobs,
  jobsPerPage,
  totalpages,
  setReload,
  mycourses
  // onCountryChange,
  // onCityChange,
}) => {
  const [loading, setLoading] = useState(false);
  console.log("courseData", courseData)

  function Pagination({ jobsPerPage, totalJobs, paginate }) {
    // const pageNumbers = [];

    // for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    //   pageNumbers.push(i);
    // }
    // console.log(pageNumbers, "pagenum");

    return (
      <nav
        className="flex justify-center mt-4"
        style={{
          marginTop: "2rem",
        }}
      >
        <ul className="flex space-x-2">
          {totalpages.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 ${currentPage === number ? "bg-gray-300" : ""
                  }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  const createBookmark = async (courseId, type) => {
    try {
      //  debugger;
      const response = await HttpClient.post("/bookmark/", {
        referenceId: courseId,
        status: true,
        type: type,
      });
      if (response) {
        toast.info("saved course success");
        setReload(true);

      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error("Unauthorized. Please log in.");
      } else if (err.response.status === 404) {
        toast.error("Bookmark endpoint not found.");
      } else {
        toast.error(
          `Error: ${err.response.data.message || "Something went wrong"}`
        );
      }
    }
  };


  console.log(courseData?.courseCategory)

  return (
    <>



      {loading === false ? (
        <>

          <div className="flex mt-2 gap-3 flex-wrap ">
            {courseData.map((course) => (
              <div key={course.courseId}
                className="rounded-xl p-3 md:w-[32%] w-[100%] mb-3   bg-white"
                style={{ outline: "1px solid gray" }}
              >
                <div
                  className="w-full p-3 h-40 bg-cover rounded-xl  bg-center "
                  style={{
                    backgroundImage: `url(${course?.courseImage
                      ? course?.courseImage
                      : "/assets/cyberimagebg.png"
                      })`,
                  }}
                >
                  <div className="flex justify-between gap-2 flex-wrap w-[100%]">
                    <p style={{
                      outline: "1px solid gray"
                    }} className="bg-[#fff] font-semibold  text-[12px] px-1 py-1  h-[25px] rounded-lg">
                      {course.courseTitle}
                    </p>
                    <div className="flex">
                      <div className="flex items-center">
                        <p className="flex items-center bg-white text-sm px-2 py-1 mr-2 h-[25px] rounded-lg" style={{
                          outline: "1px solid gray"
                        }}>
                          {/* <TbJewishStarFilled className="text-yellow-400 mr-1" /> */}
                          {course?.courseCategory} ddd
                        </p>
                      </div>
                      {JSON.parse(localStorage.getItem("userData"))?.role ===
                        "employee" && (
                          <p
                            onClick={() => createBookmark(course?.courseId, "course")}
                            className="bg-white text-sm px-1 py-1 w-[22px] h-[25px] rounded-lg cursor-pointer"
                          >
                            {course?.bookmark ? (
                              <CiBookmarkCheck />
                            ) : (
                              <CiBookmark />
                            )}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex h-[80%] justify-end items-end">
                    <img
                      src={
                        course?.courseImage
                          ? course?.courseImage
                          : "/assets/amazon.png"
                      }
                      className="bg-[#fff] rounded-full w-[30px] h-[30px] p-1"
                      alt="logo"
                    />
                  </div>
                </div>
                <Link
                  to={`/coursedescription/${course?.courseId}`}
                  state={{ course }}
                  style={{ textDecoration: "none", color: "inherit" }} // Ensure no underline or color change
                >
                  <h4
                    className="mt-3 font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    style={{
                      fontSize: "16px", // Adjust font size for better readability
                      lineHeight: "1.5", // Improve text spacing
                    }}
                  >
                    {course?.courseDescription.slice(0, 80)}...{" "}
                    <span style={{ fontWeight: "bold", color: "#1d4ed8" }}>More</span>
                  </h4>
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    {course?.days.map((day, index) => (
                      <p
                        key={index}
                        className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full shadow"
                      >
                        {day}
                      </p>
                    ))}
                  </div>


                </div>

                <div className=" flex gap-3 mt-1">
                  <div>
                    <div className="flex items-center mb-1">
                      <img src="/assets/date.svg" className="me-1" alt="" />
                      <p className="text-[12px] font-bold">Duration</p>
                    </div>
                    <p
                      className="px-2 text-[11px] font-bold py-1 shadow-sm rounded-full text-gray-400"
                      style={{
                        outline: "1px solid #D0CECE",
                      }}
                    >
                      {new Date(course?.startDate).toLocaleDateString("en-GB")} -{" "}
                      {new Date(course?.endDate).toLocaleDateString("en-GB")}

                    </p>
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <img src="./assets/time.svg" alt="" className="me-1" />
                      <p className="text-[12px] font-bold">Timing</p>
                    </div>
                    <p
                      className="px-2 text-[11px] font-bold py-1  shadow-sm rounded-full text-gray-400"
                      style={{
                        outline: "1px solid #D0CECE",
                      }}
                    >
                      {course?.startHour}{course?.startAmPM}
                      {"-"}
                      {course?.endHour}{course?.endAmPM}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-2 items-center">

                  <div className="flex items-center gap-2 text-gray-700">
                    <CiLocationOn className="text-2xl text-blue-500" />
                    <p className="text-md font-medium">
                      City: <span className="font-normal">{course?.townCity}</span>
                    </p>
                  </div>


                  <div className="flex items-center">
                    <p className="font-bold text-[18px] mr-2">£ {course.amount}/-</p>


                  </div>

                </div>
                <div className="flex flex-wrap mt-2 justify-between">
                  <Link to={`/coursedescription/${course?.courseId}`} state={{ course: course }}>
                    <p className="bg-black rounded-full text-xs px-4 py-2 text-white cursor-pointer hover:bg-gray-800 transition-all">
                      Details
                    </p>
                  </Link>
                  {
                    mycourses && <Link to={`/my-subscribers/${course?.courseId}`} state={{ course: course }}>
                      <p className="bg-black rounded-full text-xs px-4 py-2 text-white cursor-pointer hover:bg-gray-800 transition-all">
                        Subscribers
                      </p>
                    </Link>
                  }

                </div>
              </div>
            ))}


          </div>
          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={allJobs}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div className="min-h-[50vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default AllCourses;

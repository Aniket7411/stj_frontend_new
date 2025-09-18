import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JobContext } from "../jobcontext";

function AddJobDetails4() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const { setPostingJob, workSchedule, setWorkSchedule } =
    useContext(JobContext);

  const navigate = useNavigate();


  // Toggle the selected day in workSchedule.workingDays
  const toggleDay = (day) => {
    const updatedDays = workSchedule.workingDays.includes(day)
      ? workSchedule.workingDays.filter((d) => d !== day) // Remove day if it's already selected
      : [...workSchedule.workingDays, day]; // Add day if it's not selected

    // Update the context API state with the new workingDays
    setWorkSchedule({
      ...workSchedule,
      workingDays: updatedDays, // Update workingDays in the context state
    });

    // Optionally update other values in the context if needed
    setPostingJob((prev) => ({
      ...prev,
      workSchedule: { ...workSchedule, workingDays: updatedDays }, // Update workSchedule in postingJob if needed
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!workSchedule.startTime || !workSchedule.endTime || !workSchedule.startDate || !workSchedule.duration || workSchedule.workingDays.length === 0) {
      alert("Please fill in all required fields: start time, end time, start date, duration, and select at least one working day.");
      return;
    }

    // Prepare data to send
    console.log("timing", workSchedule);

    setPostingJob((prevPostingJob) => ({
      ...prevPostingJob,
      workSchedule,
    }));

    navigate("/publishjob"); // Adjust the route as needed
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

          <h1 className="text-white text-2xl">Post Job: Job Timings</h1>
          <p className="text-[#fff]">
            Fill in the details below to reach qualified candidates quickly and
            securely.
          </p>
        </div>
      </div>
      <div className="bg-[#F0F0F0] p-2 md:p-8">
        <form
          className="mx-auto p-2 md:p-8 bg-[#fff] shadow-lg rounded-md font-sans"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mt-2 text-gray-800 mb-6 text-center">
            Add New Job Details
          </h2>
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
                active: true,
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
              Step 4 of 5:{" "}
              <span className="text-[#D3555A] font-semibold">
                Job Timings & Dates
              </span>
            </p>
          </div>

          {/* Form Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Work Schedule Section */}
            <div className="flex-1">
              <div className="mb-5">

                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="startTime"
                      className="block text-lg font-semibold mb-1"
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                      value={workSchedule.startTime} // Bind the state to the value
                      onChange={(e) =>
                        setWorkSchedule({
                          ...workSchedule,
                          startTime: e.target.value, // Update the startTime in the state
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="endTime"
                      className="block text-lg font-semibold mb-1"
                    >
                      End Time
                    </label>

                    <input
                      type="time"
                      id="endTime"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                      value={workSchedule.endTime} // Bind the state to the value
                      onChange={(e) =>
                        setWorkSchedule({
                          ...workSchedule,
                          endTime: e.target.value, // Update the endTime in the state
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="endTime"
                  className="block text-lg font-semibold mb-1"
                >
                  Working Days
                </label>
                <div>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => toggleDay(day)} // Call toggleDay when the button is clicked
                        className={`px-4 gap-2 py-1 m-2 rounded-md border ${workSchedule.workingDays.includes(day) // Check if day is selected
                          ? "bg-[#D3555A] text-white" // Selected day in red
                          : "bg-gray-200 text-black" // Unselected days in gray with black text
                          }`}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Job Timing Section */}
            <div className="flex-1">
              <div className="mb-5">
                <label
                  htmlFor="endTime"
                  className="block text-lg font-semibold "
                >
                  Job Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                  value={workSchedule.startDate}
                  onChange={(e) =>
                    setWorkSchedule({
                      ...workSchedule,
                      startDate: e.target.value,
                    })
                  }
                  min={new Date(Date.now() + 86400000).toISOString().split("T")[0]} // Setting min to tomorrow's date
                />


              </div>

              <div>


                <label
                  htmlFor="startTime"
                  className="block text-lg font-semibold mb-1"
                >
                  Duration (Days)
                </label>
                <input
                  type="number"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                  value={workSchedule.duration} // Binding to workSchedule.duration
                  onChange={(e) =>
                    setWorkSchedule({
                      ...workSchedule,
                      duration: Number(e.target.value), // Convert the value to a number
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            <Link to="/jobrequirements">
              <button
                style={{
                  outline: "1px solid #c5363c"
                }}
                type="button"
                className="py-1 mr-2 px-2  border text-[#c5363c] rounded-lg  hover:bg-gray-200"
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              className="px-3 py-1 bg-[#D3555A] text-white rounded-md  font-bold"
            >
              Save & Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddJobDetails4;

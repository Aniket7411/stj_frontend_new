import React, { useContext, useState } from "react";
import { CourseContext } from "../useContext2";


const CourseRequirements = ({ setActiveTab }) => {
  const [courseDescription, setCourseDescription] = useState("");
  const [courseRequirements, setCourseRequirements] = useState([
    "Flexibility with Assignments",
    "No Prior Experience Needed",
    "Determination and Eagerness to Learn",
    "Laptop or Desktop for Assignments",
  ]);
  const [newRequirement, setNewRequirement] = useState("");
  const [courseIsFor, setCourseIsFor] = useState([
    "Marketers and Influencers: Perfect for digital marketers and influencers seeking innovative ways to engage their audience and create impactful digital content.",
  ]);
  const [newAudience, setNewAudience] = useState("");
  const { updateCourseDetails } = useContext(CourseContext); // Access context function
  

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const validationErrors = {};
    if (!courseDescription.trim()) {
      validationErrors.courseDescription = "Course Description is required.";
    }
    if (courseRequirements.length === 0) {
      validationErrors.courseRequirements = "At least one requirement is required.";
    }
    if (courseIsFor.length === 0) {
      validationErrors.courseIsFor = "At least one audience is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = {
      courseDescription,
      courseRequirements,
      courseIsFor,
    };
    console.log("Submitted Data:", formData);
    updateCourseDetails("courseRequirement", formData)
    setActiveTab("courseCertificate")

  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setCourseRequirements([...courseRequirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const addAudience = () => {
    if (newAudience.trim()) {
      setCourseIsFor([...courseIsFor, newAudience.trim()]);
      setNewAudience("");
    }
  };

  const removeRequirement = (index) => {
    setCourseRequirements(courseRequirements.filter((_, i) => i !== index));
  };

  const clearRequirements = () => {
    setCourseRequirements([]);
  };

  return (
    <div>
      <label className="text-[14px] text-[#505050] font-bold">
        Course Description
        <span className="text-[#D3555A] ml-1 font-bold">*</span>
      </label>
      <br />
      <textarea
        className="bg-[#F9FDFF] rounded-lg p-2 h-[150px] w-[100%]"
        placeholder="Type here"
        style={{ outline: "2px solid #D6D6D6" }}
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
      />
      {errors.courseDescription && (
        <p className="text-red-500 text-sm">{errors.courseDescription}</p>
      )}

      <h4 className="text-[14px] text-[#505050] mt-3 mb-3 font-bold">
        Course Requirements
        <span className="text-[#D3555A] ml-1 font-bold">*</span>
      </h4>

      {courseRequirements.map((req, index) => (
        <div
          key={index}
          className="bg-[#F9FDFF] px-5 py-2 rounded-md flex justify-between items-center"
          style={{ outline: "1px solid #D6D6D6" }}
        >
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label>{req}</label>
          </div>
          <button
            className="text-[#D3555A] font-bold"
            onClick={() => removeRequirement(index)}
          >
            X
          </button>
        </div>
      ))}
      {courseRequirements.length > 0 && (
        <button
          className="text-red-500 mt-2"
          onClick={clearRequirements}
        >
          Remove All
        </button>
      )}
      {errors.courseRequirements && (
        <p className="text-red-500 text-sm">{errors.courseRequirements}</p>
      )}

      <div
        className="px-5 py-2 flex rounded-md mt-3"
        style={{ outline: "2px solid #D6D6D6" }}
      >
        <p
          className="w-[21px] mr-2 h-[21px] px-[6px] font-bold rounded-full"
          style={{ outline: "1px solid gray" }}
          onClick={addRequirement}
        >
          +
        </p>
        <input
          type="text"
          className="text-[#4C4C4C] outline-none w-[100%]"
          placeholder="Add course requirements"
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
        />
      </div>

      <h4 className="text-[14px] text-[#505050] mt-3 mb-3 font-bold">
        Who this course is for
        <span className="text-[#D3555A] ml-1 font-bold">*</span>
      </h4>

      {courseIsFor.map((audience, index) => (
        <div
          key={index}
          className="bg-[#F9FDFF] px-5 py-2 rounded-md flex justify-between items-center"
          style={{ outline: "1px solid #D6D6D6" }}
        >
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <label>{audience}</label>
          </div>
          <button
            className="text-[#D3555A] font-bold"
            onClick={() =>
              setCourseIsFor(courseIsFor.filter((_, i) => i !== index))
            }
          >
            X
          </button>
        </div>
      ))}
      {errors.courseIsFor && (
        <p className="text-red-500 text-sm">{errors.courseIsFor}</p>
      )}

      <div
        className="px-5 py-2 flex rounded-md mt-3"
        style={{ outline: "2px solid #D6D6D6" }}
      >
        <p
          className="w-[21px] mr-2 h-[21px] px-[6px] font-bold rounded-full"
          style={{ outline: "1px solid gray" }}
          onClick={addAudience}
        >
          +
        </p>
        <input
          type="text"
          className="text-[#4C4C4C] outline-none w-[100%]"
          placeholder="Add target audience"
          value={newAudience}
          onChange={(e) => setNewAudience(e.target.value)}
        />
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="mr-2 text-[#D3555A] rounded-lg shadow-md"
          style={{ outline: "1px solid #D3555A" }}
        >
          Cancel
        </button>
        <button
          className="bg-[#D3555A] w-[120px] text-white rounded-lg shadow-md"
          onClick={handleSubmit}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default CourseRequirements;

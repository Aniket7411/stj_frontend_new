import React, { createContext, useState } from "react";

const CourseContext = createContext();

// Default state for course
const defaultCourseDetails = {
  courseTitle: "",
  courseBody: "",
  courseStartDate: "",
  courseEndDate: "",
  courseStartTime: "",
  courseEndTime: "",
  courseCategory: "",
  courseAmount: 0,
  enrollmentLimit: 0,
  durationInDays: 0,
  courseWeekDays: ["mon", "tuesday"],
  address: "",
  postCode: "",
  townCity: "",
};

const defaultCourseRequirement = {
  courseDescription: "",
  courseRequirements: [],
  courseAudience: [],
};

const defaultCourseCertificates = {
  courseImage: "",
  courseCertificateImage: "",
};

// Main Provider Component
const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState({
    courseDetails: defaultCourseDetails,
    courseRequirement: defaultCourseRequirement,
    courseCertificates: defaultCourseCertificates,
  });

  // Update function to handle partial updates for nested fields
  const updateCourseDetails = (section, updates) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      [section]: {
        ...prevCourse[section],
        ...updates,
      },
    }));
  };

  return (
    <CourseContext.Provider value={{ course, updateCourseDetails }}>
      {children}
    </CourseContext.Provider>
  );
};

export { CourseContext, CourseProvider };

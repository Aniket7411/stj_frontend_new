import React, { useEffect, useState } from "react";
import { languages } from "../../utils/city";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";


const EmployerGeneralInfo = props => {
  const { employerGeneralInfo } = props

  const [formData, setFormData] = useState({
    bio: "",
    language: "",
    profession: "",
    experience: [],
    skills: [],
    tattoo: "",
    ukDrivingLicense: "",
    paramedicTraining: "",
    travelWill: "",
    healthIssue: "",
    millitaryBackground: "",
    passportDrivingLicense: "",
    drive: "",
    workPermit: "",
    cscs: "",
    siaBadge: "",
    ailments: "",
    piercing: "",
    firstAid: "",
    utrNumber: "",
    height: "",

  });



  const [experienceInput, setExperienceInput] = useState({
    company: "",
    title: "",
    startDate: "",
    endDate: "",
  });

  const [skillInput, setSkillInput] = useState("");

  // Handle input changes
  const handleInput = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle experience input changes
  const handleExperienceInput = (e) => {
    const { name, value } = e.target;
    setExperienceInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add experience
  const addExperience = () => {
    if (
      experienceInput?.company &&
      experienceInput?.title &&
      experienceInput?.startDate &&
      experienceInput?.endDate
    ) {
      setFormData((prev) => ({
        ...prev,
        experience: [...prev.experience, experienceInput],
      }));
      setExperienceInput({
        company: "",
        title: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  // Remove experience
  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Add skill
  const addSkill = () => {
    if (skillInput) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput],
      }));
      setSkillInput("");
    }
  };

  // Remove skill
  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const submitDetails = async () => {
    // console.log(formData)

    // const dataToSubmit = {
    //   generalInformation: formData
    // }

    try {
      const response = await HttpClient.put("/user/profile/general", formData);
      console.log(response);
      toast.success("Profile updated Successfully");
    } catch (error) {
      toast.error(error.message)
    }

  }

  const getEmployeeDetails = async () => {
    // setIsLoading(true)
    try {
      const response = await HttpClient.get("/user/profile/");
      console.log(response);


      const formattedData = {
        bio: response?.user?.profile?.generalInformation?.bio || "NA",
        profession: response?.user?.profile?.personalInformation?.profession || "NA",
        language: response?.user?.profile?.generalInformation?.language || "NA",
        experience: response?.user?.profile?.generalInformation?.experience || "NA",
        skills: response?.user?.profile?.personalInformation?.skills || [],
        tattoo: response?.user?.profile?.generalInformation?.tattoo || "NA",
        ukDrivingLicense: response?.user?.profile?.generalInformation?.ukDrivingLicense || "NA",

        paramedicTraining: response?.user?.profile?.generalInformation?.paramedicTraining || "NA",
        travelWill: response?.user?.profile?.generalInformation?.travelWill || 0,
        healthIssue: response?.user?.profile?.generalInformation?.healthIssue || "NA",
        millitaryBackground: response?.user?.profile?.generalInformation?.millitaryBackground || "NA",
        siaBadge: response?.user?.profile?.generalInformation?.siaBadge || "NA",
        // tattoo:response?.user?.profile?.generalInformation?.tattoo||"NA",
        //ukDrivingLicense:response?.user?.profile?.generalInformation?.ukDrivingLicense||"NA",
        paramedicTraining: response?.user?.profile?.generalInformation?.paramedicTraining || "NA",
        ailments: response?.user?.profile?.generalInformation?.ailments || "NA",
        passportDrivingLicense: response?.user?.profile?.generalInformation?.passportDrivingLicense || "NA",
        cscs: response?.user?.profile?.generalInformation?.cscs || "NA",
        piercing: response?.user?.profile?.generalInformation?.piercing || "NA",
        drive: response?.user?.profile?.generalInformation?.drive || "NA",
        // ailments:response?.user?.profile?.generalInformation?.siaBadge||"NA",
        // drive: response?.user?.profile?.generalInformation?.siaBadge||"NA",
        firstAid: response?.user?.profile?.generalInformation?.firstAid || "NA",
        workPermit: response?.user?.profile?.generalInformation?.workPermit || "NA",
        height: response?.user?.profile?.generalInformation?.height,
        utrNumber: response?.user?.profile?.generalInformation?.utrNumber

      }


      setFormData(formattedData);


      // setIsLoading(false)
    } catch (error) {
      console.error("Error fetching employer details:", error);
    }
  };




  useEffect(() => {
    getEmployeeDetails();

  }, []);






  // Reusable Radio Button Component
  const RadioButtonGroup = ({ label, name, value, onChange }) => {

    return (
      <div className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2" style={{ outline: "1px solid #D6D6D6" }}>
        <label className="flex items-center mr-4">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === "yes"}
            onChange={onChange}
            className="mr-2"
          />
          Yes
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === "no"}
            onChange={onChange}
            className="mr-2"
          />
          No
        </label>
      </div>
    );
  };



  return (
    <div>
      <h5 className="text-[#407BFF] font-bold mb-2 mt-2">
        General Information
      </h5>

      <div
        className="rounded-lg px-5 py-4 bg-[#f3f4f6]"
        style={{ outline: "1px solid #CBCBCB" }}
      >
        {/* Bio Section */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Bio <span className="text-[#D3555A]">*</span>
          </p>
          <div
            className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%]"
            style={{ outline: "1px solid #D6D6D6" }}
          >
            <textarea
              value={formData?.bio}
              maxLength={200}
              onChange={(e) => {
                const maxWords = 50; // Set your word limit here
                const inputText = e.target.value;
                const wordCount = inputText?.trim().split(/\s+/).length;

                if (wordCount <= maxWords) {
                  handleInput(e, "bio");
                }
              }}
              className="w-full outline-none p-2 text-sm"
              placeholder="Enter About you (Max 50 words)"
              rows="8"
            />
          </div>

        </div>


        <hr className="mt-2 mb-2" />

        {/* Language */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Language Spoken <span className="text-[#D3555A]">*</span>
          </p>

          <div
            className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%]"
            style={{
              outline: "1px solid #D6D6D6",
            }}
          >
            <select
              id="language"
              name="language"
              value={formData?.language}
              onChange={(e) => handleInput(e, "language")}
              className="w-full py-2 px-3 bg-white border border-[#D6D6D6] rounded-lg outline-none text-sm text-[#333]"
            >
              {languages?.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className="mt-2 mb-2" />

        {/* Profession */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Profession or Position <span className="text-[#D3555A]">*</span>
          </p>
          <div
            className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%]"
            style={{ outline: "1px solid #D6D6D6" }}
          >
            <input
              type="text"
              name="profession"
              value={formData?.profession}
              onChange={(e) => handleInput(e, "profession")}
              className="w-full outline-none p-2 text-sm"
              placeholder="Type here"
            />
          </div>
        </div> */}

        <hr className="mt-2 mb-2" />

        {/* Add Experience */}
        {/* <div className="md:p-6 p-3  mx-auto bg-gray-100 rounded-md max-w-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Add Experience</h1>

          <div className="space-y-3">
            <input
              type="text"
              name="company"
              value={experienceInput?.company}
              onChange={handleExperienceInput}
              placeholder="Company Name"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm"
              aria-label="Company Name"
            />
            <input
              type="text"
              name="title"
              value={experienceInput?.title}
              onChange={handleExperienceInput}
              placeholder="Role"
              className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm"
              aria-label="Role"
            />
            <div className="flex flex-wrap gap-3">
              <input
                type="date"
                name="startDate"
                value={experienceInput?.startDate}
                onChange={handleExperienceInput}
                className="p-3 border border-gray-300 rounded-lg outline-none text-sm"
                aria-label="Start Date"
              />
              <input
                type="date"
                name="endDate"
                value={experienceInput?.endDate}
                onChange={handleExperienceInput}
                className="p-3 border border-gray-300 rounded-lg outline-none text-sm"
                aria-label="End Date"
              />
            </div>
            <button
              type="button"
              onClick={addExperience}
              disabled={
                !experienceInput?.company ||
                !experienceInput?.title ||
                !experienceInput?.startDate ||
                !experienceInput?.endDate
              }
              className={`py-2 px-4 w-auto text-white rounded-lg ${experienceInput?.company &&
                experienceInput?.title &&
                experienceInput?.startDate &&
                experienceInput?.endDate
                ? "bg-[#c5363c] hover:bg-[#a52931] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              + Add Experience
            </button>
          </div>

          {formData?.experience?.length > 0 && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold">Your Experience:</h2>
              {formData?.experience?.map((exp, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 bg-gray-200 rounded-lg shadow-md"
                >
                  <div>
                    <p className="font-medium">{exp?.company}</p>
                    <p className="text-sm text-gray-600">{exp?.title}</p>
                    <p className="text-sm text-gray-500">
                      {exp?.startDate?.substring(0, 10)} - {exp?.endDate?.substring(0, 10)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    aria-label={`Remove experience at ${exp?.company}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div> */}


        {/* <hr className="mt-2 mb-2" /> */}

        {/* Skills */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            My Expertise Skills <span className="text-[#D3555A]">*</span>
          </p>
          <div className="flex items-center flex-wrap gap-2 space-x-2">
            <input
              type="text"
              value={skillInput}
              placeholder="Enter a Skill"
              className="flex-1 p-2 text-sm border border-gray-300 rounded-lg outline-none"
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              + Add Skills
            </button>
          </div>
        </div> */}

        {/* Display Skills */}
          {/* {formData?.skills?.length > 0 && (
            <div className="space-y-2 mt-4">
              {formData?.skills?.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-200 rounded-lg"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )} */}

        {/* <hr className="mt-2 mb-2" /> */}

        {/* Additional Information */}
        {/* <h1 className="text-2xl font-bold text-center mb-4">Additional Information</h1> */}


        <div className="flex justify-between flex-wrap gap-4 mb-2">


          {/* Height */}
          {/* <div>
            <p className="text-sm font-bold flex items-center">
              Height (In cms)
            </p>
            <input
              type="number"
              name="height"
              className="rounded-lg px-2 py-1 mt-1"
              style={{ outline: "1px solid gray" }}
              max="200" // Restrict maximum input value to 200
              onChange={(e) => {
                const value = e.target.value;
                if (value <= 200) {
                  handleInput(e, "height"); // Update the formData only if within the limit
                }
              }}
              value={formData.height}
            />

          </div> */}

          {/* UTR NumberTown/City */}
          {/* <div>
            <p className="text-sm font-bold flex items-center">
              UTR Number  <span className="text-red-500 ml-1"></span>
            </p>
            <input
              type="text"
              onChange={(e) => handleInput(e, "utrNumber")}
              value={formData.utrNumber}


              className="rounded-lg px-2 py-1 mt-1"
              style={{ outline: "1px solid gray" }}
            />
          </div> */}


        </div>

        {/* Visible Tattoo */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Visible Tattoo <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="Visible Tattoo"
            name="tattoo"
            value={formData?.tattoo}
            onChange={(e) => handleInput(e, "tattoo")}
          />
        </div> */}

        {/* UK Driving License */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Do you hold full UK Driving License? <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="UK Driving License"
            name="ukDrivingLicense"
            value={formData?.ukDrivingLicense}
            onChange={(e) => handleInput(e, "ukDrivingLicense")}
          />
        </div> */}

        {/* Paramedic Training */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Paramedic training? <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="Paramedic Training"
            name="paramedicTraining"
            value={formData?.paramedicTraining}
            onChange={(e) => handleInput(e, "paramedicTraining")}
          />
        </div> */}

        {/* Travel Willingness */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            How far are you willing to travel? (Miles)
          </p>
          <div className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2" style={{ outline: "1px solid #D6D6D6" }}>
            <input
              type="number"
              name="travelWill"
              placeholder="Enter travel distance (In miles)"
              className="w-full outline-none p-2 text-sm"
              value={formData?.travelWill || ""}
              onChange={(e) => handleInput(e, "travelWill")}
            />
          </div>
        </div> */}

        {/* Health Issues */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Any Health Issues? <span className="text-[#D3555A]">*</span>
          </p>

          <RadioButtonGroup
            label="Health Issue"
            name="healthIssue"
            value={formData?.healthIssue}
            onChange={(e) => handleInput(e, "healthIssue")}
          />

        </div> */}

        {/* Military Background */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Military Background? <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="Military Background"
            name="millitaryBackground"
            value={formData?.millitaryBackground}
            onChange={(e) => handleInput(e, "millitaryBackground")}
          />
        </div> */}

        {/* Passport Driving License */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Do you have a Passport Driving License?
          </p>
          <RadioButtonGroup
            label="Passport Driving License"
            name="passportDrivingLicense"
            value={formData?.passportDrivingLicense}
            onChange={(e) => handleInput(e, "passportDrivingLicense")}
          />
        </div> */}

        {/* Drive */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Do you drive? <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="Drive"
            name="drive"
            value={formData?.drive}
            onChange={(e) => handleInput(e, "drive")}
          />
        </div> */}

        {/* Work Permit */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Do you have work permit? <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="Work Permit"
            name="workPermit"
            value={formData?.workPermit}
            onChange={(e) => handleInput(e, "workPermit")}
          />
        </div> */}

        {/* CSCS Card */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Do you have CSCS Card? <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="CSCS Card"
            name="cscs"
            value={formData?.cscs}
            onChange={(e) => handleInput(e, "cscs")}
          />
        </div> */}

        {/* SIA Badge */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Do you have SIA Badge? <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="SIA Badge"
            name="siaBadge"
            value={formData?.siaBadge}
            onChange={(e) => handleInput(e, "siaBadge")}
          />
        </div> */}

        {/* Ailments */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Any Ailments that could impair your ability to work? <span className="text-[#D3555A]">*</span>
          </p>
          <RadioButtonGroup
            label="Ailments"
            name="ailments"
            value={formData?.ailments}
            onChange={(e) => handleInput(e, "ailments")}
          />
        </div> */}

        {/* Piercing */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            Any piercing?
          </p>
          <RadioButtonGroup
            label="Piercing"
            name="piercing"
            value={formData?.piercing}
            onChange={(e) => handleInput(e, "piercing")}
          />
        </div> */}

        {/* First Aid */}
        {/* <div className="flex flex-wrap justify-between items-center mb-4">
          <p className="font-bold text-base">
            First Aid?
          </p>
          <RadioButtonGroup
            label="First Aid"
            name="firstAid"
            value={formData?.firstAid}
            onChange={(e) => handleInput(e, "firstAid")}
          />
        </div> */}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={submitDetails}
            className="w-auto px-2 text-[#C5363C] rounded-lg bg-[#fff]"
            style={{ outline: "1px solid #C5363C" }}
          >
            Submit details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerGeneralInfo;
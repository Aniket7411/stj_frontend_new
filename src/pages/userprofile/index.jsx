import { useCallback, useEffect, useState } from "react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { languages } from "../../utils/city";


import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { Modal } from "@react-pdf-viewer/core";
import MapSearch from "../../components/mapsearch";


const UserPofile = () => {
  const [skillInput, setSkillInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isImageLoading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [addressModal, setAddressModal] = useState(false);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const handleChangePassword = () => {
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    // Add logic to handle password change (e.g., API call)
    setModalIsOpen(false); // Close the modal after submission
  };





  const [formData, setFormData] = useState({
    contactNumber: "",
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    postCode: "",
    town: "",
    // country: "",
    state: "",
    latitude: null,
    longitude: null,
    language: "English",
    profession: "",
    skills: [],
    aboutBio: "",
    experiences: [],
    profileImage: "",
    height: "",
    utrNumber: "",
    referralCode: "",
    millitaryBackground: "",
    tattoo: "",
    siaBadge: "",
    ukDrivingLicense: "",
    paramedicTraining: "",
    travelWill: "",
    ailments: "",
    passportDrivingLicense: "",
    customProfession: "",
    cscsCard: "",
    piercing: "",
    drive: "",
    firstAid: "",
    workPermit: "",
    paypalEmail: ""

  })

  console.log(formData)




  const getImageUrl = useCallback(async (e) => {
    setLoading(true);
    try {
      const url = await uploadImageOnCloudinary(e);
      setFormData((prevState) => ({
        ...prevState,
        profileImage: url,
      }));
      console.log(url)
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove image
  const removeImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      companyLogo: "",
    }));
    setLogoPreview(null);
  };





  //console.log(formData)

  const [experienceInput, setExperienceInput] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
  });



  const handleExperienceInput = (e) => {
    const { name, value } = e.target;
    setExperienceInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExperience = () => {
    const { company, role, startDate, endDate } = experienceInput;

    // Check if all fields are filled
    if (!company || !role || !startDate || !endDate) {
      alert("Please fill out all details to add an experience.");
      return;
    }

    // Convert dates to a comparable format
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    // Validate that the start date is before the end date
    if (start > end) {
      toast.warn("Start date must be earlier than the end date.")
      return;
    }

    // Optional: Ensure dates are not in the future
    if (start > today || end > today) {
      toast.warn("Dates cannot be in the future.")
      return;
    }

    // Add the experience to the form data
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev?.experiences, experienceInput],
    }));

    // Reset the input fields
    setExperienceInput({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
    });
  };


  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev?.experiences?.filter((_, i) => i !== index),
    }));
  };



  const addSkill = () => {
    if (skillInput.trim() && !formData?.skills.includes(skillInput)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput],
      }));
      setSkillInput(""); // Clear the input field after adding
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleInput = (e, name) => {
    const value = e.target.value;

    // Validation for the DOB field
    if (name === "dob") {
      const selectedDate = new Date(value);
      const today = new Date();
      const minAgeDate = new Date();
      minAgeDate.setFullYear(today.getFullYear() - 18); // Set minimum age to 18 years

      if (selectedDate > today) {
        toast.info("Date of Birth cannot be in the future.");
        return;
      }

      if (selectedDate > minAgeDate) {
        toast.info("You must be at least 18 years old.");
        return;
      }
    }

    // Update formData state
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamically set the value based on the input name
    }));
  };


  const submitForm = async (e) => {
    e.preventDefault();
    //console.log(formData)

    if (!formData?.contactNumber?.length === 11) {
      console.log("number 11")
    }
    const employeeRole =
      (formData?.profession?.length > formData?.customProfession?.length
        ? formData?.profession
        : formData?.customProfession) || "";

    console.log("employeeRole", employeeRole)

    const dataToSubmit = {




      personalInformation: {
        contactNumber: formData?.contactNumber,
        profession: employeeRole,
        dob: formData?.dob,
        gender: formData?.gender,
        nationality: formData?.nationality,
        paypalEmail: formData?.paypalEmail,
        skills: formData?.skills,

        address: {
          address: formData?.address,
          postCode: formData?.postCode,
          state: formData?.state,
          town: formData?.town,
          city: formData?.town,
          latitude: formData?.latitude,
          longitude: formData?.longitude
        },
        profileImage: formData?.profileImage

      },

      generalInformation: {
        height: formData?.height,
        build: "Athletic",
        language: formData?.language,
        utrNumber: formData?.utrNumber,
        ailments: formData?.ailments,
        travelWill: formData?.travelWill,
        millitaryBackground: formData?.millitaryBackground,
        healthIssue: formData?.healthIssue,

        ukDrivingLicense: formData?.ukDrivingLicense,
        paramedicTraining: formData?.paramedicTraining,
        piercing: formData?.piercing,
        // "abroadTravel": formData?.abroadTravel,
        siaBadge: formData?.siaBadge,
        drive: formData?.drive,
        firstAid: formData?.firstAid,
        tattoo: formData?.tattoo,
        workPermit: formData?.workPermit,
        cscs: formData?.cscsCard,
        passportDrivingLicense: formData?.passportDrivingLicense,
        bio: formData?.aboutBio,
        experience: formData?.experiences,
        willingToTravel: formData?.travelWill,
        paypalEmail: formData?.paypalEmail
      },
    }

    console.log(dataToSubmit?.personalInformation?.contactNumber?.length)

    if (dataToSubmit?.personalInformation?.contactNumber?.length === 11) {
      console.log("dataToSubmit", dataToSubmit)
      try {
        //debugger
        const response = await HttpClient.put("/user/profile/personal", dataToSubmit);
        if (response.success) {
          toast.success("Profile updated Successfully");
          getEmployeeDetails()
        }
        //console.log(response);


      } catch (error) {
        if (error.status === 400) {
          toast.error(error.response.data.message || error.message)
        }
        else {
          toast.error("internal server error")
        }
      }

    } else {
      alert("Contact number must be exactly 11 digits.")
    }


  };



  //console.log("formData", formData);
  const getEmployeeDetails = async () => {
    setIsLoading(true)
    try {
      //  debugger;
      const response = await HttpClient.get("/user/profile/");
      console.log(response, "....uuuu")
      // const dataToSubmit = {

      //   personalInformation:{
      //     contactNumber:formData?.contactNumber,
      //     dob:formData?.dob,
      //     gender:formData?.gender,
      //     nationality:formData?.nationality,
      //     address:{
      //       address:formData?.address,
      //       postCode:formData?.postCode,
      //       country:formData?.country,
      //       town:formData?.town,
      //       city:formData?.town,
      //     }

      //   },

      //   generalInformation: {
      //     height: formData?.height,
      //     build: "Athletic",
      //     language: formData?.language,
      //     utrNumber: formData?.utrNumber,
      //     alignments: formData?.ailments,
      //     travelWill: 1,
      //     millitaryBackground: formData?.militaryBackground,
      //     ukDrivingLicense: formData?.ukDrivingLicense,
      //     paramedicTraining: formData?.paramedicTraining,
      //     piercing: formData?.piercing,
      //     // "abroadTravel": formData?.abroadTravel,
      //     siaBadge: formData?.siaBadge,
      //     drive: formData?.drive,
      //     firstAid: formData?.firstAid,
      //     tattoo: formData?.firstAid,
      //     workPermit: formData?.workPermit,
      //     cscs: formData?.cscsCard,
      //     passportDrivingLicense: formData?.passportDrivingLicense,
      //     bio: formData?.aboutBio,
      //     experience: formData?.experiences,
      //     willingToTravel : formData?.travelDistance,
      //   },
      // }
      //setEmployerDetails(response.user);
      //console.log(response);

      setFormData((pre) => ({
        ...pre,  // Retain previous state

        contactNumber: response?.user?.profile?.personalInformation?.contactNumber,
        dob: response?.user?.profile?.personalInformation?.dob,
        gender: response?.user?.profile?.personalInformation?.gender,
        nationality: response?.user?.profile?.personalInformation?.nationality,
        profession: response?.user?.profile?.personalInformation?.profession,

        address: response?.user?.profile?.personalInformation?.address?.address,
        postCode: response?.user?.profile?.personalInformation?.address?.postCode,
        state: response?.user?.profile?.personalInformation?.address?.state,
        latitude: response?.user?.profile?.personalInformation?.address?.latitude,
        longitude: response?.user?.profile?.personalInformation?.address?.longitude,
        skills: response?.user?.profile?.personalInformation?.skills,
        town: response?.user?.profile?.personalInformation?.address?.town,
        height: response?.user?.profile?.generalInformation?.height,
        language: response?.user?.profile?.generalInformation?.language,
        ailments: response?.user?.profile?.generalInformation?.ailments,
        tattoo: response?.user?.profile?.generalInformation?.tattoo,
        utrNumber: response?.user?.profile?.generalInformation?.utrNumber,
        millitaryBackground: response?.user?.profile?.generalInformation?.millitaryBackground,  // Fixed typo
        ukDrivingLicense: response?.user?.profile?.generalInformation?.ukDrivingLicense,
        paramedicTraining: response?.user?.profile?.generalInformation?.paramedicTraining,
        piercing: response?.user?.profile?.generalInformation?.piercing,
        siaBadge: response?.user?.profile?.generalInformation?.siaBadge,
        drive: response?.user?.profile?.generalInformation?.drive,
        firstAid: response?.user?.profile?.generalInformation?.firstAid,
        workPermit: response?.user?.profile?.generalInformation?.workPermit,
        cscsCard: response?.user?.profile?.generalInformation?.cscs,
        passportDrivingLicense: response?.user?.profile?.generalInformation?.passportDrivingLicense,
        aboutBio: response?.user?.profile?.generalInformation?.bio,
        experiences: response?.user?.profile?.generalInformation?.experience,
        travelWill: response?.user?.profile?.generalInformation?.willingToTravel,
        bio: response?.user?.profile?.generalInformation?.bio,
        paypalEmail: response?.user?.profile?.personalInformation?.paypalEmail,
        travelWill: response?.user?.profile?.generalInformation?.travelWill,
        healthIssue: response?.user?.profile?.generalInformation?.healthIssue,
        profileImage: response?.user?.profile?.personalInformation?.profileImage,


      }));

      console.log("formDataformDataformData", formData)


      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching employer details:", error);
    }
  };



  useEffect(() => {
    getEmployeeDetails();
  }, []);



  return (

    <>

      {
        isLoading ? <div className="flex items-center justify-center h-screen"><ClipLoader size={50} color="#4ade80" /></div> : <form onSubmit={submitForm}>
          <h5 className="text-[#407BFF] font-bold mb-4">Personal Information</h5>
          <div
            className="rounded-lg px-5 py-4 bg-[#f3f4f6]"
            style={{
              outline: "1px solid #CBCBCB",
            }}
          >

            <p className="font-bold text-base">
              Profile Image <span className="text-[#D3555A]">*</span>
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <label className="relative inline-block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={getImageUrl}
                />
                <div className="px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition">
                  Upload Image
                </div>
              </label>
              {formData?.profileImage && (
                <div className="relative w-32 h-32 mt-4">
                  <img
                    src={formData?.profileImage}
                    alt="Company Logo Preview"
                    className="object-cover border rounded-lg w-full h-full shadow-md hover:shadow-lg transition"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                    aria-label="Remove Image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>



            <hr className="mt-2 mb-2" />



            {/* Contact Number Section */}
            <div className="flex flex-wrap justify-between items-center">
              <p className="font-bold text-base">
                Contact Number <span className="text-[#D3555A]">*</span>
              </p>

              <div className="flex items-center rounded-lg w-full bg-[#fff] sm:w-[40%] border border-gray-300">
                {/* Country Code Dropdown */}
                <p className="bg-[#e1d2d2] text-sm p-1 rounded-md m-1">+44</p>
                {/* Vertical Line Separator */}
                <div className="h-8 w-[1px] bg-gray-300 mx-1"></div>
                {/* Contact Number Input */}
                <input
                  type="text"
                  value={formData?.contactNumber}
                  name="contactNumber"
                  placeholder="Enter Contact Number"
                  minLength={11}
                  maxLength={11}
                  className="flex-1 p-3 text-sm text-gray-800 outline-none"
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numeric values and limit to 11 digits
                    if (/^\d*$/.test(value) && value?.length <= 11) {
                      handleInput(e, "contactNumber");
                    }
                  }}

                />
              </div>
            </div>


            <hr className="mt-2 mb-2" />



            {/* Paypal Section */}
            <div className="flex flex-wrap justify-between items-center">
              <p className="font-bold text-base">
                Paypal email <span className="text-[#D3555A]">*</span>
              </p>

              <div className="flex items-center rounded-lg w-full bg-[#fff] sm:w-[40%] border border-gray-300">
                {/* Email Input */}
                <input
                  type="email" // Ensures input is validated as an email address
                  value={formData?.paypalEmail} // Ensure the key matches the state
                  name="paypalEmail"

                  placeholder="Enter Email Address"
                  className="flex-1 p-3 text-sm text-gray-800 outline-none"
                  onChange={(e) => handleInput(e, "paypalEmail")}
                />

              </div>
            </div>

            <hr className="mt-2 mb-2" />






            <hr className="mt-2 mb-2" />

            {/* DOB Section */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                DOB <span className="text-[#D3555A]">*</span>
              </p>

              <div
                className="rounded-lg flex items-center w-full bg-[#fff]   sm:w-[40%]"
                style={{
                  outline: "1px solid #D6D6D6",
                }}
              >
                <input
                  type="date"
                  className="w-full outline-none p-2 text-sm"
                  placeholder="Enter your DOB"
                  onChange={(e) => handleInput(e, "dob")}
                  value={formData?.dob}
                  required
                  max={new Date().toISOString().split("T")[0]} // restricts selection till today
                />

              </div>
            </div>

            <hr className="mt-2 mb-2" />

            {/* Gender */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Gender <span className="text-[#D3555A]">*</span>
              </p>

              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%]"
                style={{
                  outline: "1px solid #D6D6D6",
                }}
              >
                <select
                  id="gender"
                  name="gender"
                  value={formData?.gender}
                  onChange={(e) => handleInput(e, "gender")} // Corrected to "gender"
                  className="w-full py-2 px-3 bg-white border border-[#D6D6D6] rounded-lg outline-none text-sm text-[#333]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>

              </div>
            </div>

            <hr className="mt-2 mb-2" />

            {/* Nationality Section */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Nationality <span className="text-[#D3555A]">*</span>
              </p>

              <div
                className="rounded-lg flex items-center w-full bg-[#fff]  sm:w-[40%]"
                style={{
                  outline: "1px solid #D6D6D6",
                }}
              >
                <input
                  type="text"
                  className="w-full outline-none p-2 text-sm"
                  placeholder="Enter your Nationality"
                  onChange={(e) => handleInput(e, "nationality")}
                  value={formData?.nationality}
                  required


                />
              </div>
            </div>
            <hr className="border-gray-300 mt-4 mb-4" />

            <div>
              <p className="font-bold text-base">
                Address <span className="text-red-500 ml-1">*</span>
              </p>
              {
                formData?.address?.length > 0 && addressModal === false ?
                  <>
                    <input

                      value={formData?.address}
                      type="text"
                      required
                      name="address"
                      placeholder="Enter location"
                      className="flex-1 p-3 text-sm text-gray-800 outline-none"
                    />
                    <button
                      onClick={() => {
                        setAddressModal(true)
                      }}
                      className="w-auto px-2 py-1 text-[#C5363C] rounded-lg bg-[#fff]" style={{
                        outline: "1px solid #C5363C"
                      }}



                    >
                      Change address
                    </button>
                  </>
                  :
                  <>
                    <MapSearch setJobDetails={setFormData} type="employeeProfile" />
                  </>
              }

            </div>

            {/* physical detail */}
            <div className="flex justify-between flex-wrap gap-4 mb-2">


              {/* Postcode */}
              <div>
                <p className="text-sm font-bold flex items-center">
                  Height (In cms)
                </p>
                <input
                  type="number"
                  name="height"
                  className="rounded-lg px-2 py-1 mt-1"
                  style={{ outline: "1px solid gray" }}
                  onChange={(e) => handleInput(e, "height")}
                  value={formData?.height}



                />
              </div>

              {/* Town/City */}
              <div>
                <p className="text-sm font-bold flex items-center">
                  UTR Number  <span className="text-red-500 ml-1"></span>
                </p>
                <input
                  type="number"
                  onChange={(e) => handleInput(e, "utrNumber")}
                  value={formData?.utrNumber}
                  className="rounded-lg px-2 py-1 mt-1"
                  style={{ outline: "1px solid gray" }}
                />
              </div>


              {/* Postcode */}
              <div>
                <p className="text-sm font-bold flex items-center">
                  Postcode <span className="text-red-500 ml-1">*</span>
                </p>
                <input
                  type="text"
                  name="postCode"
                  className="rounded-lg px-2 py-1 mt-1"
                  style={{ outline: "1px solid gray" }}
                  onChange={(e) => handleInput(e, "postCode")}
                  value={formData?.postCode}
                  required


                />
              </div>

              {/* Country */}
              {/* <div>
                <p className="text-sm font-bold flex items-center">
                  Referral Code<span className="text-red-500 ml-1"></span>
                </p>
                <input
                  type="text"
                  className="rounded-lg mt-1 px-2 py-1"
                  style={{ outline: "1px solid gray" }}
                  onChange={(e) => handleInput(e, "referralCode")}
                  value={formData?.referralCode}


                />
              </div> */}
            </div>





            {/* Address */}
            <div className="flex justify-between flex-wrap gap-4">




              {/* Town/City */}
              <div>
                <p className="text-sm font-bold flex items-center">
                  Town/City <span className="text-red-500 ml-1">*</span>
                </p>
                <input
                  disabled={formData?.address?.length > 0 ? false : true}
                  type="text"
                  onChange={(e) => handleInput(e, "town")}
                  value={formData?.town}

                  className="rounded-lg px-2 py-1 mt-1"
                  style={{ outline: "1px solid gray" }}
                />
              </div>

              {/* State */}
              <div>
                <p className="text-sm font-bold flex items-center">
                  County<span className="text-red-500 ml-1">*</span>
                </p>
                <input
                  type="text"
                  disabled={formData?.address?.length > 0 ? false : true}
                  className="rounded-lg mt-1 px-2 py-1"
                  style={{ outline: "1px solid gray" }}
                  onChange={(e) => handleInput(e, "country")}
                  value={formData?.state}
                  required

                />
              </div>
            </div>
            <hr className="border-gray-300 mt-4 mb-4" />
          </div>

          <h5 className="text-[#407BFF] font-bold mb-2 mt-2">
            General & Skills Information
          </h5>

          <div
            className="rounded-lg px-5 py-4 bg-[#f3f4f6]"
            style={{
              outline: "1px solid #CBCBCB",
            }}
          >

            {/* Bio Section */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Bio <span className="text-[#D3555A]">*</span>
              </p>

              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%]"
                style={{
                  outline: "1px solid #D6D6D6",
                }}
              >
                <textarea
                  value={formData?.aboutBio}
                  onChange={(e) => handleInput(e, "aboutBio")}


                  className="w-full outline-none p-2 text-sm"
                  placeholder="Enter About you"
                  rows="8" // Adjusts the height to ~200px (10 rows)
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
                  {languages.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="mt-2 mb-2" />


            {/* Profession */}
            <div className="flex flex-wrap justify-between gap-2 items-center mb-4">
              <p className="font-bold text-base">
                Current Profession <span style={{ color: "#D3555A" }}>*</span>
              </p>

              <strong>{formData?.profession}</strong>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "0.5rem",
                  outline: "1px solid #D6D6D6",
                }}
              >
                <select
                  name="profession"
                  className="mt-2 px-3 py-2"
                  value={formData?.profession}
                  onChange={(e) => handleInput(e, "profession")}
                  style={{
                    width: "100%",
                    outline: "none",
                    fontSize: "0.875rem",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <option value="">Your Profession</option>
                  <option value="Add Custom">Other</option>

                  <option value="Cash & Valuables In Transit (CVIT)">Cash & Valuables In Transit (CVIT)</option>
                  <option value="CCTV Operator">CCTV Operator</option>
                  <option value="Close Protection (CP)">Close Protection (CP)</option>
                  <option value="Concierge">Concierge</option>
                  <option value="Covid">Covid</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Dog Handling">Dog Handling</option>
                  <option value="Door Supervisor (DS)">Door Supervisor (DS)</option>
                  <option value="Drone Flyers">Drone Flyers</option>
                  <option value="Fire">Fire</option>
                  <option value="Key Holding (KH)">Key Holding (KH)</option>
                  <option value="Locksmith">Locksmith</option>
                  <option value="Patrol">Patrol</option>
                  <option value="Prison Officers">Prison Officers</option>
                  <option value="Private Detective">Private Detective</option>
                  <option value="Protection Dog Breeders">Protection Dog Breeders</option>
                  <option value="Protection Dog Trainers">Protection Dog Trainers</option>
                  <option value="Safe Installation">Safe Installation</option>
                  <option value="Security Gate Installation">Security Gate Installation</option>
                  <option value="Security Guard (SG)">Security Guard (SG)</option>
                  <option value="Sprinkler Installation">Sprinkler Installation</option>
                  <option value="Steward">Steward</option>
                  <option value="Surveillance Spy Equipment">Surveillance Spy Equipment</option>
                  <option value="Vehicle Immobilisation (VI)">Vehicle Immobilisation (VI)</option>
                  <option value="Bailiff">Bailiff</option>
                </select>

              </div>
              {formData?.profession === "Add Custom" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "0.5rem",
                    outline: "1px solid #D6D6D6",
                    marginTop: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    name="customProfession"
                    value={formData?.customProfession}
                    onChange={(e) => handleInput(e, "customProfession")}
                    style={{
                      width: "100%",
                      outline: "none",
                      padding: "0.5rem",
                      fontSize: "0.875rem",
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                    placeholder="Type your custom profession"
                  />
                </div>
              )}
            </div>


            <hr className="mt-2 mb-2" />

            <div className="p-2 mx-auto bg-gray-100 rounded-md ">

              {/* Input Fields for Adding Experience */}

              <div className="p-2 mx-auto bg-gray-100 rounded-md">
                <h1 className="text-2xl font-bold text-center mb-4">Add Experience</h1>

                {/* Input Fields for Adding Experience */}
                <div className="space-y-3">
                  <input
                    type="text"
                    name="company"
                    value={experienceInput?.company}
                    onChange={handleExperienceInput}
                    placeholder="Company Name"
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm"
                  />

                  <input
                    type="text"
                    name="role"
                    value={experienceInput?.role}
                    onChange={handleExperienceInput}
                    placeholder="Role"
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none text-sm"
                  />

                  <div className="flex flex-wrap gap-3">
                    <input
                      type="date"
                      name="startDate"
                      value={experienceInput?.startDate}
                      onChange={handleExperienceInput}
                      className="p-3 border border-gray-300 rounded-lg outline-none text-sm"
                    />

                    <input
                      type="date"
                      name="endDate"
                      value={experienceInput?.endDate}
                      onChange={handleExperienceInput}
                      className="p-3 border border-gray-300 rounded-lg outline-none text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addExperience}
                    className={`py-1 px-2 w-auto rounded-lg ${!experienceInput?.company ||
                      !experienceInput?.role ||
                      !experienceInput?.startDate ||
                      !experienceInput?.endDate
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#c5363c] text-white"
                      }`}
                    disabled={
                      !experienceInput?.company ||
                      !experienceInput?.role ||
                      !experienceInput?.startDate ||
                      !experienceInput?.endDate
                    }
                  >
                    + Add Experience
                  </button>
                </div>

                {/* Display Experiences */}
                {formData?.experiences?.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h2 className="text-xl font-semibold">Your Experiences:</h2>
                    {formData?.experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-3 bg-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{exp?.company}</p>
                          <p className="text-sm">{exp?.role}</p>
                          <p className="text-sm">
                            {exp?.startDate?.substring(0, 10)} -  {exp?.endDate?.substring(0, 10)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Display Experiences */}

            </div>
            <hr className="mt-2 mb-2" />


            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                My Expertise Skills <span className="text-[#D3555A]">*</span>
              </p>






            </div>

            {/* Skills */}
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
            {/* Display Skills */}
            {formData?.skills?.length > 0 && (
              <div className="space-y-2 mt-4">
                {formData?.skills.map((skill, index) => (
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
            )}




            <hr className="mt-2 mb-2" />

            <h1 className="text-2xl font-bold text-center mb-4">Additional Information</h1>


            {/* Visible Tattoo Section */}
            {/* <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Visible Tattoo <span className="text-[#D3555A]">*</span>
              </p>

              <div
                className="rounded-lg flex flex-col sm:flex-row items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{
                  outline: "1px solid #D6D6D6",
                }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="visibleTattoo"
                    value="yes"
                    checked={formData?.tattoo === "yes"}
                    onChange={(e) => handleInput(e, "visibleTattoo")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visibleTattoo"
                    value="no"
                    checked={formData?.visibleTattoo === "no"}
                    onChange={(e) => handleInput(e, "visibleTattoo")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div> */}

            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Do you hold full UK Driving License? <span className="text-[#D3555A]">*</span>
              </p>
              <div className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2" style={{ outline: "1px solid #D6D6D6" }}>
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="ukDrivingLicense"
                    value="yes"
                    checked={formData?.ukDrivingLicense === "yes"}
                    onChange={(e) => handleInput(e, "ukDrivingLicense")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ukDrivingLicense"
                    value="no"
                    checked={formData?.ukDrivingLicense === "no"}
                    onChange={(e) => handleInput(e, "ukDrivingLicense")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Paramedic training? <span className="text-[#D3555A]">*</span>
              </p>
              <div className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2" style={{ outline: "1px solid #D6D6D6" }}>
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="paramedicTraining"
                    value="yes"
                    checked={formData?.paramedicTraining === "yes"}
                    onChange={(e) => handleInput(e, "paramedicTraining")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paramedicTraining"
                    value="no"
                    checked={formData?.paramedicTraining === "no"}
                    onChange={(e) => handleInput(e, "paramedicTraining")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">How far are you willing to travel? (Miles)</p>
              <div className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2" style={{ outline: "1px solid #D6D6D6" }}>
                <input
                  type="text"
                  name="travelWill"
                  placeholder="Enter travel distance (In miles)"
                  className="w-full outline-none p-2 text-sm"
                  value={formData?.travelWill || ""}
                  onChange={(e) => handleInput(e, "travelWill")}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Any Health Issues? <span className="text-[#D3555A]">*</span>
              </p>
              <div className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2" style={{ outline: "1px solid #D6D6D6" }}>
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="healthIssue"
                    value="yes"
                    checked={formData.healthIssue === "yes"}
                    onChange={(e) => handleInput(e, "healthIssue")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="healthIssue"
                    value="no"
                    checked={formData?.healthIssue === "no"}
                    onChange={(e) => handleInput(e, "healthIssue")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Military Background? <span className="text-[#D3555A]">*</span>
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="millitaryBackground"
                    value="yes"
                    checked={formData?.millitaryBackground === "yes"}
                    onChange={(e) => handleInput(e, "millitaryBackground")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="millitaryBackground"
                    value="no"
                    checked={formData?.millitaryBackground === "no"}
                    onChange={(e) => handleInput(e, "millitaryBackground")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Do you have a Passport Driving License?{" "}
                {/* <span className="text-[#D3555A]">*</span> */}
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    isEditable
                    type="radio"
                    name="passportDrivingLicense"
                    value="yes"
                    checked={formData?.passportDrivingLicense === "yes"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        passportDrivingLicense: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="passportDrivingLicense"
                    value="no"
                    checked={formData?.passportDrivingLicense === "no"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        passportDrivingLicense: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>


            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Do you drive? <span className="text-[#D3555A]">*</span>
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="drive"
                    value="yes"
                    checked={formData?.drive === "yes"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        drive: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="drive"
                    value="no"
                    checked={formData?.drive === "no"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        drive: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>


            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Do you have rights to work in UK? <span className="text-[#D3555A]">*</span>
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="workPermit"
                    value="yes"
                    checked={formData?.workPermit === "yes"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workPermit: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="workPermit"
                    value="no"
                    checked={formData?.workPermit === "no"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        workPermit: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>


            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Do you have CSCS Card? <span className="text-[#D3555A]">*</span>
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="cscsCard"
                    value="yes"
                    checked={formData?.cscsCard === "yes"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cscsCard: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="cscsCard"
                    value="no"
                    checked={formData?.cscsCard === "no"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cscsCard: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>


            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Do you have SIA Badge? <span className="text-[#D3555A]">*</span>
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="siaBadge"
                    value="yes"
                    checked={formData?.siaBadge === "yes"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        siaBadge: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="siaBadge"
                    value="no"
                    checked={formData?.siaBadge === "no"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        siaBadge: e.target.value,
                      }))
                    }
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>










            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Any Ailments that could impair your ability to workk?{" "}
                <span className="text-[#D3555A]">*</span>
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="ailments"
                    value="yes"
                    checked={formData?.ailments === "yes"}
                    onChange={(e) => handleInput(e, "ailments")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="ailments"
                    value="no"
                    checked={formData?.ailments === "no"}
                    onChange={(e) => handleInput(e, "ailments")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>



            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Any piercing?{" "}
                {/* <span className="text-[#D3555A]">*</span> */}
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="piercing"
                    value="yes"
                    checked={formData?.piercing === "yes"}
                    onChange={(e) => handleInput(e, "piercing")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="piercing"
                    value="no"
                    checked={formData?.piercing === "no"}
                    onChange={(e) => handleInput(e, "piercing")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>


            <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                First Aid?{" "}
                {/* <span className="text-[#D3555A]">*</span> */}
              </p>
              <div
                className="rounded-lg flex items-center w-full bg-[#fff] sm:w-[40%] p-2"
                style={{ outline: "1px solid #D6D6D6" }}
              >
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="firstAid"
                    value="yes"
                    checked={formData?.firstAid === "yes"}
                    onChange={(e) => handleInput(e, "firstAid")}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="firstAid"
                    value="no"
                    checked={formData?.firstAid === "no"}
                    onChange={(e) => handleInput(e, "firstAid")}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex justify-center ">

              <button className="w-auto px-2 text-[#C5363C] rounded-lg bg-[#fff]" style={{
                outline: "1px solid #C5363C"
              }}>Submit details</button>
            </div>

          </div>



        </form>
      }




    </>
  );
};

export default UserPofile;

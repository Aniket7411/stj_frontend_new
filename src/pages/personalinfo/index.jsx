
import { useCallback, useEffect, useState } from "react";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";


import uploadImageOnCloudinary from "../../components/uploads/uploadImg";
import { Modal } from "@react-pdf-viewer/core";
import { languages   } from "../../utils/city";
import { useRef } from "react";
import MapSearch from "../../components/mapsearch";

const ukCities = [
  "Aberdeen",
  "Bath",
  "Belfast",
  "Birmingham",
  "Bradford",
  "Brighton",
  "Bristol",
  "Cambridge",
  "Canterbury",
  "Cardiff",
  "Carlisle",
  "Chelmsford",
  "Chester",
  "Chichester",
  "Coventry",
  "Derby",
  "Dundee",
  "Durham",
  "Edinburgh",
  "Exeter",
  "Glasgow",
  "Gloucester",
  "Hereford",
  "Inverness",
  "Kingston upon Hull",
  "Leeds",
  "Leicester",
  "Lincoln",
  "Liverpool",
  "London",
  "Luton",
  "Manchester",
  "Newcastle",
  "Newport",
  "Norwich",
  "Nottingham",
  "Oxford",
  "Peterborough",
  "Plymouth",
  "Portsmouth",
  "Preston",
  "Reading",
  "Ripon",
  "Salford",
  "Salisbury",
  "Sheffield",
  "Southampton",
  "St Albans",
  "Stoke-on-Trent",
  "Sunderland",
  "Swansea",
  "Truro",
  "Wakefield",
  "Wells",
  "Westminster",
  "Winchester",
  "Wolverhampton",
  "Worcester",
  "York"
];


const PersonalInfo = (props) => {

  const { employerGeneralInfo } = props

  console.log("props", props)
  const [skillInput, setSkillInput] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isImageLoading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [addressModal,setAddressModal]=useState(false);






  const [formData, setFormData] = useState({
    phoneNumber: "",
    dob: null,
    gender: "Male",
    nationality: "",
    address: "",
    postCode: "",
    townCity: "",
    state: "",
    latitude:0,
    longitude:0,
    profession: "",
    skills: [],
    experiences: [],
    profileImage: "",
    height: "",
    utrNumber: "",
    referralCode: "",
    profession: "",
    millitaryBackground: "",
    tattoo: "",
    siaBadge: "",
    ukDrivingLicense: "",
    paramedicTraining: "",
    ailments: "",
    passportDrivingLicense: "",
    cscsCard: "",
    piercing: "",
    drive: "",
    firstAid: "",
    workPermit: "",
    paypalEmail: "",
    referralCode: "",
    language: "English",
    coverImage: "",

  })


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


  const getCoverImageUrl = useCallback(async (e) => {
    setLoading(true);
    try {
      const url = await uploadImageOnCloudinary(e);
      setFormData((prevState) => ({
        ...prevState,
        coverImage: url,
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
      companyLogo: null,
    }));
    setLogoPreview(null);
  };





  const handleInput = (e, name) => {

    if(name==='phoneNumber'){
        if (e.target.value.length >= 1 && e.target.value[0] === '4') return;
        if (e.target.value.length >= 2 && e.target.value[1] === '4') return;
        setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
   // console.log(formData);

    //debugger;

    const personalInformationData = {
      personalInformation: {
        gender: formData.gender ? formData.gender : undefined,
        profession: formData.profession ? formData.profession : undefined,
        contactNumber: formData.phoneNumber !== "XXXXXXXXXXX" ? formData.phoneNumber : null,
        paypalEmail: formData.paypalEmail !== "NA" ? formData.paypalEmail : null,
        profileImage: formData.profileImage ? formData.profileImage : null,
        coverImage: formData.profileImage ? formData.coverImage : null,

        referralCode: formData.referralCode !== "NA" ? formData.referralCode : null,
        address: {
          town: formData?.townCity,
          city: formData?.townCity,
          state:formData?.state,
          address:formData?.address,
          latitude:formData?.latitude,
          longitude:formData?.longitude,
          postCode: formData?.postCode || 0,
          country: formData?.country
        },
        skills: formData.skills !== "NA" ? formData.skills : null,
        dob: formData.dob,
        nationality: formData.nationality !== "NA" ? formData.nationality : "",
        //address:formData.address!=="NA"?formData.address:{},
      },
      generalInformation: {
        experience: formData.experiences !== "NA" ? formData.experiences : null,
        millitaryBackground: formData.millitaryBackground !== "NA" ? formData.millitaryBackground : null,
        tattoo: formData.tattoo !== "NA" ? formData.tattoo : null,
        siaBadge: formData.siaBadge !== "NA" ? formData.siaBadge : null,
        ukDrivingLicense: formData.ukDrivingLicense !== "NA" ? formData.ukDrivingLicense : null,
        paramedicTraining: formData.paramedicTraining !== "NA" ? formData.paramedicTraining : null,
        ailments: formData.ailments !== "NA" ? formData.ailments : null,
        passportDrivingLicense: formData.passportDrivingLicense !== "NA" ? formData.passportDrivingLicense : null,
        cscsCard: formData.cscsCard !== "NA" ? formData.cscsCard : null,
        piercing: formData.piercing !== "NA" ? formData.piercing : null,
        drive: formData.drive !== "NA" ? formData.drive : null,
      },
    };

    console.log(personalInformationData)




    try {
      const response = await HttpClient.put("/user/profile/personal", personalInformationData);
      console.log(response);
      toast.success("Profile updated Successfully");
    } catch (error) {
      toast.error(error.message)
    }


  };



  //console.log("formData", formData);
  const getEmployeeDetails = async () => {
    setIsLoading(true)
    try {
      // debugger;
      const response = await HttpClient.get("/user/profile/");
      console.log(response)


      const formattedData = {
        phoneNumber: response?.user?.profile?.personalInformation?.contactNumber || "XXXXXXXXXXX",
        paypalEmail: response?.user?.profile?.personalInformation?.paypalEmail || "NA",
        profileImage: response?.user?.profile?.personalInformation?.profileImage || "http://res.cloudinary.com/defgskoxv/image/upload/v1742547982/STJ/gyhoorvz8efk2enug4u1.png",
        dob: response?.user?.profile?.personalInformation?.dob || "NA",
        gender: response?.user?.profile?.personalInformation?.gender || "NA",
        nationality: response?.user?.profile?.personalInformation?.nationality || "British",
        address: response?.user?.profile?.personalInformation?.address?.address || "NA",
        postCode: response?.user?.profile?.personalInformation?.address?.postCode || 0,
        townCity: response?.user?.profile?.personalInformation?.address?.city || "NA",
        country: response?.user?.profile?.personalInformation?.address?.country || "NA",
        state: response?.user?.profile?.personalInformation?.address?.state || "NA",
        latitude: response?.user?.profile?.personalInformation?.address?.latitude || 0,
        longitude: response?.user?.profile?.personalInformation?.address?.longitude || 0,
        profession: response?.user?.profile?.personalInformation?.profession || "NA",
        skills: response?.user?.profile?.personalInformation?.skills || "NA",
        experiences: response?.user?.profile?.generalInformation?.experience || "NA",
        profileImage: response?.user?.profile?.personalInformation?.profileImage || "NA",
        coverImage: response?.user?.profile?.personalInformation?.coverImage || "NA",
        height: response?.user?.profile?.generalInformation?.height || 0,
        utrNumber: response?.user?.profile?.generalInformation?.utrNumber || 0,
        referralCode: response?.user?.profile?.personalInformation?.referralCode || "NA",
        millitaryBackground: response?.user?.profile?.generalInformation?.millitaryBackground || "NA",
        tattoo: response?.user?.profile?.generalInformation?.tattoo || "NA",
        siaBadge: response?.user?.profile?.generalInformation?.siaBadge || "NA",
        ukDrivingLicense: response?.user?.profile?.generalInformation?.ukDrivingLicense || "NA",
        paramedicTraining: response?.user?.profile?.generalInformation?.paramedicTraining || "NA",
        ailments: response?.user?.profile?.generalInformation?.ailments || "NA",
        passportDrivingLicense: response?.user?.profile?.generalInformation?.passportDrivingLicense || "NA",
        cscsCard: response?.user?.profile?.generalInformation?.cscsCard || "NA",
        piercing: response?.user?.profile?.generalInformation?.piercing || "NA",
        drive: response?.user?.profile?.generalInformation?.drive || "NA",
        // ailments:response?.user?.profile?.generalInformation?.siaBadge||"NA",
        // drive: response?.user?.profile?.generalInformation?.siaBadge||"NA",
        // firstAid: response?.user?.profile?.generalInformation?.siaBadge||"NA",
        // workPermit: response?.user?.profile?.generalInformation?.siaBadge||"NA",
      }

      setFormData(formattedData);


      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching employer details:", error);
    }
  };



  useEffect(() => {
    getEmployeeDetails()
  }, [])


  const updatePassword = async () => {
    // console.log(currentPassword,newPassword)
    try {
      const response = await HttpClient.post("/user/updatePassword", {
        oldPassword: oldPassword, newPassword
      })

      if (response?.success === true) {
        toast.success(response?.message);
      }
      setModalIsOpen(false)
      console.log(response)
      getEmployeeDetails()
    } catch (error) {

    }
  }

  return (

    <>

      {
        isLoading ? <div className="flex items-center justify-center h-[100vh]"><ClipLoader size={50} color="#4ade80" /></div> : <form onSubmit={submitForm}>
          <div
            className="rounded-lg px-5 py-4 bg-[#f3f4f6]"
            style={{
              outline: "1px solid #CBCBCB",
            }}
          >

            <p className="font-bold text-base">
              Profile Image <span className="text-[#D3555A]">*</span>
            </p>

            <div className="flex flex-wrap  gap-4">
              <div className="flex flex-wrap items-center gap-4 ">
                <label className="relative inline-block cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={getImageUrl}
                  />
                  <div className="px-2 py-1 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition">
                    Upload Image
                  </div>
                </label>

                <div className="relative w-32 h-32 rounded-full">
                  <img
                    src={formData?.profileImage.length > 0 ? formData?.profileImage : logoPreview}
                    alt="Profile "
                    className="object-cover border rounded-lg w-full h-full shadow-md hover:shadow-lg transition"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, profileImage: "" }))} // Fix: Clear the image

                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-auto h-7 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                    aria-label="Remove Image"
                  >


                    Remove
                  </button>
                </div>

              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="relative inline-block cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={getCoverImageUrl}
                  />
                  <div className="px-2 py-1 border border-gray-300 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition">
                    Upload Cover Image
                  </div>
                </label>

                <div className="relative w-32 h-32  rounded-full   mt-4">
                  <img
                    src={formData?.coverImage.length > 0 ? formData?.coverImage : logoPreview}
                    alt="Cover Pic "
                    className="object-cover border rounded-lg w-full h-full shadow-md hover:shadow-lg transition"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, coverImage: "" }))} // Fix: Clear the image
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-auto h-7 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                    aria-label="Remove Image"
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>



            <hr className="mt-2 mb-2" />

            {/* Profession */}
            {/* <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Profession <span style={{ color: "#D3555A" }}>*</span>
              </p>
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
                  value={formData?.profession}
                  onChange={(e) => handleInput(e, "profession")}
                  style={{
                    width: "100%",
                    outline: "none",
                    padding: "0.5rem",
                    fontSize: "0.875rem",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <option value="">Select Profession</option>
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="React">React</option>
                  <option value="Add Custom">Add Custom</option>
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
            </div> */}




            {/* Contact Number Section */}
            <div className="flex flex-wrap justify-between items-center">
              <p className="font-bold text-base">
                Contact Number <span className="text-[#D3555A]">*</span>
              </p>

              <div className="flex items-center rounded-lg w-full bg-[#fff]  sm:w-[40%] border border-gray-300">
                {/* Country Code Dropdown */}


                <p className="bg-[#e1d2d2] text-sm p-1 rounded-md m-1">+44</p>
                {/* Vertical Line Separator */}
                <div className="h-8 w-[1px] bg-gray-300 mx-1"></div>
                {/* Contact Number Input */}
                <input
                  type="text" // Use "text" instead of "number" for better control
                  value={formData?.phoneNumber} // Ensure the key matches the state
                  name="phoneNumber"

                  placeholder="Enter Contact Number"
                  maxLength={11} // Limit input to 11 characters
                  className="flex-1 p-3 text-sm text-gray-800 outline-none"
                  onChange={(e) => {
                    handleInput(e, "phoneNumber")
                    // Allow only numeric values and limit to 11 digits
                    // debugger
                    // const value = e.target.value;
                    // if (/^\d*$/.test(value) && value.length <= 11) {
                    //  ;
                    // }
                  }}
                />




              </div>
            </div>


            <hr className="mt-2 mb-2" />
              <div className="flex flex-wrap justify-between items-center">
              <p className="font-bold text-base">
                Address <span className="text-[#D3555A]">*</span>
              </p>

             
                  
              {
                formData.address.length > 0 && addressModal===false? 
                  <>
                    <input

                      value={formData.address}
                      type="text"
                      required
                      name="address"
                      placeholder="Enter location"
                    className="flex-1 p-3 text-sm text-gray-800 outline-none"
                    />
                    <button 
                     onClick={()=>{
                      setAddressModal(true)
                    }} 
                    className="w-auto px-2 py-1 text-[#C5363C] rounded-lg bg-[#fff]" style={{
                outline: "1px solid #C5363C"}}
                    
                    
                    
                    >
                      Change address
                      </button>
                  </>
                  :
                  <>
                    <MapSearch setJobDetails={setFormData} type="employerProfile" />
                  </>
              }

            </div>

            {/* Paypal Section */}
            {/* <div className="flex flex-wrap justify-between items-center">
              <p className="font-bold text-base">
                Paypal email <span className="text-[#D3555A]">*</span>
              </p>

              <div className="flex items-center rounded-lg w-full bg-[#fff] sm:w-[40%] border border-gray-300">
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

            <hr className="mt-2 mb-2" /> */}






            {/* <hr className="mt-2 mb-2" /> */}

            {/* DOB Section */}
            {/* <div className="flex flex-wrap justify-between items-center mb-4">
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
                  value={formData.dob}
                  max={new Date().toISOString().split("T")[0]} // Sets max to today's date
                />

              </div>
            </div> */}

            {/* <hr className="mt-2 mb-2" /> */}

            {/* Gender */}
            {/* <div className="flex flex-wrap justify-between items-center mb-4">
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
                  value={formData.gender}
                  onChange={(e) => handleInput(e, "gender")} // Corrected to "gender"
                  className="w-full py-2 px-3 bg-white border border-[#D6D6D6] rounded-lg outline-none text-sm text-[#333]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Not To Say">Not To Say</option>
                </select>

              </div>
            </div> */}

            {/* <hr className="mt-2 mb-2" /> */}

            {/* Nationality Section */}
            {/* <div className="flex flex-wrap justify-between items-center mb-4">
              <p className="font-bold text-base">
                Nationality <span className="text-[#D3555A]">*</span>
              </p>

              <div
                className="rounded-lg flex items-center w-full bg-[#fff]  sm:w-[40%]"
                style={{
                  outline: "1px solid #D6D6D6",
                }}
              >
               
                <select
                  id="nationality"
                  name="nationality"
                  value={formData?.nationality}
                  onChange={(e) => handleInput(e, "nationality")}
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
            <hr className="border-gray-300 mt-4 mb-4" /> */}

            {/* <div>
              <p className="font-bold text-base">
                Address <span className="text-red-500 ml-1">*</span>
              </p>
              <textarea

                onChange={(e) => handleInput(e, "address")}
                name="address"
                className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="3"
                value={formData.address}
                placeholder="Enter your address"
              ></textarea>
            </div> */}

            {/* physical detail */}
            <div className="flex justify-between flex-wrap gap-4 mb-2">




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
                  value={formData.referralCode}


                />
              </div> */}
            </div>





            {/* Address */}
            <div className="flex justify-between flex-wrap gap-4">


              {/* Postcode */}
              <div>
                <p className="text-sm font-bold flex items-center">
                  Postcode <span className="text-red-500 ml-1">*</span>
                </p>
                <input
                  type="text" // Changed from "number" to "text" to allow alphanumeric input
                  name="postCode"
                  className="rounded-lg px-2 py-1 mt-1"
                  required
                  style={{ outline: "1px solid gray" }}
                  onChange={(e) => handleInput(e, "postCode")}

                  value={formData.postCode}
                />

              </div>

              {/* Town/City */}

              {/* <input
                  type="text"
                  onChange={(e) => handleInput(e, "townCity")}
                  value={formData?.townCity}


                  className="rounded-lg px-2 py-1 mt-1"
                  style={{ outline: "1px solid gray" }}
                /> */}
              <div>
                <p className="text-sm font-bold flex items-center">
                  Town/City <span className="text-red-500 ml-1">*</span>
                </p>

                <input
                  disabled
                  required
                  name="townCity"
                  className="w-full border border-gray-300 rounded-lg"
                  value={formData?.townCity}
                  style={{
                    height: '40px',
                    justifyContent:'center'
                  }}
                 // onChange={(e) => handleInput(e, "townCity")}
                >
                  {/* <option value="" disabled>
                    Select City
                  </option>
                  {ukCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))} */}
                </input>
              </div>


              {/* County */}
              <div>
                <p className="text-sm font-bold flex items-center">
                  State<span className="text-red-500 ml-1">*</span>
                </p>
                {/* <input
                  type="text"
                  value={"UK"}
                  className="rounded-lg mt-1 px-2 py-1"
                  style={{ outline: "1px solid gray" }}
                  onChange={(e) => handleInput(e, "country")}
                 // value={formData.country}


                /> */}
                <input
                  disabled
                  required
                  name="state"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={formData?.state}
                  style={{
                    height: '40px'
                  }}
                  onChange={(e) => handleInput(e, "country")}
                >
                  {/* <option value="" disabled>
                    Select County
                  </option>
                  {
                    ukCities.map((item) => (
                      <option value={item}>{item}</option>
                    ))
                  } */}
                </input>
              </div>
            </div>



            <div className="flex justify-center mt-3 ">

              <button className="w-auto px-2 py-1 text-[#C5363C] rounded-lg bg-[#fff]" style={{
                outline: "1px solid #C5363C"
              }}>Update details</button>
            </div>
          </div>




        </form>
      }




    </>
  );
};


export default PersonalInfo;

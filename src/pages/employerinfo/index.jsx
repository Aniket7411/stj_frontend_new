import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import PersonalInfo from "../personalinfo";
import Uploads from "../uploads";
import { Link } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import ClipLoader from "react-spinners/ClipLoader";
import Spinner from "../../components/loader";
import EmployerGeneralInfo from "../employergeneralinfo";


const name = JSON?.parse(localStorage.getItem("userData"))?.name




const EmployerInfo = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("/assets/profilebg.svg");
  const [profileImage, setProfileImage] = useState("/assets/profilepic.png");
  const [employerDetails, setEmployerDetails] = useState(null);
  

  const getEmployerDetails = async () => {
    //debugger;
    setIsLoading(true);
    try {
      const response = await HttpClient.get("/user/profile/");
      setEmployerDetails(response.user);
    } catch (error) {
      console.error("Error fetching employer details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployerDetails();
  }, []);

  // Render active tab
  const renderActiveTab = () => {
    switch (activeTab) {
      case "personalInfo":
        return <PersonalInfo  employerGeneralInfo={employerDetails}  />;
        case "genralInfo":
          return <EmployerGeneralInfo employerGeneralInfo={employerDetails} />;
      case "uploads":
        return <Uploads employerDetails={employerDetails} />;
      default:
        return <PersonalInfo />;
    }
  };


  


  console.log("namename",name)


  return (
    <div className="p-5">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#123abc" />
        </div>
      ) : (
        <>
          {/* Background Section */}
          <div
            style={{
              backgroundImage: `url(${employerDetails?.profile?.personalInformation?.coverImage || null})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "150px",
              borderRadius: "12px",
            }}
            className="relative shadow-md mt-10"
          >
            <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm cursor-pointer hover:shadow-md">
           
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex justify-between mt-4 gap-4">
            <div className="flex">
              <div className="relative">


              {employerDetails?.profile?.personalInformation?.profileImage && employerDetails.profile.personalInformation.profileImage !== "NA" ? (
  <img
    src={employerDetails.profile.personalInformation.profileImage}
    alt="Profile"
    className="h-[60px] rounded-full w-[60px] object-cover"
  />
) : (
  <div className="flex items-center justify-center h-12 w-12 bg-gray-300 rounded-full text-black font-bold">
  {JSON.parse(localStorage.getItem("userData"))?.name?.charAt(0).toUpperCase() || "A"}
</div>
)}


             
                <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm cursor-pointer hover:shadow-md">
             
                </div>
              </div>
              <div className="ml-5">
                <h3 className="md:text-xl text-lg font-bold">
                  {employerDetails?.name || "Default Name"}
                </h3>
                <p className="text-sm text-red-500 font-semibold">Employer</p>
              </div>
            </div>
            <div className="text-right">
            <Link
  to="/employerprofile"
  className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
>
  Go to Dashboard
</Link>

            </div>
          </div>

          {/* Tab Navigation */}
          <h2 className="font-bold mt-3">Edit Profile</h2>
          <div className="flex justify-between w-full sm:w-1/4 rounded-md">
            <h3
              onClick={() => setActiveTab("personalInfo")}
              className={`font-semibold cursor-pointer ${
                activeTab === "personalInfo" ? "text-blue-500" : "text-gray-700"
              }`}
            >
              Business Info
            </h3>
            <h3
              onClick={() => setActiveTab("genralInfo")}
              className={`font-semibold cursor-pointer ${
                activeTab === "genralInfo" ? "text-blue-500" : "text-gray-700"
              }`}
            >
              Genral Info
            </h3>

            <h3
              onClick={() => setActiveTab("uploads")}
              className={`font-semibold cursor-pointer ${
                activeTab === "uploads" ? "text-blue-500" : "text-gray-700"
              }`}
            >
              Uploads
            </h3>
          </div>
          <hr className="border-gray-300 mt-2 mb-3" />

          {/* Render Active Tab Content */}
          {renderActiveTab()}
        </>
      )}
    </div>
  );
};

export default EmployerInfo;

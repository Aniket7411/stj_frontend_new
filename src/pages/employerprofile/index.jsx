import { FaEdit } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";
import { IoFlagSharp } from "react-icons/io5";
import { IoLanguage } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { MdGroups } from "react-icons/md";
import DashboardProfile from "../dashboardprofile";
import Candidatedashboard from "../candidatedashboard/Candidatedash";
import ClipLoader from "react-spinners/ClipLoader";

import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HttpClient } from "../../server/client/http";
import ProfileContext from "../../profilecontext";
import MapView from "../../components/mapview";

// Marker Icon Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

  const userName = localStorage.getItem("name");
  const parsedName = JSON.parse(userName); // Parse the JSON string into an object
  const userData = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userData); // Parse the JSON string into an object
  console.log(parsedUserData, "pud");

  const name = parsedName?.role;
  const userGmail = parsedUserData?.email;
  const phoneNumber = parsedUserData?.phoneNumber;


function EmployerProfile() {
  const [range, setRange] = useState("10 miles"); // Default range
  const [searchTerm, setSearchTerm] = useState(""); // Search term for location
  const [position,setPosition] = useState([]); // Default coordinates
  const [activeTab, setActiveTab] = useState("dashboard"); // Default tab
  const [dashboardData, setdashboardData] = useState();
  const [employerDetails, setEmployerDetails] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { profile, loading, error } = useContext(ProfileContext);


  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const getDashboardData = async () => {
    setIsLoading(true)
    try {
      const response = await HttpClient.get(
        `/dashBoard/`
      );
      console.log("fffffffffffffffffff", response)


      setdashboardData(response?.userDashboard);
      setIsLoading(false)

    } catch (err) {
      toast.error(err?.message);
    }
  };

  const getEmployerDetails = async () => {
    setIsLoading(true)
    try {
      const response = await HttpClient.get("/user/profile/");
      setEmployerDetails(response.user);
      setPosition(response.nearbyJobs);

      console.log("employerDetailsresponseuser", employerDetails?.phoneNumber)



    } catch (error) {
      console.error("Error fetching employer details:", error);
    }
  };


  useEffect(() => {
    getEmployerDetails()
  }, [])


  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Candidatedashboard dashboardData={dashboardData} />;
      case "profile":
        return <DashboardProfile dashboardData={dashboardData}/>;

      default:
        return null;
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <>
      {
        isLoading ? <div className="h-screen flex justify-center items-center">   <ClipLoader size={50} color="#4ade80" /> </div> : <div className="p-4 md:p-10 space-y-5">
          {/* Page Title */}
          <h1 className="text-xl font-bold mb-2 mt-5 md:mt-3">Profile Info</h1>

          {/* Tabs Section */}
          <div className="flex flex-wrap items-center justify-between md:justify-start gap-3 md:gap-6  rounded-md">
            {["dashboard", "profile"].map((tab) => (
              <h3
                key={tab}
                className={`font-semibold text-gray-700 cursor-pointer hover:text-blue-500 ${activeTab === tab ? "text-blue-500" : ""
                  }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab === "dashboard" ? "My Dashboard" : "Profile"}
              </h3>
            ))}

            {/* Edit Icon */}
            <div className="ml-auto">
              <Link to="/employerinfo">
                <div className="flex bg-[#F5F5F5] px-2 py-1 rounded-lg">
                  <FaEdit className="text-gray-700 mr-1 h-5 w-5 cursor-pointer hover:text-blue-500" />
                  <p>Edit Profile</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-300" />

          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">


            {/* Profile Card */}
            <div className="sm:w-1/4 lg:w-1/3 bg-[#F6F6F6] flex flex-col p-6 rounded-xl shadow-md">

              <div className="flex flex-col items-center space-y-1">
                {/* Profile Image */}
                <p className="text-gray-600 text-center text-sm font-semibold">Company Name</p>
                <p className="text-lg font-medium text-gray-900">
                  {employerDetails?.companyName || "Not Provided"}
                </p>

                <img
                  src={profile?.profile?.personalInformation?.profileImage}
                  alt="profile-image"
                  className="w-[120px] h-[120px] rounded-full border-[4px] border-[#C5363C]"
                />
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold">{employerDetails?.name}</h3>
                  {/* <FaEdit /> */}
                </div>
                <p className="text-[#C5363C] font-semibold">
                  {employerDetails?.role
                    ? employerDetails.role.charAt(0).toUpperCase() + employerDetails.role.slice(1)
                    : "Role Not Provided"}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mt-3">
                <div className="flex items-center flex-wrap">
                  <IoIosMail className="text-lg" />
                  <p className="text-[13px] ml-2 ">{employerDetails?.email || "N/A"}</p>
                </div>


                <div className="flex items-center space-x-2">
                  <BsFillTelephoneFill />
                  <p>{employerDetails?.phoneNumber || "N/A"}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FaLocationDot />
                  <p>{employerDetails?.profile?.personalInformation?.address?.address} </p>
                </div>
              </div>

              {/* Bio Section */}
              <hr className="border-gray-300 my-4" />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <BiSolidUserDetail />
                  <p className="text-sm font-bold">Bio</p>
                </div>
                <p className="text-sm">
                  {employerDetails?.profile.generalInformation.bio || "N/A"}
                </p>
              </div>





              {/* Additional Info */}
              {[
                {
                  icon: IoFlagSharp,
                  label: "County",
                  value: employerDetails?.profile?.personalInformation?.address?.city || "N/A"
                },
                { icon: IoLanguage, label: "Language", value: "English" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="space-y-1">
                  <hr className="border-gray-300 my-4" />
                  <div className="flex items-center space-x-2">
                    <Icon />
                    <p className="text-sm font-bold">{label}</p>
                  </div>
                  <p>{value}</p>
                </div>
              ))}
            </div>

            {/* Render Active Tab */}
            <div className=" w-full">
              <div>{renderActiveTab()}</div>
            </div>
          </div>

          {/* Location Section */}
          <div
            className="p-4 border-2 rounded-lg"
            style={{ borderColor: "#00BFFF" }}
          >
            {/* Location Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-bold">📍 Location</p>
            </div>

            {/* Range Selector and Search */}
            {/* <div className="flex justify-between flex-wrap gap-2 items-center mb-4">
              <div>
                <label htmlFor="range" className="mr-2 font-medium">
                  Select range:
                </label>
                <select
                  id="range"
                  value={range}
                  onChange={handleRangeChange}
                  className="p-2 rounded-lg border shadow"
                >
                  {["10 miles", "20 miles", "50 miles"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Search Location"
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 rounded-lg border w-64 shadow"
              />
            </div> */}

            {/* Map Section */}
            <MapView position={position} role="employer"/>
            
          </div>
        </div>
      }


    </>
  );
}

export default EmployerProfile;

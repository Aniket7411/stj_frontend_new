import { useContext, useEffect, useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { CiLocationOn, CiStar, CiTwitter } from "react-icons/ci";
import { FaLinkedin, FaPhoneAlt, FaRegEdit, FaWhatsapp } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoIosMail, IoMdInformationCircleOutline, IoMdPerson } from "react-icons/io";
import { IoFlagSharp, IoLanguage } from "react-icons/io5";
import { MdArrowOutward, MdGroups } from "react-icons/md";
import { TbJewishStarFilled } from "react-icons/tb";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ProfileContext from "../../profilecontext";
import MapView from "../../components/mapview";
import { FiPlus } from "react-icons/fi";
import Infoicon from "../../components/common/infoicon";

const Userdashborad = () => {
  const [range, setRange] = useState("10 miles"); // Default range
  const [searchTerm, setSearchTerm] = useState(""); // Search term for location
  const [isLoading, setIsLoading] = useState(false);
  const [profiledata, setProfileData] = useState();
  const [dashboardData, setdashboardData] = useState();
  const [buyModal, setBuyModal] = useState(false);
  const [credits, setCredits] = useState('');
  const { profile, loading, error } = useContext(ProfileContext);
  const [position, setPosition] = useState([]);


  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const name = JSON.parse(localStorage.getItem("userData"))?.name
  const email = JSON.parse(localStorage.getItem("userData"))?.email

  const getProfileDetails = async () => {
    setIsLoading(true);
    try {
      //debugger
      const response = await HttpClient.get("/user/profile/");
      // Format the data after fetching

      setProfileData(response?.user)
      setPosition(response?.nearbyJobs)
      console.log("kjkjkjkjk", response?.user)




    } catch (err) {
      toast.error("There is some error");
    } finally {
      setIsLoading(false);
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await HttpClient.get(
        `/dashBoard/`
      );
      console.log("userData", response)

      setdashboardData(response?.userDashboard);

    } catch (err) {
      toast.error(err?.message);
    }
  };


  const handleBuyCredits = async () => {
    if (!credits || isNaN(credits) || credits <= 0) {
      toast.info('Please enter a valid number of credits.')
      return;
    }
    console.log(`Buying ${credits} credits`);
    // Here you can integrate API call to purchase credits
    try {
      const response = await HttpClient.post(`/stripe/create-checkout-session`, {
        product: 'credits',
        paidFor: 'credits',
        credits: credits
      });
      // debugger
      if (response.success === true || response.status === 200) {
        window.location.href = response.url
      }

    } catch (err) {

    }
    setCredits('');
    setBuyModal(false)
  };



  useEffect(() => {
    getProfileDetails();
    getDashboardData();
  }, []);



  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="lg:w-1/3">
          {/* Profile Card */}
          <div className="bg-[#F3F7FF] rounded-lg p-4">
            <div className="flex">
              <div className="flex items-center space-x-4">
                {profiledata?.profile?.personalInformation?.profileImage ? (
                  <img
                    src={profiledata?.profile?.personalInformation?.profileImage}
                    alt="profile"
                    className="w-[70px] h-[70px] rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full  text-blue-800 flex items-center justify-center font-semibold text-lg shadow-md">
                    {profiledata?.name
                      ? profiledata.name
                        .split(" ") // Split the full name by spaces
                        .map((n) => n[0]) // Extract the first letter of each part
                        .join(" ") // Join the initials with a space
                        .toUpperCase() // Convert to uppercase for consistency
                      : ""}
                  </div>
                )}

              </div>

              <div className="ml-3">
                <div className="flex items-center">
                  <h3 className="font-bold mr-2">{profiledata?.name}</h3>
                  {/* <FaRegEdit className="text-sm cursor-pointer" /> */}
                </div>
                <p className="text-blue-500 text-sm font-medium">
                  {profiledata?.role
                    ? profiledata.role.charAt(0).toUpperCase() + profiledata.role.slice(1)
                    : "Role not specified"}
                </p>

                {
                  profiledata?.status === "active" &&
                  <div className="flex bg-[#DCEFFF] mt-1 w-[120px] rounded-lg px-2 py-1 items-center">
                    <img
                      src="/assets/verified.png"
                      alt="verified"
                      className="mr-1"
                    />
                    <p className="text-[#324975] text-xs">
                      <strong>STJ</strong> verified
                    </p>
                  </div>
                }
              </div>
            </div>
            <div className="mt-3 space-y-2 text-[#505050] text-sm">
              <div className="flex items-center">
                <IoIosMail className="mr-2" />
                <p>{profiledata?.email}</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <p>{profiledata?.phoneNumber}</p>
              </div>
              <div className="flex items-center">
                <CiLocationOn className="mr-2" />
                <p>{profiledata?.profile?.personalInformation?.address?.address}, {profiledata?.profile?.personalInformation?.address?.country} </p>
              </div>
            </div>
            {/* <div className="flex justify-end space-x-4 mt-4">
              <a
                href={`https://web.whatsapp.com/send?phone=${profiledata?.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="bg-[#1faf38] text-white rounded-full w-6 h-6 p-1 cursor-pointer" />
              </a>
            </div> */}
          </div>

          {/* Bio Section */}
          <div className="bg-[#F3F7FF] rounded-lg mt-4 p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <BiSolidUserDetail />
                <p className="text-sm font-bold">Bio</p>
              </div>
              <p className="text-sm">
                {profiledata?.profile?.generalInformation?.bio || "N/A"}
              </p>

            </div>
            {
              [
                { icon: IoFlagSharp, label: "County", value: profiledata?.profile?.personalInformation?.address?.country },
                { icon: IoFlagSharp, label: "Nationality", value: profiledata?.profile?.personalInformation?.nationality },
                { icon: IoLanguage, label: "Language", value: profiledata?.profile?.generalInformation?.language },
                {
                  icon: ImProfile,
                  label: "Profession",
                  value: profiledata?.profile?.personalInformation?.profession || "N/A",
                },
                {
                  icon: ImProfile,
                  label: "Paypal Email",
                  value: profiledata?.profile?.personalInformation?.paypalEmail || "N/A",
                },
                { icon: IoMdPerson, label: "Height", value: `${profiledata?.profile?.generalInformation?.height} cm` },
                { icon: IoMdPerson, label: "Build", value: profiledata?.profile?.generalInformation?.build },
                { icon: IoMdPerson, label: "UTR Number", value: profiledata?.profile?.generalInformation?.utrNumber },
                { icon: IoMdPerson, label: "UK Driving License", value: profiledata?.profile?.generalInformation?.ukDrivingLicense === "yes" ? "Available" : "Not Available" },
                { icon: IoMdPerson, label: "Paramedic Training", value: profiledata?.profile?.generalInformation?.paramedicTraining === "yes" ? "Completed" : "Not Completed" },
                { icon: IoMdPerson, label: "Drive", value: profiledata?.profile?.generalInformation?.drive === "yes" ? "Can Drive" : "Cannot Drive" },
                { icon: IoMdPerson, label: "First Aid", value: profiledata?.profile?.generalInformation?.firstAid === "yes" ? "Certified" : "Not Certified" },
                { icon: IoMdPerson, label: "Tattoo", value: profiledata?.profile?.generalInformation?.tattoo === "yes" ? "Has Tattoos" : "No Tattoos" },
                { icon: IoMdPerson, label: "SIA Badge", value: profiledata?.profile?.generalInformation?.siaBadge === "yes" ? "Available" : "Not Available" },
                { icon: IoMdPerson, label: "Work Permit", value: profiledata?.profile?.generalInformation?.workPermit === "yes" ? "Valid" : "Not Valid" },
                { icon: IoMdPerson, label: "CSCS", value: profiledata?.profile?.generalInformation?.cscs === "yes" ? "Certified" : "Not Certified" },
                // { icon: IoMdPerson, label: "Passport/Driving License", value: profiledata?.profile?.generalInformation?.passportDrivingLicense === "yes" ? "Available" : "Not Available" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="space-y-2">
                  <hr className="border-gray-300 my-2" />
                  <div className="flex items-center space-x-2">
                    <Icon />
                    <p className="text-sm font-bold">{label}</p>
                  </div>
                  <p className="text-sm">{value}</p>
                </div>
              ))
            }

          </div>
        </div>


        {/* Right Section */}
        <div className="lg:w-2/3">




          {/* <div
            className="w-full p-4 rounded-lg"
            style={{ outline: "1px solid #E0E0E0" }}
          >
            <div className="flex justify-between items-center mb-3">
              <strong>Upcoming Events</strong>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-1 text-sm rounded shadow"
              >
                View All
              </button>
            </div>
            <p className="text-[#505050] text-xs mb-3">12 July, 2024</p>
            {[...Array(2)].map((_, idx) => (
              <div
                key={idx}
                className="bg-[#F0FEFF] p-4 border-l-4 mb-4 rounded-md"
                style={{ borderLeftColor: "#2AA9A9" }}
              >
                <div className="flex justify-between mb-1">
                  <strong className="text-sm lg:text-base">
                    Operating System Security
                  </strong>
                  <p className="text-[#505050] font-bold">Course</p>
                </div>
                <p className="text-[#252323] text-xs mb-2">
                  05:00 PM - 07:00 PM
                </p>
                <div className="flex items-center text-xs">
                  <TbJewishStarFilled className="text-[#FFCE31] mr-1" />
                  <p className="mr-3">4.6/5</p>
                  <p className="text-[#787878] mr-1">76 hours</p>
                  <span className="text-[#787878]">•</span>
                  <p className="text-[#787878] ml-1">66 days</p>
                </div>
              </div>
            ))}
          </div> */}



          <div
            className="w-full p-4 rounded-lg mt-2"
            style={{ outline: "1px solid #E0E0E0" }}
          >




            <strong className="mb-2">Basic Information</strong>
            <div className="flex justify-between flex-wrap">
              <div className="w-full md:w-[45%] mb-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-800 mr-2">Credits</h3>
                      </div>
                      {/* <Infoicon information="number of credits you have apply for job."/> */}
                      <img
                        src="/assets/mail.png"
                        alt="Credits icon"
                        className="w-8 h-8 object-contain opacity-90"
                      />
                    </div>

                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Available Credits</p>
                          <h2 className="text-3xl font-bold text-gray-800">
                            {dashboardData?.credits || 0}
                          </h2>
                        </div>
                        <button
                          onClick={() => setBuyModal(true)}
                          className="bg-blue-600   hover:bg-blue-700 text-white w-auto px-2 py-1 rounded-lg 
                      shadow-md hover:shadow-lg transition-all duration-200
                      flex items-center"
                        >
                          <span>Buy Credits</span>
                        </button>
                      </div>
                    </div>

                    {/* Uncomment if you want to show percentage change */}
                    {/* <div className="flex items-center mt-4">
        <div className="bg-green-100 p-1 rounded-full mr-2">
          <MdArrowOutward className="text-green-600 w-5 h-5" />
        </div>
        <p className="text-sm text-green-600 font-medium">35.67% from last month</p>
      </div> */}
                  </div>
                </div>
              </div>

              {/* Active Jobs Card */}
              <div className="w-full md:w-[45%] mb-4">
                <Link to="/approvedjobs/active" className="block">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 p-5 h-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-800 mr-2">Active Jobs</h3>
                        <Infoicon information="Number of jobs you are doing currently" />
                      </div>
                      <img
                        src="/assets/ajobs.png"
                        alt="Active jobs icon"
                        className="w-8 h-8 object-contain opacity-90"
                      />
                    </div>
                    <div className="mt-4">
                      <h2 className="text-3xl font-bold text-gray-800">
                        {dashboardData?.activeJobs || 0}
                      </h2>
                      <p className="text-sm text-blue-600 mt-2 hover:underline">View all active jobs →</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Job Invites Card */}
              <div className="w-full md:w-[45%] mb-4">
                <Link to="/invited_jobs" className="block">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 p-5 h-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-800 mr-2">Job Invites</h3>
                        <Infoicon information="number of job invites recieved from employers/companies" />
                      </div>
                      <img
                        src="/assets/ajobs.png"
                        alt="Job invites icon"
                        className="w-8 h-8 object-contain opacity-90"
                      />
                    </div>
                    <div className="mt-4">
                      <h2 className="text-3xl font-bold text-gray-800">
                        {dashboardData?.jobInvites || 0}
                      </h2>
                      <p className="text-sm text-purple-600 mt-2 hover:underline">View all job invites →</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Completed Jobs Card */}
              <div className="w-full md:w-[45%] mb-4">
                <Link to="/approvedjobs/completed" className="block">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200 p-5 h-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-800 mr-2">Completed Jobs</h3>
                        <Infoicon information="Number of jobs you completed based on job end date" />
                      </div>
                      <img
                        src="/assets/suitcase.png"
                        alt="Completed jobs icon"
                        className="w-8 h-8 object-contain opacity-90"
                      />
                    </div>
                    <div className="mt-4">
                      <h2 className="text-3xl font-bold text-gray-800">
                        {dashboardData?.completedJobs || 0}
                      </h2>
                      <p className="text-sm text-green-600 mt-2 hover:underline">View all completed jobs →</p>
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>

          <div className="flex mt-3 justify-between flex-wrap gap-4">
            {/* Ongoing Bids */}
            <div className="p-4 rounded-lg shadow-lg bg-white border border-gray-200 flex-grow sm:flex-grow-0 sm:w-[30%] min-h-[145px]">
              <Link to="/approvedjobs/applied" className="block">

                <div className="flex justify-between items-center mb-2">
                  <p className="text-[#09A332] font-medium">Ongoing Bids</p>
                  <Infoicon information="Number of jobs you have applied for whose status is pending" />
                  <img src="/assets/exportmoney.png" alt="exportmoney" />
                </div>
              </Link>

              <h1 className="font-bold text-2xl text-gray-800">{dashboardData?.bids?.ongoingBids}</h1>
            </div>

            {/* Lost Bids */}
            <div className="p-4 rounded-lg shadow-lg bg-white border border-gray-200 flex-grow sm:flex-grow-0 sm:w-[30%] min-h-[145px]">


                <div className="flex justify-between items-center mb-2">
                  <p className="text-[#C5363C] font-medium">Lost Bids</p>
                  <Infoicon information="Number of jobs you have applied for whose status is rejected" />
                  <img src="/assets/auction.png" alt="auction" />
                </div>

              <h1 className="font-bold text-2xl text-gray-800">{dashboardData?.bids?.lostBids}</h1>
            </div>

            {/* Winning Bids */}
            <div className="p-4 rounded-lg shadow-lg bg-white border border-gray-200 flex-grow sm:flex-grow-0 sm:w-[30%] min-h-[145px]">
             
                           <Link to="/approvedjobs/active" className="block">

              <div className="flex justify-between items-center mb-2">
                <p className="text-[#C86315] font-medium">Winning Bids</p>
                <Infoicon information="Number of jobs you have applied for whose status is accepted" />
                <img src="/assets/wincup.png" alt="mail" />
              </div>

                            </Link>

              <h1 className="font-bold text-2xl text-gray-800">{dashboardData?.bids?.winnigBids}</h1>
            </div>
          </div>

          <div className="space-y-4 mt-2">
            {profiledata?.profile?.generalInformation?.experience?.length > 0 ? (
              profiledata.profile.generalInformation.experience.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <h3 className="text-lg font-bold  text-blue-700">
                    Experience {index + 1}
                  </h3>
                  <div className="mt-1">
                    <p className="text-sm">
                      <span className="font-semibold">Company Name:</span>{" "}
                      {item.company || "XXX"}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Start Date:</span>{" "}
                      {new Date(item.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">End Date:</span>{" "}
                      {item.currentlyWorking
                        ? "Currently Working"
                        : new Date(item.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Status:</span>{" "}
                      {item.currentlyWorking ? "Working" : "Worked"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-500">No experience details available</p>
              </div>
            )}
          </div>
          <MapView position={position} />

        </div>
      </div>

      {
        buyModal &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Buy Credits</h2>
            <input
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Enter number of credits"
              min="1"
            />
            <button
              onClick={handleBuyCredits}
              className="w-full bg-blue-600 w-auto hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Buy Credits
            </button>
            <button
              onClick={() => setBuyModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      }

    </>
  );
};

export default Userdashborad;
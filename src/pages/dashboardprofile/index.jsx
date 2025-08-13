
import { FaEuroSign } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMdBriefcase } from "react-icons/io";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";


const DashboardProfile = ({dashboardData}) => (
  
  <div
    className="p-4 rounded-sm"
    style={{
      outline: "1px solid black ",
    }}
  >
    {/* <div
      className="rounded-sm w-[100%] "
      style={{
        outline: "1px solid black", // Adds a 1px solid black outline
      }}
    >
      <div
        style={{
          backgroundImage: 'url("/assets/creditbg.svg")', // Use single quotes or a template literal
          backgroundSize: "cover", // Ensure the background image covers the div
          backgroundPosition: "center", // Center the image
          padding: "20px", // Add padding to the content
          height: "200px",
        }}
      >
        <h1>Your Total Credit</h1>
        <div className="flex justify-between">
          <div className="flex items-center">
            <FaEuroSign /> <h1>0</h1>
          </div>
          <button
            className="bg-[#000] w-[250px] px-3 py-1 text-[#fff]"
            type="button"
          >
            Buy more credits
          </button>
        </div>
      </div>
    </div> */}
    {/* <div className="flex items-center space-x-2 mt-3"> */}
      {/* Icon Section */}
      {/* <div className="text-2xl">
        <IoMdBriefcase />
      </div> */}
      {/* Text Section */}
      {/* <h3 className="font-bold mt-1">Profile Stats/Referral</h3> */}
    {/* </div> */}

    {/* <div className="flex justify-between flex-wrap p-5">
      <div
        className="w-[100%] md:w-[40%] mb-3 lg:mb-0 rounded-lg p-3"
        style={{
          outline: "1px solid grey",
        }}
      >
        <div className="flex justify-between items-center">
          <p>Referral Code</p>
          <div className="flex">
            <FaShareAlt className="bg-slate-200 p-1 w-[25px] h-[25px] rounded-full mr-3" />
            <FaRegCopy className="bg-slate-200 p-1 w-[25px] h-[25px] rounded-full" />
          </div>
        </div>
        <h1 className="text-center mt-5">ddd</h1>
        <p className="text-center">
          Share referral code with your friends and get free discount vouchers.
        </p>
      </div>
      <div
        className="w-[100%] md:w-[40%] rounded-lg p-3"
        style={{
          outline: "1px solid grey",
        }}
      >
        <div className="flex justify-between items-center">
          <p>Profie Completed</p>

          <Link to="/employerinfo">
          <p className="underline text-[#6969ea] underline">Edit Profile</p>
          </Link>
            
        </div>
        <h1 className="text-center mt-5">H5T26IL</h1>
        <p className="text-center">
          Share referral code with your friends and get free discount vouchers.
        </p>
      </div>
    </div> */}


    {/* Account details */}

    {/* <div className="flex items-center space-x-2">
      <div className="text-2xl">
        <RiAccountCircleFill />
      </div>
      <h3 className="font-bold mt-1">Account details</h3>
    </div> */}

 

    <div className="flex justify-between items-center">
      <h1 className="font-thin text-lg mg:text-2xl">Job Created</h1>
      <div className="flex items-center">
        <Link
          to="/createdjob/alljobs"
          className="flex items-center hover:opacity-80 transition-all duration-300"
        >
          <p className="mr-3 text-2xl font-bold text-gray-800  md:text-2xl">{dashboardData?.jobCreated}</p>
          <div
            className="p-3 rounded-full flex items-center justify-center"
            style={{
              outline: "1px solid grey",
            }}
          >
            <GoArrowUpRight className="text-2xl text-gray-800 hover:text-blue-500 transition-all duration-300" />
          </div>
        </Link>
      </div>
    </div>
    <hr className="border-gray-300  mt-2 mb-2" />

    <div className="flex justify-between items-center">
      <h1 className="font-thin text-lg mg:text-2xl">Active Jobs</h1>
      <div className="flex items-center">
        <Link
         to="/createdjob/activejobs"
          className="flex items-center hover:opacity-80 transition-all duration-300"
        >
          <p className="mr-3  font-bold text-gray-800 text-lg md:text-2xl">{dashboardData?.activeJobs||0}</p>
          <div
            className="p-3 rounded-full flex items-center justify-center"
            style={{
              outline: "1px solid grey",
            }}
          >
            <GoArrowUpRight className="text-2xl text-gray-800 hover:text-blue-500 transition-all duration-300" />
          </div>
        </Link>
      </div>
    </div>
    <hr className="border-gray-300  mt-2 mb-2" />

  
    <div className="flex justify-between items-center">
      <h1 className="font-thin text-lg mg:text-2xl">Completed Jobs</h1>
      <div className="flex items-center">
        <Link
         to="/createdjob/completedjobs"
          className="flex items-center hover:opacity-80 transition-all duration-300"
        >
          <p className="mr-3  font-bold text-gray-800 text-lg md:text-2xl">{dashboardData?.completedJobs || 0}</p>
          <div
            className="p-3 rounded-full flex items-center justify-center"
            style={{
              outline: "1px solid grey",
            }}
          >
            <GoArrowUpRight className="text-2xl text-gray-800 hover:text-blue-500 transition-all duration-300" />
          </div>
        </Link>
      </div>
    </div>
    <hr className="border-gray-300 mt-2 mb-2 " />
    {/* <div className="flex justify-between items-center">
      <h1 className="font-thin text-lg mg:text-2xl">Reviews</h1>
      <div className="flex items-center">
        <p className="mr-3 text-lg md:text-2xl">00</p>
        <div
          className="p-3 rounded-full"
          style={{
            outline: "1px solid grey",
          }}
        >
          <GoArrowUpRight className="text-2xl" />
        </div>
      </div>
    </div> */}
    <hr className="border-gray-300 mt-2 " />
  </div>
);

export default DashboardProfile;

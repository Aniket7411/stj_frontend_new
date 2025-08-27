

import { FaShareAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosBriefcase, IoMdBriefcase } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { MdArrowOutward, MdDoNotDisturbOnTotalSilence, MdOutlinePayments } from "react-icons/md";
import { ImHammer2 } from "react-icons/im";
import { TfiCup } from "react-icons/tfi";
import { CiBank } from "react-icons/ci";
import { MdPaid } from "react-icons/md";
import { Link } from "react-router-dom";
import Infoicon from "../../components/common/infoicon";









const Candidatedashboard = ({ dashboardData }) => (
  <div
    className="p-4 rounded-sm w-full"
    style={{
      outline: "1px solid black ",
    }}
  >
    <div className="flex items-center space-x-2 mb-2 ">
      {/* Icon Section */}
      <div className="text-2xl">
        <IoMdBriefcase />
      </div>
      {/* Text Section */}
      <h3 className="font-bold mt-1">Jobs stats</h3>
    </div>

    <div className="flex justify-between flex-wrap">


      <Link
        to="/requests"
        className="block w-full md:w-[45%] mb-4 rounded-lg p-4 transition-all duration-200
                border border-gray-200 hover:border-blue-400 hover:shadow-md
                bg-white hover:bg-blue-50 group"
        aria-label={`${dashboardData?.jobInvites} job invites - navigate to requests`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-700 group-hover:text-blue-600">
            <p className="mr-2 font-medium">Invited for Jobs</p>
            <Infoicon information="number of invites you created"/>
          </div>
          <img
            src="/assets/mail.png"
            alt="Mail icon"
            className="w-8 h-8 object-contain"
          />
        </div>

        <h1 className="text-left mt-4 text-2xl font-bold text-gray-800 group-hover:text-blue-700">
          {dashboardData?.jobInvites || 0}
        </h1>

        <div className="mt-2 text-sm text-gray-500 group-hover:text-blue-500">
          View all invitations
        </div>
      </Link>

      <Link
        to="/createdjob/activejobs"
        className="block w-full md:w-[45%] mb-4 rounded-lg p-4 transition-all duration-200
                border border-gray-200 hover:border-blue-400 hover:shadow-md
                bg-white hover:bg-blue-50 group"
        aria-label={`${dashboardData?.activeJobs || 0} active jobs - navigate to active jobs`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-700 group-hover:text-blue-600">
            <p className="mr-2 font-medium">Active Jobs</p>
            <Infoicon information="Number of jobs which are not started till now "/>
          </div>
          <img
            src="/assets/ajobs.png"
            alt="Active jobs icon"
            className="w-8 h-8 object-contain"
          />
        </div>

        <h1 className="text-left mt-4 text-2xl font-bold text-gray-800 group-hover:text-blue-700">
          {dashboardData?.activeJobs || 0}
        </h1>

        <div className="mt-2 text-sm text-gray-500 group-hover:text-blue-500">
          View all active jobs
        </div>
      </Link>

      <Link
        to="/createdjob/completedjobs"
        className="block w-full md:w-[45%] mb-4 lg:mb-0 rounded-lg p-4 transition-all duration-200
                border border-gray-200 hover:border-green-400 hover:shadow-md
                bg-white hover:bg-green-50 group"
        aria-label={`${dashboardData?.completedJobs || 0} completed jobs - navigate to completed jobs`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-700 group-hover:text-green-600">
            <p className="mr-2 font-medium">Completed Jobs</p>
            <MdArrowOutward size={20} className="text-green-500" />
            <Infoicon information="Number of jobs whose job start date is exceeded conveying either the employee was hired or status remained pending"/>
          </div>
          <img
            src="/assets/suitcase.png"
            alt="Completed jobs icon"
            className="w-8 h-8 object-contain"
          />
        </div>

        <h1 className="text-left mt-4 text-2xl font-bold text-gray-800 group-hover:text-green-700">
          {dashboardData?.completedJobs || 0}
        </h1>

        <div className="mt-2 text-sm text-gray-500 group-hover:text-green-500">
          View all completed jobs
        </div>
      </Link>


      <Link
        to="/createdjob/alljobs"
        className="block w-full md:w-[45%] mb-4 lg:mb-0 rounded-lg p-4 transition-all duration-200
                border border-gray-200 hover:border-purple-400 hover:shadow-md
                bg-white hover:bg-purple-50 group"
        aria-label={`${dashboardData?.jobCreated || 0} jobs created - navigate to all jobs`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-700 group-hover:text-purple-600">
            <p className="mr-2 font-medium">Jobs Created</p>
            <Infoicon information="Number of jobs post created by employer "/>
          </div>
          <img
            src="/assets/edit.png"
            alt="Jobs created icon"
            className="w-8 h-8 object-contain"
          />
        </div>

        <h1 className="text-left mt-4 text-2xl font-bold text-gray-800 group-hover:text-purple-700">
          {dashboardData?.jobCreated || 0}
        </h1>

        <div className="mt-2 text-sm text-gray-500 group-hover:text-purple-500">
          View all created jobs
        </div>
      </Link>

      {/*  */}
    </div>
    <div className="flex items-center space-x-2 mb-2 ">
      {/* Icon Section */}
      <div className="text-2xl">
        <IoMdBriefcase />
      </div>
      {/* Text Section */}
      <h3 className="font-bold mt-2 mb-2">Profile Stats/Referral</h3>
    </div>

    <div className="flex justify-between flex-wrap mt-2">
      {/* <div
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
        <h1 className="text-center mt-5">H5T26IL</h1>
        <p className="text-center">
          Share referral code with your friends and get free discount vouchers.
        </p>
      </div> */}
      <div
        className="w-[100%] md:w-[40%] flex flex-col items-center rounded-lg p-3"
        style={{
          outline: "1px solid grey",
        }}
      >
        <div className="flex justify-between w-[100%]  items-center">
          <p>Profie Completion</p>

          <Link to="/employerinfo">

            <p className="text-[#42a2e2] underline">Edit Profile</p>

          </Link>


        </div>
        <div className="relative w-28 h-28 mt-4 mx-auto text-center">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle */}
            <circle
              className="text-gray-200 stroke-current"
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              strokeWidth="3"
            />
            {/* Animated progress circle */}
            <circle
              className="text-blue-500 stroke-current transition-all duration-500 ease-out"
              cx="18"
              cy="18"
              r="15.9155"
              fill="none"
              strokeWidth="3"
              strokeDasharray="100, 100"
              strokeDashoffset={`${100 - (dashboardData?.profileCompleted || 0)}`}
              strokeLinecap="round"
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-xl font-semibold text-gray-800">
            <span>{dashboardData?.profileCompleted || 0}%</span>
            <span className="text-sm text-gray-500">Completed</span>
          </div>

        </div>

      </div>
    </div>

    {/* <div className="flex items-center space-x-2 mt-2">
      <div className="text-2xl">
        <RiAccountCircleFill />
      </div>
      <h3 className="font-bold mt-1">Bids</h3>
    </div> */}
    {/* 
    <div className="flex mt-3 justify-between flex-wrap gap-4">
      <div className="p-4 rounded-lg shadow-lg bg-white border border-gray-200 flex-grow sm:flex-grow-0 sm:w-[30%]">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[#09A332] font-medium">Ongoing Bids</p>
          <img src="/assets/exportmoney.png" alt="exportmoney" />
        </div>
        <h1 className="font-bold text-2xl text-gray-800">{dashboardData?.bids?.ongoingBids}</h1>
      </div>

      <div className="p-4 rounded-lg shadow-lg bg-white border border-gray-200 flex-grow sm:flex-grow-0 sm:w-[30%]">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[#C5363C] font-medium">Lost Bids</p>
          <img src="/assets/auction.png" alt="auction" />
        </div>
        <h1 className="font-bold text-2xl text-gray-800">{dashboardData?.bids?.lostBids}</h1>
      </div>

      <div className="p-4 rounded-lg shadow-lg bg-white border border-gray-200 flex-grow sm:flex-grow-0 sm:w-[30%]">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[#C86315] font-medium">Winning Bids</p>
          <img src="/assets/wincup.png" alt="mail" />
        </div>
        <h1 className="font-bold text-2xl text-gray-800">{dashboardData?.bids?.winningBids}</h1>
      </div>
    </div> */}

    <hr className="border-gray-300  mt-2 mb-2" />


    {/* <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold">
          <img src="/assets/pendingpay.png" alt="pendingpay" />
        </div>
        <h3 className="font-bold mt-1">Pending Payments</h3>
      </div>
      <p>0.00</p>
    </div>
    <hr className="border-gray-300 mt-2 mb-2" /> */}
    {/* 
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold">
          <img src="/assets/paytime1.png" alt="paytime" />
        </div>
        <h3 className="font-bold text-sm mt-1">Paid this month</h3>
      </div>
      <p>0.00</p>
    </div>
    <hr className="border-gray-300 mt-2 mb-2" /> */}

    {/* <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold">
          <img src="/assets/totalpay.png" alt="totalpay" />
        </div>
        <h3 className="font-bold text-sm mt-1">Total pay</h3>
      </div>
      <p>0.00</p>
    </div>
    <hr className="border-gray-300 mt-2 mb-2" /> */}

    {/* <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold">
          <img src="/assets/credit.png" alt="credit" />
        </div>
        <h3 className="font-bold text-sm  mt-1">Credits</h3>
      </div>
      <p>0.00</p>
    </div>
    <hr className="border-gray-300 mt-2 mb-2" /> */}
  </div >
);



export default Candidatedashboard
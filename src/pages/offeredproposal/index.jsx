import { AiOutlineSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CiBookmark, CiClock1, CiLocationOn, CiShare2 } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { FaBookOpenReader, FaMoneyBillWave } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoIosAlert } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { TbJewishStarFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const OfferedProposal = () => {
  return (
    <div>
      <div>
        <div
          className="mt-10 md:mt-0 p-5  md:p-10 rounded-md"
        >
          <Link to="/findjobs">
            <FaArrowLeft className="mt-4" />
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#976063] font-bold">Amazon</p>
              <h2 className="font-futura text-xl md:text-2xl">
                Information Security Specialist
              </h2>
            </div>
            <div className="flex mb-4">
              <CiBookmark className="bg-[#E6E6E6] w-[30px] h-[30px] rounded-md px-1 mr-2" />
              <CiShare2 className="bg-[#E6E6E6] w-[30px] h-[30px] rounded-md px-1" />
            </div>
          </div>
          <p className="mb-1">
            <strong>Posted: </strong> 20 May, 2024
          </p>
          <div className="flex items-center text-[#976063] font-bold mb-2">
            <CiLocationOn className="mr-2" />
            <p>Bristol, USA, 745485</p>
          </div>

          <div className="flex flex-wrap gap-2 text-[#505050] mb-4">
            <p className="bg-[#F0F0F0] w-fit mb-3 rounded-md px-2 py-1">
              <strong>$250: </strong> Fixed price
            </p>
            <p className="bg-[#EBF6FF] rounded-md px-2 py-1">Mon - Fri</p>
            <p className="bg-[#EBF6FF] rounded-md px-2 py-1">
              2 - 3 yrs exp. required
            </p>
          </div>

          <div>
            <div className="flex justify-between flex-wrap p-3">
              <div className="flex items-center">
                <MdCalendarMonth className="mr-2" />
                <p className="text-[#505050] font-semibold">6 Months</p>
              </div>

              <div className="flex items-center">
                <CiClock1 className="mr-2" />
                <p className="text-[#505050] font-semibold"> 30+ hrs/week</p>
              </div>

              <div className="flex items-center">
                <IoIosAlert className="mr-2" />
                <p className="text-[#505050] font-semibold">Intermediate</p>
              </div>

              <div className="flex items-center">
                <FaMoneyBillWave className="mr-2" />
                <p className="text-[#505050] font-semibold">
                  $250 <br />
                  <span className="font-normal text-[#787878] text-[12px]">
                    Fixed price
                  </span>
                </p>
              </div>
            </div>
            <hr className="border-gray-300 my-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferedProposal;

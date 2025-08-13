import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GoMultiSelect } from "react-icons/go";
import { FaEdit } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

function Notification() {
  return (
    <div className="p-10">
      <FaArrowLeft className="text-2xl mb-3" />
      <div className="flex justify-between items-center mb-3">
        <h2>Notification</h2>
        <div className="flex items-center">
          <GoMultiSelect className="mr-2 text-2xl" />
          <FaEdit className="ml-2 text-2xl" />
        </div>
      </div>
      <hr />

      <div className="flex shadow-lg justify-between items-center rounded-lg mt-3 p-2 flex-wrap">
        <div className="flex mb-2 sm:mb-0">
          <p className="bg-pink-50 rounded-full px-4 py-2 h-[40px] w-[40px] mr-3">
            A
          </p>
          <div>
            <div className="flex items-center">
              <CiStar className="mr-3" />
              <p className="text-sm sm:text-base">
                A new job has been posted in your area
              </p>
            </div>
            <a
              href="https://www.example.com"
              className="underline text-sky-500 text-xs sm:text-sm"
            >
              Click here
            </a>
          </div>
        </div>

        <div className="flex items-center text-xs sm:text-base">
          <p className="mr-2">7 Oct</p>
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
}

export default Notification;

import React from 'react';
import { LiaCertificateSolid } from "react-icons/lia";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { Link } from 'react-router-dom';

function Confirm() {
  return (
    <>
      <div className="">
        {/* Top Section with background image */}
        <div
          className="top-section flex justify-start items-end p-5"
          style={{
            backgroundImage: 'url("https://res.cloudinary.com/viplav2411/image/upload/v1732270014/confirm_ylpifp.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '260px',
            width: '100vw',
          }}
        >
          <h1 className="text-white px-7">Confirmed</h1>
        </div>

        {/* Main Content Section */}
        <div className="p-4 ">
          {/* Button Section */}
          <div className="flex flex-wrap justify-between space-x-2 shadow-lg lg:rounded-full sm:rounded-lg mt-3 p-3 items-center">
            <Link to="/findcandidate">
              <button className="border-lg px-2 text-black h-auto w-full sm:w-[140px]" style={{ height: '60px' }}>Find Candidate</button>
            </Link>
            <Link to="/requests">
              <button className="border-lg px-2 text-black h-auto w-full sm:w-[140px]" style={{ height: '60px' }}>Requested</button>
            </Link>
            <Link to="/confirm">
              <button className="bg-black border-lg px-2 py-1 text-white h-auto w-full sm:w-[140px]" style={{ height: '60px' }}>Confirmed</button>
            </Link>

            <Link to="/favorite">
              <button className="border-lg px-2 text-black h-auto w-full sm:w-[140px]" style={{ height: '60px' }}>View Favourites</button>
            </Link>
          </div>

          {

          true ?<div className="flex items-center justify-center h-[200px] mt-2 border border-gray-300 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-700">Candidate not confirmed</p>
        </div>
         : <div className="flex items-center mt-5 flex-wrap space-y-4 sm:space-y-0 sm:flex-row" style={{
            marginTop: '2rem'
          }} >
            <div className="rounded-lg shadow-lg w-full sm:w-[30%] p-3">
              <div className="flex justify-between mb-3">
                <div className="flex">
                  <img src="" alt="image" className="mr-3 w-[40px] h-[40px] rounded-full" />
                  <div>
                    <h3>Aniket Sharma</h3>
                    <div className="flex items-center">
                      <LiaCertificateSolid />
                      <p>Medical Security</p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <FaRegMessage />
                </div>
              </div>
              <hr />
              <div className="flex items-center mt-4">
                <IoBriefcase className="mr-2" />
                <p>Experience : 2Yrs</p>
              </div>
              <div className="flex items-center">
                <CiClock1 className="mr-2" />
                <p>Available : Full time part time</p>
              </div>
              <div className="text-center mt-3">
                <button className="bg-[#D3FFD9] w-full">Invited</button>
              </div>
            </div>

         

        
          </div>
            
          }

          
        </div>
      </div>
    </>
  );
}

export default Confirm;

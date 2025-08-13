import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

import "./index.css";

const TrialCards = () => {
    return (
        <div className="container h-[100vh]">
            <div className="card1">
                <img
                    className="card1-title"
                    src="https://res.cloudinary.com/viplav2411/image/upload/v1732254934/find_candidate_kt7xt3.jpg"
                    alt="Profile"
                />
                <div className="bottom-section flex  flex-col items-center">
                    <h1 className="name text-xl mt-2">Jobs</h1>
                    <p className="works-at text-sm text-black">Whether you are taking full time part time or temprary employement we link you with job openinings in a range of industries tailored to your requirements.</p>
                    <div className="flex items-center bg-gray-200 justify-center rounded-md w-[120px] h-[35px] mt-3 border-2 border-dashed border-black hover:bg-white ">
                        <button className="text-black font-semibold  ">
                            I need a job
                        </button>
                        <MdOutlineArrowOutward className="text-black" />
                    </div>


                </div>
            </div>
        </div>
    );
};

export default TrialCards;

import { CiBookmark} from "react-icons/ci";
import { TbJewishStarFilled } from "react-icons/tb";


const Featured = () => {
       return (
        <>
        <h2>Featured</h2>
         <div className="flex justify-between mt-2">
            <div className="flex">
                {/* <p className="bg-[#E2E2E2] w-[28px] rounded-lg px-1 py-1  h-[25px] text-[12px] mr-2" style={{
                    outline: "1px solid gray"
                }}>567</p> */}
                {/* <p className="text-[12px] md:text-lg">Courses for cyber security</p> */}
            </div>

            {/* <div className="flex">

                <p className="mr-2 text-[12px] md:text-lg">Distance Range : </p>
                <select className="bg-[#fff] text-sm  md:rounded-full  rounded-lg   mr-2" style={{
                    outline: "1px solid gray"
                }}>
                    <option>10 miles</option>
                </select>

            </div> */}
        </div>
        <div className="flex justify-between mt-2 flex-wrap">
            <div className="rounded-lg p-2 md:w-[33%] w-[100%] mb-2 md:mb-0  bg-white" style={{ outline: "1px solid gray" }}>
                <div
                    className="w-full p-2 h-40 bg-cover rounded-lg  bg-center  "
                    style={{
                        backgroundImage: "url('/assets/cyberimagebg.png')",
                    }}
                >

                    <div className="flex justify-between w-[100%]">
                        <p className="bg-white text-[12px] px-1 py-1  h-[25px] rounded-lg">Cyber Security</p>
                        <div className="flex">
                            <div className="flex items-center">
                                <p className="flex items-center bg-white text-sm px-2 py-1 mr-2 h-[25px] rounded-lg">
                                    <TbJewishStarFilled className="text-yellow-400 mr-1" />
                                    3.5
                                </p>
                            </div>

                            <p className="bg-white text-sm px-1 py-1 w-[22px] h-[25px] rounded-lg"><CiBookmark /></p>
                        </div>
                    </div>
                    <div className="flex h-[80%] justify-end items-end">
                        <img src='/assets/amazon.png' className="bg-[#fff] rounded-full w-[30px] h-[30px] p-1" alt="logo" />
                    </div>


                </div>

                <h4>Operating System Security</h4>
                <p className="text-[#787878] text-[12px] font-bold">126 lectures . 76 hours . 66 days</p>
                <div className=" flex justify-between">
                    <div>
                        <p className="text-[12px] font-bold">Date Duration</p>
                        <p className="px-2 text-[11px] font-bold py-1 shadow-sm rounded-full" style={{
                            outline: "1px solid #D0CECE"
                        }}>1 Jan, 24 - 30 Mar, 24</p>
                    </div>

                    <div>
                        <p className="text-[12px] font-bold">Timing</p>
                        <p className="px-2 text-[11px] font-bold py-1  shadow-sm rounded-full" style={{
                            outline: "1px solid #D0CECE"
                        }}>05:00 PM - 07:00 PM</p>
                    </div>


                </div>

                <p className="text-[12px]">Learn to secure popular operating systems like Windows, Linux, and MacOS against cyber threats....</p>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[#787878] text-[12px] mt-3">San Francisco, CA</p>
                        <div className="flex items-center ">
                            <p className="bg-[#CAE3FF] mr-2 w-[86px] px-2 py-1 text-[11px] rounded-full">2 miles away</p>
                            <a href="https://www.google.com" target="_blank" className="text-[10px] text-blue-600 underline" rel="noopener noreferrer">
                                View More
                            </a>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="font-bold text-[18px] mr-2">£25</p>
                        <p className="bg-[#000] rounded-full text-[12px] px-2 py-1 text-[#fff] cursor-pointer">Details</p>
                    </div>
                </div>

            </div>
        </div></>
       )
}

export default Featured
import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';


const MySubscribers = () => {
    const [loading, isLoading] = useState(false);
    const { state } = useLocation();
    const { course } = state || {};
    const navigate = useNavigate();
    const { id } = useParams()
    console.log(id, "id");
    const enrolledCand = course.enrolledCandidates;
    console.log(enrolledCand, "enrolledCand");

    if (!course) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <p className="p-6 text-lg text-gray-600 bg-gray-50 rounded-xl">No course data available.</p>
        </div>
    );


    return (
        <div className="px-5 py-5 bg-[#FBFBFB] min-h-screen">
            <div className="flex justify-center items-center mt-8">
                <img src="/assets/adv.svg" alt="profile" className="h-[150px] mr-3" />
                <h1 className="font-futura md:text-5xl text-lg font-bold">My Subscribers</h1>
                <img src="/assets/judge.svg" alt="profile" className="h-[150px] ml-3" />
            </div>
            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden mt-5">
                <thead className="bg-[#3B82F6] text-white w-full text-sm font-semibold">
                    <tr >
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Contact</th>

                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4" className="bg-white text-center py-6">
                                <ClipLoader size={50} color="#4ade80" />
                            </td>
                        </tr>
                    ) : (
                        enrolledCand.length > 0 ? (
                            enrolledCand.map((eachCan, index) => (
                                <tr
                                    key={eachCan._id}
                                    className="border-b hover:bg-gray-100 transition duration-200 ease-in-out"
                                >
                                    <td className="p-4 text-gray-800">{eachCan?.name}</td>
                                    <td className="p-4 text-gray-800">{eachCan.email}</td>
                                    <td className="p-4 text-gray-800">{eachCan.contact}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="bg-white text-center py-6 text-gray-600">
                                    No Data found
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

        </div>

    )
}

export default MySubscribers

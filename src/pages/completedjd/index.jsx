import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import ClipLoader from "react-spinners/ClipLoader";

// Icons
import { AiOutlineSchedule } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CiClock1, CiLocationOn } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdCalendarMonth } from "react-icons/md";

// Components
import Proposal from "../jobdescription/proposal";
import { HttpClient } from "../../server/client/http";

// Set the root element for react-modal (required for accessibility)
Modal.setAppElement("#root");

const Completedjobdescription = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // State variables
    const [jobDetails, setJobDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRateModalOpen, setIsRateModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    // Fetch job details
    const getJobDetails = async () => {
        setIsLoading(true);
        try {
            const response = await HttpClient.get(`/jobs/job-posts/${location?.pathname.split('/').pop()}`);
            setJobDetails(response?.data);
        } catch (error) {
            console.error("Error fetching job details:", error.message);
            toast.error("Failed to fetch job details.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle job application
    const applyJob = () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData?.role) {
            navigate(`/applyingjob/${jobDetails?._id}`);
        } else {
            toast.info("Please Login/Register First");
            navigate(`/login`);
        }
    };

    // Rating modal handlers
    const openRateModal = () => setIsRateModalOpen(true);
    const closeRateModal = () => {
        setIsRateModalOpen(false);
        setRating(0);
        setReview("");
    };

    const handleRatingChange = (value) => setRating(value);
    const handleReviewChange = (e) => setReview(e.target.value);

    const submitRating = () => {
        console.log("Rating:", rating);
        console.log("Review:", review);
        toast.success("Thank you for your feedback!");
        closeRateModal();
    };

    // Fetch job details on component mount
    useEffect(() => {
        getJobDetails();
    }, []);

    return (
        <div className="container">
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <ClipLoader size={50} color="#4ade80" />
                </div>
            ) : (
                <div className="flex flex-col md:flex-row  md:mt-2 gap-6">
                    {/* Job Description Section */}
                    <div className="flex-1 p-8 bg-white rounded-lg mt-5">
                        <Link to="/findjobs">
                            <FaArrowLeft className="mb-4 text-blue-600 hover:text-blue-800" />
                        </Link>

                        <div className="flex justify-between">
                            <div>
                                <p>Company: <span className="text-[#976063] font-bold">{jobDetails?.companyDetails?.companyName}</span></p>
                                <h2 className="font-futura text-lg md:text-2xl font-semibold text-gray-800">{jobDetails?.jobDetails?.jobTitle}</h2>
                                <p className="mb-1">
                                    Posted Date:{" "}
                                    {new Date(jobDetails?.createdAt)
                                        .toLocaleDateString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                </p>

                            </div>
                            <img src={jobDetails?.companyDetails?.companyLogo} alt="logo" className="w-16 h-16 rounded-full object-contain" />
                        </div>

                        <div className="flex items-center text-[#976063] font-semibold mb-2">
                            <CiLocationOn className="mr-2" />
                            <p>{jobDetails?.jobDetails?.city}, {jobDetails?.jobDetails?.country}</p>
                        </div>
                        <p className="bg-[#F0F0F0] w-fit mb-3 rounded-md px-2 py-1">
                            <strong>£ {jobDetails?.jobDetails?.salary?.amount} / </strong>
                            {jobDetails?.jobDetails?.salary?.frequency === "monthly" ? "Per Month" : "Per Week"}
                        </p>
                        <div className="flex flex-wrap gap-2 text-[#505050] mb-4">
                            <div className="flex flex-wrap gap-2">
                                {jobDetails?.workSchedule?.workingDays?.map((each, index) => (
                                    <span key={index} className="bg-blue-200 rounded-md px-3 py-1 text-sm">{each}</span>
                                ))}
                            </div>
                            <p className="bg-[#EBF6FF] rounded-md px-2 py-1 text-sm">
                                {jobDetails?.jobRequirements?.minimumExp} - {jobDetails?.jobRequirements?.maximumExp} Yrs
                            </p>
                        </div>
                        <hr className="border-gray-300 my-4" />

                        {/* Profile & Job Insights */}
                        <div className="flex flex-wrap gap-6">
                            {/* Profile Insights */}
                            <div className="flex-1">
                                <h4 className="font-bold mb-3 text-gray-700">Profile Insights</h4>
                                <div className="flex items-start mb-3 text-[#5F5F5F]">
                                    <CgProfile className="mt-1 mr-2 text-[#D3555A]" />
                                    <div>
                                        <h4 className="font-semibold">Location</h4>
                                        <p>{jobDetails?.jobDetails?.city}, {jobDetails?.jobDetails?.country}</p>
                                    </div>
                                </div>
                                <div className="flex items-start mb-3 text-[#5F5F5F]">
                                    <CgProfile className="mt-1 mr-2 text-[#D3555A]" />
                                    <div>
                                        <h4 className="font-semibold">Preferred Experience Level</h4>
                                        <p>2 - 3 years</p>
                                    </div>
                                </div>
                                <div className="flex items-start text-[#5F5F5F]">
                                    <FaBookOpenReader className="mt-1 mr-2 text-[#D3555A]" />
                                    <div>
                                        <h4 className="font-semibold">Minimum Qualification</h4>
                                        <p>Bachelor's</p>
                                    </div>
                                </div>
                            </div>
                            {/* Job Insights */}
                            <div className="flex-1">
                                <h4 className="font-bold mb-3 text-gray-700">Job Insights</h4>
                                <div className="flex items-start mb-3 text-[#5F5F5F]">
                                    <CiClock1 className="mt-1 mr-2 text-[#D3555A]" />
                                    <div>
                                        <h4 className="font-semibold">Shift & Schedule</h4>
                                        <p>{jobDetails?.workSchedule?.startTime} - {jobDetails?.workSchedule?.endTime}</p>
                                    </div>
                                </div>
                                <div className="flex items-start mb-3 text-[#5F5F5F]">
                                    <AiOutlineSchedule className="mt-1 mr-2 text-[#D3555A]" />
                                    <div>
                                        <h4 className="font-semibold">Job Start Date</h4>
                                        <p>{jobDetails?.workSchedule?.startDate.slice(0, 10)}</p>
                                    </div>
                                </div>
                                <div className="flex items-start text-[#5F5F5F]">
                                    <MdCalendarMonth className="mt-1 mr-2 text-[#D3555A]" />
                                    <div>
                                        <h4 className="font-semibold">Application Deadline</h4>
                                        <p>{jobDetails?.jobDetails?.applicationDeadline}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-300 my-4" />

                        {/* Job Description */}
                        <h3 className="text-[#5F5F5F] font-semibold">Job Description</h3>
                        <span className="w-[80%] text-gray-700">{jobDetails?.jobDetails?.jobDescription}</span>

                        <p className="text-md font-semibold text-gray-700 mt-2">
                            <strong className="text-gray-900">Employer Name: </strong> {jobDetails?.companyDetails?.employerName}
                        </p>

                        <p className="text-md font-semibold text-gray-700 flex items-center">
                            <strong className="text-gray-900 mr-2">Email:</strong>
                            <a
                                href={`mailto:${jobDetails?.companyDetails?.contactEmail}`}
                                className="text-blue-500 underline text-sm hover:text-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                aria-label={`Send an email to ${jobDetails?.companyDetails?.contactEmail}`}
                            >
                                {jobDetails?.companyDetails?.contactEmail || "Not available"}
                            </a>
                        </p>

                        <div className="mb-1">
                            <p className="text-md font-medium text-gray-700">
                                <strong className="text-gray-900">Contact Number:</strong> {jobDetails?.companyDetails?.contactNumber}
                            </p>
                        </div>

                        {/* Visit Company Website */}
                        <a
                            href={
                                jobDetails?.companyDetails?.companyWebsite.startsWith("http")
                                    ? jobDetails?.companyDetails.companyWebsite
                                    : `https://${jobDetails?.companyDetails.companyWebsite}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="py-1 px-3 w-auto bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                Visit Company Website
                            </button>
                        </a>

                        <hr className="border-gray-300 my-4" />

                        <div>
                            <div className="flex items-center p-3">
                                <HiOutlineLightBulb className="mr-2 text-[#D3555A] text-2xl" />
                                <p className="text-[#505050] font-semibold">Skills</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {jobDetails?.jobSkills?.map((skill, index) => (
                                    <p key={index} className="bg-[#ECECEC] px-3 py-1 gap-2 m-1 rounded-md text-sm">
                                        {skill}
                                    </p>
                                ))}
                            </div>

                            <hr className="border-gray-300 my-4" />
                        </div>
                    </div>

                    {/* Sidebar Section */}
                    <div className="flex-none w-full md:w-[35%] md:mt-10 bg-gray-100 p-5 rounded-lg shadow-md">
                        <div className="flex mb-4 gap-2">
                            <button
                                onClick={applyJob}
                                className="px-3 py-1 border bg-black text-white rounded-lg hover:bg-black hover:text-white transition duration-200"
                            >
                                Apply Job
                            </button>
                            <button
                                onClick={openRateModal}
                                className="px-3 py-1 border bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Rate
                            </button>
                        </div>

                        <p className="text-[14px] mb-1"><strong>Status:</strong> Active</p>
                        <strong>About the Client</strong>
                        <p>{jobDetails?.companyDetails?.companyName}</p>
                        <p>{jobDetails?.companyDetails?.companyDescription}</p>
                    </div>
                </div>
            )}

            {/* Rating Modal */}
            <Modal
                isOpen={isRateModalOpen}
                onRequestClose={closeRateModal}
                contentLabel="Rate Job Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-semibold mb-4">Rate this Job</h2>
                    <div className="flex justify-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => handleRatingChange(star)}
                                className={`text-3xl ${star <= rating ? "text-yellow-500" : "text-gray-300"} focus:outline-none`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={review}
                        onChange={handleReviewChange}
                        placeholder="Write your review..."
                        className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={closeRateModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={submitRating}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default Completedjobdescription;
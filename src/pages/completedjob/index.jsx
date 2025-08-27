import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { HttpClient } from "../../server/client/http";

Modal.setAppElement("#root"); // Set root element for accessibility

const CompletedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [jobId,setJobId] =useState("")

    useEffect(() => {
        const fetchJobs = async () => {
            try {
               

                const response = await HttpClient.get("/applyJob/read/complete");
                console.log(response)

                const formattedData = response.job.map((each) => ({
                    jobId : each?.jobId?._id,
                    jobTitle : each?.jobId?.jobDetails?.jobTitle,
                    jobCategory : each?.jobId?.jobDetails?.jobCategory,

                    state : each?.jobId?.jobDetails?.state,
                }))


                setJobs(formattedData); // Replace dummyData with response.data when API is integrated
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const openModal = (job) => {
        setJobId(job?.jobId)
        setSelectedJob(job);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setRating(0);
        setReview("");
    };

    const submitRating = async () => {
        console.log(jobId)

        try {
            const response = await HttpClient.post("/review/", {
                rating,review, jobId
            })
        } catch (error) {
            
        }

        closeModal();
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Completed Jobs</h1>
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-lg text-left">
                    <thead>
                        <tr className="bg-[#c5363c] text-[#fff]">
                            <th className="p-4 text-sm font-semibold">Sr. No.</th>
                            <th className="p-4 text-sm font-semibold">Category</th>
                            <th className="p-4 text-sm font-semibold">Job Title</th>
                            <th className="p-4 text-sm font-semibold">Location</th>
                            <th className="p-4 text-sm font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={job.jobId} className="border-b hover:bg-gray-100 transition">
                                <td className="p-4 text-gray-700 text-sm">{index + 1}</td>
                                <td className="p-4 text-gray-700 text-sm">{job.jobCategory}</td>
                                <td className="p-4 text-gray-700 text-sm">{job.jobTitle}</td>
                                <td className="p-4 text-gray-700 text-sm">{job.state}</td>
                                <td className="p-4 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                                        onClick={() => openModal(job)}
                                    >
                                        Rate Job
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Rate Job"
                className="bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Rate Job</h2>
                {selectedJob && (
                    <p className="text-gray-600 mb-4">Job: {selectedJob.title}</p>
                )}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rating:</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`text-2xl ${
                                    rating >= star ? "text-yellow-500" : "text-gray-300"
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Review:</label>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2"
                        rows="4"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..."
                    ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={submitRating}
                    >
                        Submit
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CompletedJobs;

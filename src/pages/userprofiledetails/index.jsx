import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import { FiMail, FiPhone, FiCalendar, FiGlobe, FiAward, FiBriefcase } from "react-icons/fi";
import { FaLanguage, FaPassport, FaCar, FaFirstAid } from "react-icons/fa";
import { MdWork, MdDriveEta } from "react-icons/md";
import { GiHealthNormal,      } from "react-icons/gi";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { toast } from "react-toastify";

const UserprofileDetails = () => {
    const { userId,category } = useParams();
    //const location=useLocation();
    //console.log(id,"....13");
    const [candidate, setCandidate] = useState();
    const navigate=useNavigate();

    const requestCandidate = async () => {
        try {
            const response = await HttpClient.post(`/jobs/invite`, {
                userId: userId,
                category:category
            });
            if(response.success===true){
                toast.success(response.message);
                navigate('/findCandidate')
            }
            setCandidate(response?.user)
        } catch (error) {
            toast.error(error.response.data.message||error.message||"internal server error")
            console.error("Error requesting candidate:", error);
        }
    };

    // useEffect(() => {
    //     requestCandidate();
    // }, []);

    const DetailItem = ({ icon, label, value }) => (
        <div className="flex items-start mb-3">
            <div className="text-[#c5363c] mr-3 mt-1">{icon}</div>
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-gray-800">{value || "Not specified"}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto bg-white mt-10 rounded-xl shadow-md overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r  from-[#c5363c] to-[#e04b52] p-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
                            <img
                                src={candidate?.profile?.personalInformation?.profileImage || "/images/default-profile.png"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">{candidate?.name}</h1>
                            <p className="text-gray-100">{candidate?.profile?.personalInformation?.profession}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    {/* Personal Details */}
                    <div className="mb-3">
                        <h2 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                            <FiBriefcase className="text-[#c5363c] mr-2" />
                            Personal Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <DetailItem icon={<FiMail />} label="Email" value={candidate?.email} />
                                <DetailItem icon={<FiPhone />} label="Phone" value = "XXX- XXX"/>
                                <DetailItem icon={<FiCalendar />} label="Date of Birth" value={candidate?.profile?.personalInformation?.dob} />
                            </div>
                            <div>
                                <DetailItem icon={<FiGlobe />} label="Nationality" value={candidate?.profile?.personalInformation?.nationality} />
                                <DetailItem icon={<FaLanguage />} label="Languages" value={candidate?.profile?.generalInformation?.nationality} />
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <FiAward className="text-[#c5363c] mr-2" />
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {candidate?.profile?.personalInformation?.skills?.length > 0 ? (
                                candidate.profile.personalInformation.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#c5363c]/10 text-[#c5363c] px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500">No skills listed</p>
                            )}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="mb-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <FiBriefcase className="text-[#c5363c] mr-2" />
                            Experience
                        </h2>
                        {candidate?.profile?.generalInformation?.experience?.length > 0 ? (
                            <div className="space-y-4">
                                {candidate?.profile?.generalInformation?.experience.map((exp, index) => {
                                    const start = new Date(exp?.startDate).toLocaleDateString();
                                    const end = exp?.currentlyWorking ? "Present" : new Date(exp?.endDate).toLocaleDateString();

                                    return (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#c5363c]">
                                            <h3 className="font-bold text-gray-800">{exp?.role}</h3>
                                            <p className="text-gray-600">{exp?.company}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {start} - {end}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500">No experience listed</p>
                        )}
                    </div>

                    {/* About Me Section */}
                    <div className="mb-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-2 pb-2 border-b border-gray-200">About Me</h2>
                        <p className="text-gray-700 whitespace-pre-line">
                            {candidate?.profile?.generalInformation?.bio || "No bio provided"}
                        </p>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-3">
                        <h2 className="text-xl font-bold text-gray-800 mb-2 pb-2 border-b border-gray-200">
                            Additional Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <DetailItem icon={<FaFirstAid />} label="First Aid Certified" value={candidate?.profile?.generalInformation?.firstAid} />
                                <DetailItem icon={<GiHealthNormal />} label="Health Issues" value={candidate?.profile?.generalInformation?.healthIssue} />
                                <DetailItem icon={<FaPassport />} label="Passport" value={candidate?.profile?.generalInformation?.passportDrivingLicense} />
                                <DetailItem icon={<MdDriveEta />} label="Driving License" value={candidate?.profile?.generalInformation?.ukDrivingLicense} />
                            </div>
                            <div>
                                <DetailItem icon={<MdWork />} label="Work Permit" value={candidate?.profile?.generalInformation?.workPermit} />
                                <DetailItem icon={<FaPersonMilitaryRifle  />} label="Military Background" value={candidate?.profile?.generalInformation?.millitaryBackground} />
                                <DetailItem icon={<FaCar />} label="Willing to Travel" value={candidate?.profile?.generalInformation?.travelWill ? `${candidate?.profile?.generalInformation?.travelWill} miles` : null} />
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8">
                        <button
                            className="w-full bg-gradient-to-r from-[#c5363c] to-[#e04b52] text-white font-medium py-1 px-3 rounded-lg hover:opacity-90 transition-opacity shadow-md"
                            onClick={() => requestCandidate()}
                        >
                            Request to Apply for Job
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserprofileDetails;
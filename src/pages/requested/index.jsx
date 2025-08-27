import React, { useEffect, useState } from "react";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdCategory, MdFavoriteBorder } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import { CiClock1, CiHeart, CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HttpClient } from "../../server/client/http";
import ClipLoader from "react-spinners/ClipLoader";
import { GrUserWorker } from "react-icons/gr";
import { VscHeartFilled } from "react-icons/vsc";


const dummyCandidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    candidateProfession: "Software Engineer",
    title: "Frontend Developer",
    candidateImage: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    candidateProfession: "UX Designer",
    title: "Senior UI/UX Designer",
    candidateImage: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    candidateProfession: "Data Scientist",
    title: "Machine Learning Engineer",
    candidateImage: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily.w@example.com",
    candidateProfession: "Product Manager",
    title: "Technical Product Owner",
    candidateImage: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    candidateProfession: "DevOps Engineer",
    title: "Cloud Infrastructure Specialist",
    candidateImage: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 6,
    name: "Sarah Davis",
    email: "sarah.d@example.com",
    candidateProfession: "Marketing Specialist",
    title: "Digital Marketing Manager",
    candidateImage: "https://randomuser.me/api/portraits/women/28.jpg"
  }
];

// You can use this data by setting:
// const [filteredCandidates, setFilteredCandidates] = useState(dummyCandidates);

function Requests() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCandidate, setSearchCandidate] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await HttpClient.get(
          `${process.env.REACT_APP_URL}/jobs/invite`
        );
        console.log(response,"......................response-81")
        const data = response?.invitations;
        const formattedData = data.map((candidate) => ({
          id: candidate.userId,
          name: candidate.name,
          email: candidate.email,
          //isRequested: candidate?.isRequested,
          category:candidate.jobCategory,
          profession:candidate.profession
          // Add more fields as required, e.g., profile picture, experience, etc.
        }));
        setCandidates(formattedData);
        setFilteredCandidates(formattedData);
      } catch (error) {
        setError("Unable to fetch candidate data");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <>
      <div className="">
        {/* Top Section with background image */}
        <div
          className="top-section flex justify-start items-end p-5"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/viplav2411/image/upload/v1732260499/requests_dcorfh.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "260px",
            width: "100vw",
          }}
        >
          <h1 className="text-white px-7">Requested</h1>
        </div>

        {/* Main Content Section */}
        <div className="p-4">
          {/* Button Section */}
          <div className="flex flex-wrap justify-between space-x-2 shadow-lg lg:rounded-full sm:rounded-lg mt-3 p-3 items-center z-10">
            <Link to="/findcandidate">
              <button
                className="border-lg px-2 text-black h-auto w-full sm:w-[140px]"
                style={{ height: "60px" }}
              >
                Find Candidate
              </button>
            </Link>
            <Link to="/requests">
              <button
                className="bg-black border-lg px-2 py-1 text-white h-auto w-full sm:w-[140px]"
                style={{ height: "60px" }}
              >
                Requested
              </button>
            </Link>
            {/* <Link to="/confirm">
              <button
                className="border-lg px-2 py-1 text-black h-auto w-full sm:w-[140px]"
                style={{ height: "60px" }}
              >
                Confirmed
              </button>
            </Link> */}
            <Link to="/favorite">
              <button
                className="border-lg px-2 py-1 text-black h-auto w-full sm:w-[140px]"
                style={{ height: "60px" }}
              >
                View Favourites
              </button>
            </Link>
          </div>

          {/* Cards Section */}

          {
            false ?
              <div className="flex items-center justify-center h-[200px] mt-2 border border-gray-300 rounded-lg shadow-md">
                <p className="text-xl font-semibold text-gray-700">No requested candidate</p>
              </div>
              :

              <> {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <ClipLoader color="#c5363c" size={50} />
                </div>
              ) : error ? (
                <p className="text-red-500 text-center font-semibold">{error}</p>
              ) : (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="px-6 py-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                      >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-lg text-gray-800">{candidate.name || "N/A"}</h3>

                          <img src={candidate?.candidateImage} className="w-12 h-12 rounded-full object-cover" alt="profile" />

                        </div>

                        {/* Details */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CiMail className="text-gray-500" />
                            <span className="text-sm px-2 py-1 rounded-lg bg-[#c1e2e3] text-gray-700">
                              {candidate.email || "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <GrUserWorker className="text-gray-500" />
                            <p className="text-sm text-gray-600">{candidate?.profession || "N/A"}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdCategory className="text-gray-500" />
                            <p className="text-sm text-gray-600">{candidate?.category || "N/A"}</p>
                          </div>
                        </div>
                        {/* <div className="flex items-center justify-between">

                          <button className="focus:outline-none">
                            {false ? <VscHeartFilled size={30} color="#c5363c" /> : <CiHeart size={30} />}
                          </button>

                        
                        </div> */}

                        {/* Footer */}

                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center w-full text-gray-500 bg-gray-100 rounded-lg">
                      No candidates found. Please try changing the Job Title filter.
                    </div>
                  )}
                </div>
              )}</>

          }
        </div>
      </div>



    </>
  );
}

export default Requests;

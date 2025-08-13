import React, { useEffect, useState } from 'react';
import { LiaCertificateSolid } from "react-icons/lia";
import { MdCategory, MdFavoriteBorder } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { IoBriefcase, IoFilter } from "react-icons/io5";
import { CiClock1, CiHeart, CiMail } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { GrUserWorker } from 'react-icons/gr';
import { VscHeartFilled } from 'react-icons/vsc';
import ClipLoader from 'react-spinners/ClipLoader';
import { RxCrossCircled } from 'react-icons/rx';
import Modal from "react-modal";
import { HttpClient } from '../../server/client/http';



function Favourite() {

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [searchCandidate, setSearchCandidate] = useState("");
  const [allJobCategories, setAllJobCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  



  const fetchCandidates = async () => {
    setIsLoading(true)
    try {
      const response = await HttpClient.get(
        `/user/find`
      );

      const data = response.data;

      console.log("candidate", response?.data)
      const formattedData = data
        .filter((candidate) => candidate?.favStatus === true) // Filter where favStatus is true
        .map((candidate) => ({
          id: candidate?.userId,
          name: candidate?.name,
          favStatus: candidate?.favStatus,
          email: candidate?.email,
          candidateImage: candidate?.profile?.personalInformation?.profileImage,
          candidateProfession: candidate?.profile?.personalInformation?.profession,
          title:
            candidate?.profile?.generalInformation?.experience[0]?.title || "Unknown",
        }));

      setCandidates(formattedData);
          setIsLoading(false)



      setFilteredCandidates(formattedData);
    } catch (error) {
      setError("Unable to fetch candidate data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    fetchCandidates();
  }, []);



  const handleFilterApply = () => {
    const filtered = candidates.filter(
      (candidate) => candidate.candidateProfession === selectedJob
    );
    setFilteredCandidates(filtered);
    setIsModalOpen(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchCandidate(query);

    const filtered = candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(query) &&
        (!selectedJob || candidate.title === selectedJob)
    );
    setFilteredCandidates(filtered);
  };



  const makeFavourite = async (candidateId) => {
    console.log(candidateId)

    const status = true
    try {
      const response = await HttpClient.post("favCandidate/favorite", { candidateId, status })
      console.log(response)
    } catch (error) {
      console.log(error?.message)
    }
  }

  return (
    <>
      <>

        {
          isLoading ? <div className="flex justify-center items-center h-[300px]">
            <ClipLoader color="#c5363c" size={50} />
          </div> :
            <div>



              <div
                className="top-section flex justify-start items-end p-5"
                style={{
                  backgroundImage: 'url("https://res.cloudinary.com/viplav2411/image/upload/v1732268880/favorite_k8kwze.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '260px',
                  width: '100vw',
                }}
              >
                <h1 className="text-white px-7">Favourite</h1>
              </div>

              <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                  overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
                  content: {
                    maxWidth: "500px",
                    margin: "auto",
                    borderRadius: "10px",
                  },
                }}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Select your job posting</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-[#c5363c] rounded-lg"
                  >
                    <RxCrossCircled size={24} className="text-[#c5363c] ml-5" />
                  </button>
                </div>
                <div className="flex flex-col items-center p-6">
                  <h1 className="text-2xl font-bold mb-2">Select your job posting</h1>
                  <p className="text-gray-600 mb-4">
                    To search candidate select your job posting first
                  </p>
                  <select
                    className="w-full border rounded-md px-3 py-2 outline-none"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                  >
                    <option value="">Select Job Title</option>
                    {allJobCategories.map((category) => (
                      <option key={category.id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>

                  <div className="flex justify-end  mt-4">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded-md mr-3 hover:bg-gray-400 transition-colors"
                      onClick={() => {
                        setSelectedJob("");
                        setIsModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="px-4 py-2 bg-[#c5363c] text-white rounded-md"
                      onClick={handleFilterApply}
                      disabled={!selectedJob}
                    >
                      Save
                    </button>
                  </div>

                  <p className="mt-3">
                    Job Title: <strong>{selectedJob}</strong>
                  </p>
                </div>
              </Modal>

              {/* Button Section */}
              <div className="p-4">
             


                <div className="flex flex-wrap shadow-lg lg:rounded-full sm:rounded-lg mt-3 items-center justify-between space-x-2 px-2 py-2">
                  <Link to="/findcandidate">
                    <button className="border-lg px-2 text-black h-auto w-full sm:w-[140px]" style={{ height: '60px' }}>Find Candidate</button>
                  </Link>

                  <Link to="/requests">
                    <button className="border-lg px-2 text-black h-auto w-full sm:w-[140px]" style={{ height: '60px' }}>Requested</button>
                  </Link>
                  {/* <Link to="/confirm">
                    <button className="border-lg px-2 text-black h-auto w-full sm:w-[140px]" style={{ height: '60px' }}>Confirmed</button>
                  </Link> */}

                  <Link to="/favorite">
                    <button className="bg-black border-lg px-2 py-1 text-white h-auto w-full sm:w-[140px]" style={{ height: '60px' }}>View Favourites</button>
                  </Link>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap justify-between gap-2 items-center">
                  <input
                    type="search"
                    value={searchCandidate}
                    onChange={handleSearch}
                    placeholder="Search Candidate"
                    className="p-2 border rounded-lg w-full sm:w-[300px]"
                  />

                  <div className="flex gap-2">

                    <button
                      type="button"
                      className="flex items-center mb-2 w-auto bg-[gray] text-white rounded-lg px-2 py-1"
                      onClick={() => fetchCandidates()}

                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center mb-2 md:m-0 bg-[#c5363c] text-white rounded-lg px-4 py-2 hover:bg-[#a02d31] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c5363c]"
                      aria-label="Open filter modal"
                    >
                      <IoFilter className="mr-2" aria-hidden="true" />
                      <span>Filter</span>
                    </button>

                  </div>
                </div>

                {loading ? (
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
                              <p className="text-sm text-gray-600">{candidate.candidateProfession || "N/A"}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <MdCategory className="text-gray-500" />
                              <p className="text-sm text-gray-600">{candidate?.title || "N/A"}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">

                            <button onClick={() => makeFavourite(candidate?.id)} className="focus:outline-none">
                              {candidate?.favStatus ? <VscHeartFilled size={30} color="#c5363c" /> : <CiHeart size={30} />}
                            </button>

                            <div className=" text-right">
                              <Link to={`/userprofile/${candidate?.id}/${selectedJob}`}>
                                <p className="text-blue-500 underline cursor-pointer hover:text-blue-700 hover:underline-offset-2">
                                  View Profile
                                </p>
                              </Link>
                            </div>
                          </div>

                          {/* Footer */}

                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center w-full text-gray-500 bg-gray-100 rounded-lg">
                        No candidates found. Please try changing the Job Title filter.
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
        }

      </>
    </>
  );
}

export default Favourite;

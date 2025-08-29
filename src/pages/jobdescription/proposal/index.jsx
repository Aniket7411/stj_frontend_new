import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { TbJewishStarFilled } from "react-icons/tb";
import { HttpClient } from "../../../server/client/http";
import { toast } from "react-toastify";
import { IoEye } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

const Proposal = ({ JobId, jobDetails }) => {
  const [proposalList, setProposalList] = useState([]);
  const [status, setStatus] = useState("applied");
  const [loading, setLoading] = useState(false);

  const getProposalList = async () => {
    setLoading(true);
    try {
      const response = await HttpClient.get("/applyJob/read", {
        Id: JobId,
        type: "jobId",
        status: status,
      });

      console.log("responseresponse", response)
      setProposalList(response);
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      //debugger;
      const response = await HttpClient.put("/applyJob/update", {
        status: status,
        proposalId: id,
      });
      toast.info(response?.message);
      setProposalList(pre => pre.filter(item => item._id !== id));

    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getProposalList();
  }, [status]);

  return (
    <div className="p-6">
      <h4 className="text-2xl font-bold mb-4">Proposals</h4>

      <div className="border p-6 rounded-md shadow-lg bg-white">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          {/* Proposal Status Filters */}
          <div className="flex font-semibold space-x-6 text-sm sm:text-base">
            {["applied", "shortlist", "reject", "approved"].map((type) => {
              let label = "";
              if (type === "applied") label = "All Proposals";
              else if (type === "shortlist") label = "Shortlisted";
              else if (type === "reject") label = "Rejected";
              else label = type.charAt(0).toUpperCase() + type.slice(1);

              return (
                <h4
                  key={type}
                  onClick={() => setStatus(type)}
                  className={`cursor-pointer ${status === type
                      ? "text-blue-600 underline"
                      : "text-gray-600 hover:text-blue-500"
                    }`}
                >
                  {label}
                </h4>
              );
            })}
          </div>


          {/* Search Bar */}
          <div className="w-full sm:w-auto mt-4 sm:mt-0">
            <input
              type="search"
              placeholder="Search proposals..."
              className="w-full sm:w-72 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center">
            <ClipLoader size={35} color="#407BFF" />
          </div>
        ) : proposalList?.length > 0 ? (
          proposalList.map((item) => (
            <div key={item?._id} className="border-b pb-6 mb-6">
              {/* Profile Section */}
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4">
                  {/* <img
                    src={item?.profile}
                    alt="profile-image"
                    className="w-16 h-16 rounded-full object-cover"
                  /> */}
                  <div>
                    <p className="text-[#D3555A] font-semibold">
                      {item?.username}
                    </p>
                    <p className="text-black">{item?.email}</p>
                    <p className="text-[#505050]">{item?.contact}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {status === 'reject' && (
                    <h3 className="text-red-700 bg-red-100 px-2 py-1 rounded-full text-sm font-semibold shadow-sm">
                      Rejected
                    </h3>
                  )}

                  {status === 'shortlist' && (
                    <>
                      <button
                        onClick={() => updateStatus(item?._id, "reject")}
                        className="bg-[#D3555A] text-white py-1 px-2 rounded-md hover:bg-[#B94A45] transition"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => updateStatus(item?._id, "approved")}
                        className="bg-[#407BFF] text-white py-2 px-4 rounded-md hover:bg-[#0056b3] transition"
                      >
                        Approve
                      </button>
                    </>
                  )}

                  {status === 'applied' && (
                    <>
                      <button
                        onClick={() => updateStatus(item?._id, "reject")}
                        className="bg-[#D3555A] text-white py-2 px-4 rounded-md hover:bg-[#B94A45] transition"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => updateStatus(item?._id, "shortlist")}
                        className="bg-[#407BFF] text-white py-2 px-4 rounded-md hover:bg-[#0056b3] transition"
                      >
                        Shortlist
                      </button>
                    </>
                  )}
                  {status === 'approved' && (
                    <>
                      <h3 className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        Approved
                      </h3>

                    </>
                  )}
                </div>

              </div>

              {/* Proposal Details */}
              <div className="mt-4 flex flex-wrap gap-4">
                {/* Resume Link */}
                {item?.resume && item?.resume !== "" && (
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">Resume:</p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item?.resume}
                      className="bg-[#F2F2F2] flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-[#e0e0e0] transition"
                      download
                    >
                      <IoEye />
                      <span className="font-semibold">View Resume</span>
                    </a>
                  </div>
                )}

                {/* Cover Letter Link */}
                {item?.coverLetter && item?.coverLetter !== "" && (
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">Cover Letter:</p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item?.coverLetter}
                      className="bg-[#F2F2F2] flex items-center space-x-2 py-2 px-4 rounded-md text-black hover:bg-[#e0e0e0] transition"
                      download
                    >
                      <IoEye />
                      <span className="font-semibold">View Cover Letter</span>
                    </a>
                  </div>
                )}
              </div>


              {/* Additional Details */}
              {/* <div className="mt-4 flex items-center">
                <TbJewishStarFilled className="text-[#f7c932]" />
                <p className="text-[#505050] mx-2">Specializes in</p>
                <strong>{item?.specialist}</strong>
              </div> */}
              <div className="mt-3 p-3 border rounded-lg bg-gray-50">
                <p className="text-sm sm:text-base text-gray-700">
                  <span className="font-semibold text-gray-800 block mb-1">Candidate's Message:</span>
                  {item?.description || "No message provided"}
                </p>
              </div>

            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 font-semibold">No proposals found</div>
        )}
      </div>
    </div>
  );
};

export default Proposal;

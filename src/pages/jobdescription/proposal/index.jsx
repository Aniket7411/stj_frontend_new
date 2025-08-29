import { useEffect, useState, useCallback, useMemo } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  // Memoized status options to prevent recreation on every render
  const statusOptions = useMemo(() => [
    { type: "applied", label: "All Proposals" },
    { type: "shortlist", label: "Shortlisted" },
    { type: "reject", label: "Rejected" },
    { type: "approved", label: "Approved" }
  ], []);

  // Debounced search implementation
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Memoized filtered proposals based on search query
  const filteredProposals = useMemo(() => {
    if (!searchQuery) return proposalList;
    
    const query = searchQuery.toLowerCase();
    return proposalList.filter(item => 
      item.username?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.contact?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query)
    );
  }, [proposalList, searchQuery]);

  // Optimized API call with useCallback
  const getProposalList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await HttpClient.get("/applyJob/read", {
        Id: JobId,
        type: "jobId",
        status: status,
      });

      setProposalList(response);
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, [JobId, status]);

  // Optimized status update with immediate UI feedback
  const updateStatus = async (id, newStatus) => {
    // Optimistic UI update
    setProposalList(prev => prev.filter(item => item._id !== id));
    
    try {
      const response = await HttpClient.put("/applyJob/update", {
        status: newStatus,
        proposalId: id,
      });
      toast.info(response?.message);
    } catch (err) {
      // Revert on error
      toast.error(err?.message);
      getProposalList(); // Refetch to restore correct state
    }
  };

  // Debounced search handler
  const handleSearchChange = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  useEffect(() => {
    getProposalList();
  }, [getProposalList]);

  return (
    <div className="p-2 md:p-4">
      <h4 className="text-xl md:text-2xl font-bold mb-2">Received Proposals</h4>

      <div className="border p-2 md:p-6 rounded-md shadow-lg bg-white">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
          {/* Proposal Status Filters */}
          <div className="flex flex-wrap font-semibold gap-4 text-xl sm:text-lg">
            {statusOptions.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setStatus(type)}
                className={`cursor-pointer whitespace-nowrap ${status === type
                    ? "text-blue-600 underline"
                    : "text-gray-600 hover:text-blue-500"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <input
              type="search"
              placeholder="Search proposals..."
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full md:w-72 py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-4">
            <ClipLoader size={35} color="#407BFF" />
          </div>
        ) : filteredProposals.length > 0 ? (
          <div className="space-y-6">
            {filteredProposals.map((item) => (
              <div key={item?._id} className="border-b pb-6 last:border-b-0">
                {/* Profile Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start md:items-center space-x-4">
                    {/* Profile image placeholder */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#D3555A] font-semibold truncate">
                        {item?.username}
                      </p>
                      <p className="text-black truncate">{item?.email}</p>
                      <p className="text-[#505050] truncate">{item?.contact}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                    {status === 'reject' && (
                      <span className="text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        Rejected
                      </span>
                    )}

                    {status === 'shortlist' && (
                      <>
                        <button
                          onClick={() => updateStatus(item?._id, "reject")}
                          className="bg-[#D3555A] text-white py-1 px-3 rounded-md hover:bg-[#B94A45] transition text-sm whitespace-nowrap"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => updateStatus(item?._id, "approved")}
                          className="bg-[#407BFF] text-white py-2 px-4 rounded-md hover:bg-[#0056b3] transition text-sm whitespace-nowrap"
                        >
                          Approve
                        </button>
                      </>
                    )}

                    {status === 'applied' && (
                      <>
                        <button
                          onClick={() => updateStatus(item?._id, "reject")}
                          className="bg-[#D3555A] text-white py-2 px-3 rounded-md hover:bg-[#B94A45] transition text-sm whitespace-nowrap"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => updateStatus(item?._id, "shortlist")}
                          className="bg-[#407BFF] text-white py-2 px-4 rounded-md hover:bg-[#0056b3] transition text-sm whitespace-nowrap"
                        >
                          Shortlist
                        </button>
                      </>
                    )}
                    {status === 'approved' && (
                      <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-semibold shadow-sm whitespace-nowrap">
                        Approved
                      </span>
                    )}
                  </div>
                </div>

                {/* Proposal Details */}
                <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-4">
                  {/* Resume Link */}
                  {item?.resume && item?.resume !== "" && (
                    <div className="flex items-center space-x-2">
                      <p className="text-sm whitespace-nowrap">Resume:</p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item?.resume}
                        className="bg-[#F2F2F2] flex items-center space-x-2 py-2 px-3 rounded-md text-black hover:bg-[#e0e0e0] transition text-sm"
                      >
                        <IoEye />
                        <span className="font-semibold whitespace-nowrap">View Resume</span>
                      </a>
                    </div>
                  )}

                  {/* Cover Letter Link */}
                  {item?.coverLetter && item?.coverLetter !== "" && (
                    <div className="flex items-center space-x-2">
                      <p className="text-sm whitespace-nowrap">Cover Letter:</p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item?.coverLetter}
                        className="bg-[#F2F2F2] flex items-center space-x-2 py-2 px-3 rounded-md text-black hover:bg-[#e0e0e0] transition text-sm"
                      >
                        <IoEye />
                        <span className="font-semibold whitespace-nowrap">View Cover Letter</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Candidate's Message */}
                <div className="mt-3 p-3 border rounded-lg bg-gray-50">
                  <p className="text-sm sm:text-base text-gray-700 break-words">
                    <span className="font-semibold text-gray-800 block mb-1">Candidate's Message:</span>
                    {item?.description || "No message provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 font-semibold py-8">
            {searchQuery ? "No matching proposals found" : "No proposals found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposal;
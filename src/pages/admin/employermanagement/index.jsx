import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { HttpClient } from "../../../server/client/http";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Admindashboard from "../adminpanel";
import { Link } from "react-router-dom";

const Employermanagement = () => {
  const [employersData, setEmployersData] = useState([]);
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getEmployers = async () => {
    setIsLoading(true);
    try {
      const response = await HttpClient.get("/admin/employers");
      const formattedData = response.employers.map((eachEmployer) => ({
        id: eachEmployer.userId,
        email: eachEmployer.email,
        isVerified: eachEmployer.isVerified,
        name: eachEmployer.name,
      }));
      setEmployersData(formattedData);
      setFilteredEmployers(formattedData);
      setCurrentPage(1); // Reset to first page when data changes
    } catch (err) {
      console.error("Error fetching employers:", err);
      toast.error("There is some error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching

    if (query === "") {
      setFilteredEmployers(employersData);
    } else {
      const filteredData = employersData.filter((employer) =>
        employer.name.toLowerCase().includes(query.toLowerCase()) ||
        employer.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEmployers(filteredData);
    }
  };

  const handleVerificationToggle = async (id, currentStatus) => {
    try {
      const response = await HttpClient.patch(`/admin/user/verify/${id}/${!currentStatus}`, {
        status: !currentStatus,
      });
      if (response.success) {
        getEmployers();
      } else {
        toast.error("Failed to update verification status");
      }
    } catch (err) {
      toast.error("Error updating verification status");
      console.error(err);
    }
  };

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployers.length / itemsPerPage);

  useEffect(() => {
    getEmployers();
  }, []);

  return (
    <div className="flex">
      <Admindashboard />

      <div className="p-8 w-[100%] bg-[#F2F9FF]">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4 mt-5">Employer Management</h1>
          <p className="text-sm text-gray-500">{new Date().toDateString()}</p>
        </div>

        {/* Search Bar */}
        <div className="mb-2">
          <input
            type="search"
            placeholder="Search by name or email"
            className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <hr className="mb-2" />

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Jobs</th>
              </tr>
            </thead>

            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <ClipLoader size={50} color="#4ade80" />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((employer) => (
                    <tr key={employer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Switch
                          offColor="#f87171"
                          onColor="#4ade80"
                          checked={employer.isVerified}
                          onChange={() => handleVerificationToggle(employer.id, employer.isVerified)}
                          uncheckedIcon={false}
                          checkedIcon={false}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                        <Link to={`/courses-admin/${employer.id}`} className="hover:underline">
                          View Details
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                        <Link to={`/postedjobs/${employer.id}`} className="hover:underline">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No employers found
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>

          {/* Pagination Controls */}
          {filteredEmployers.length > itemsPerPage && (
            <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredEmployers.length)}
                </span> of{" "}
                <span className="font-medium">{filteredEmployers.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employermanagement;
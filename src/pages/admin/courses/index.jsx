import React, { useState } from 'react';
import AdminPanelNavbar from "../adminpanel/index";
import { HttpClient } from '../../../server/client/http';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiDollarSign, FiInfo, FiUsers } from 'react-icons/fi';
import ClipLoader from 'react-spinners/ClipLoader';
import { MdCurrencyPound } from 'react-icons/md';

const CourseTable = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setAllCourses] = useState();
  const [course, setSingleCourse] = useState();
  const navigate = useNavigate();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust this number

  const getAllCourses = async () => {
    setIsLoading(true);
    try {
      const response = await HttpClient.get("/course/get/admin/data", {
        createdBy: params?.id
      });
      const formattedCategories = response?.data.map((each) => ({
        _id: each?._id,
        title: each?.courseDetails?.title,
        company: each?.createdBy,
        educator: each?.courseDetails?.instructorName,
        totalAmount: each?.courseDetails?.amount * each?.enrolledCandidates?.length,
        enrolledCandidates: each?.enrolledCandidates?.length || 0,
      }));
      setAllCourses(formattedCategories);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleData = async (id) => {
    try {
      setIsLoading(true);
      const response = await HttpClient.get(`/course/get/${id}`);
      console.log("formattedCourses", response);

      const eachCourse = response;
      const course = {
        courseId: eachCourse?._id,
        productId: eachCourse?.productId,
        courseImage: eachCourse?.courseCertificates?.courseImage,
        courseTitle: eachCourse?.courseDetails?.title,
        cratedOn: eachCourse?.createdAt,
        createdBy: eachCourse?.createdBy,
        address: eachCourse?.courseDetails?.address?.address,
        townCity: eachCourse?.courseDetails?.address?.town_city,
        postCode: eachCourse?.courseDetails?.address?.postCode,
        amount: eachCourse?.courseDetails?.amount,
        days: eachCourse?.courseDetails?.days,
        duration: eachCourse?.courseDetails?.duration,
        enrollmentLimit: eachCourse?.courseDetails?.enrollmentLimit,
        startDate: eachCourse?.courseDetails?.startDate,
        endDate: eachCourse?.courseDetails?.endDate,
        courseCategory: eachCourse?.courseDetails?.category,
        startHour: eachCourse?.courseDetails?.startTime?.hour,
        startAmPM: eachCourse?.courseDetails?.startTime?.am_pm,
        endHour: eachCourse?.courseDetails?.endTime?.hour,
        endAmPM: eachCourse?.courseDetails?.endTime?.am_pm,
        courseDescription: eachCourse?.courseDetails?.description,
        certificateImage: eachCourse?.courseCertificates?.certificateImage,
        courseInstructor: eachCourse?.courseDetails?.instructorName,
      };

      navigate(`/coursedescription/${id}`, { state: { course } });
      setSingleCourse(course);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Get current courses for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(courses?.length / itemsPerPage) || 1;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="flex">
      <AdminPanelNavbar />
      <div className="mt-[60px] w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader size={50} color="#3b82f6" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Educator
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <FiUsers className="inline mr-1" /> Enrolled
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <MdCurrencyPound className="inline mr-1" /> Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item?.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item?.educator}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item?.enrolledCandidates}
                          </span>
                        </td>
                        <td className="px-2 py-4 whitespace-nowrap">
                          <button
                            onClick={() => fetchSingleData(item._id)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                          >
                            <FiInfo className="mr-1" /> Details
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-900">
                          £{item?.totalAmount || 0}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No courses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination controls */}
            {courses?.length > itemsPerPage && (
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, courses.length)}
                  </span>{' '}
                  of <span className="font-medium">{courses.length}</span> results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTable;
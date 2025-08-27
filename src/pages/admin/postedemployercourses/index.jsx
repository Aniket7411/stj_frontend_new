import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Switch from "react-switch";
import { HttpClient } from "../../../server/client/http";

const EmployersCourses = () => {
    const { id } = useParams(); // Get the 'id' from the URL params
      const location = useLocation();
    
  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Define error state
    
    useEffect(() => {
      
      const fetchJobs = async () => {
        setIsLoading(true);
        setError(null); // Reset error on each fetch
  
        try {
          const employerId = id || location?.pathname.split("/").pop(); // Get employer ID
          const response = await HttpClient.get(`/courses/courses-posts/employer`, {
            employerId,
          });
  
     
        } catch (err) {
          console.error("Error fetching jobs:", err);
          setError("Failed to load jobs. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchJobs();
    }, [id, location?.pathname]);
  


  const [courses, setCourses] = useState([
    { id: 1, name: "React Basics", date: "2025-01-01", status: "pending" },
    {
      id: 2,
      name: "Advanced JavaScript",
      date: "2025-01-05",
      status: "approved",
    },
    {
      id: 3,
      name: "Node.js Fundamentals",
      date: "2025-01-10",
      status: "pending",
    },
  ]);

  const handleStatusToggle = (id) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id
          ? {
              ...course,
              status: course.status === "approved" ? "pending" : "approved",
            }
          : course
      )
    );
  };

  return (
    <div className="p-6 bg-[#F2F9FF]">
      <h1 className="text-2xl font-bold mb-4 mt-5">Employer's Courses</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-[#fff] border border-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">#</th>
              <th className="px-4 py-2 border-b text-left">Course Name</th>
              <th className="px-4 py-2 border-b text-right">Posted Date</th>
              <th className="px-4 py-2 border-b text-center">Status</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-left">{index + 1}</td>
                <td className="px-4 py-2 border-b text-left">{course.name}</td>
                <td className="px-4 py-2 border-b text-right">{course.date}</td>
                <td className="px-4 py-2 border-b text-center">
                  <Switch
                    onChange={() => handleStatusToggle(course.id)}
                    checked={course.status === "approved"}
                    offColor="#facc15" // Tailwind's yellow-500
                    onColor="#22c55e" // Tailwind's green-500
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => alert(`Viewing details for ${course.name}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployersCourses;

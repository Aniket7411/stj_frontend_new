import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5); // Set initial countdown duration

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000); // Update every second

    if (seconds === 0) {
      navigate("/"); // Redirect when countdown reaches 0
    }

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [seconds, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-600">Page Not Found</p>
      <p className="mt-2 text-lg text-gray-500">
        Redirecting to the Login page in <span className="font-bold">{seconds}</span>{" "}
        second{seconds !== 1 && "s"}...
      </p>
      <Link
        to="/login"
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

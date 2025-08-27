import React from "react";
import { Link } from "react-router-dom";

const LoginOrSignup = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* <h1 className="text-6xl font-bold text-gray-800">404</h1> */}
      <p className="mt-4 text-2xl text-gray-600">
        Please{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>{" "}
        or{" "}
        <Link to="/signup" className="text-blue-500">
          Register
        </Link>{" "}
        first
      </p>
      <div className="flex gap-4 mt-5"></div>
    </div>
  );
};

export default LoginOrSignup;

import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../../components/loader";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userType, setUserType] = useState("employee"); // Track user type
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    confirmPassword: "",
    phoneNumber: "",
    acceptTerms: false,
    referralCode: ""
  });

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("signupForm"));
    const savedUserType = localStorage.getItem("userType");

    if (savedFormData) setFormData(savedFormData);
    if (savedUserType) setUserType(savedUserType);
  }, []);

  // Save form data to localStorage on change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedForm = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(updatedForm);
    localStorage.setItem("signupForm", JSON.stringify(updatedForm));
  };

  // Save userType to localStorage when changed
  const handleUserTypeChange = (type) => {
    setUserType(type);
    localStorage.setItem("userType", type);
  };

  const isFormValid =
  formData.name &&
  formData.email &&
  formData.password &&
  (userType !== 'employer' || formData.companyName) &&  // Fixed condition for employer
  formData.confirmPassword &&
  formData.password === formData.confirmPassword &&
  formData.phoneNumber.length === 11 &&
  formData.acceptTerms;


  const formSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/user/signup`,
        { ...values, role: userType }
      );

      if (response?.status === 201) {
        toast.success("Registration done. A verification link is sent to your mail.");
        setLoading(false);
        localStorage.removeItem("signupForm");
        localStorage.removeItem("userType");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit(formData);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center p-2 relative"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/viplav2411/image/upload/v1731752753/signup_bg_eokj7c.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        style={{ zIndex: 1 }}
      ></div>

      {/* Form Container */}
      <div
        className="relative z-10 p-4 rounded-lg mt-10 shadow-lg w-full max-w-md bg-white bg-opacity-80"
        style={{ boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }}
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-black">
          Sign Up
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`w-[110px] mr-2 rounded-lg font-bold py-1 ${userType === "employee"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border border-red-500"
            }`}
            onClick={() => handleUserTypeChange("employee")}
          >
            Personal User
          </button>
          <button
            type="button"
            className={`w-[110px] rounded-lg font-bold py-1 ${userType === "employer"
                ? "bg-red-500 text-white"
                : "bg-white text-red-500 border border-red-500"
            }`}
            onClick={() => handleUserTypeChange("employer")}
          >
            Business User
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="w-full p-2 rounded-lg border border-gray-300"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
{
  userType === "employer" ? 
  <div className="mb-3">
    <input
      type="text"
      name="companyName"
      className="w-full p-2 rounded-lg border border-gray-300"
      placeholder="Enter Company Name"
      value={formData.companyName}
      onChange={handleInputChange}
      required
    />
  </div> : ""
}



          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="w-full p-2 rounded-lg border border-gray-300"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full p-2 rounded-lg border border-gray-300"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-3 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="w-full p-2 rounded-lg border border-gray-300"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {formData.password &&
              formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-red-500">Passwords do not match</p>
              )}
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <span className="bg-gray-100 rounded-md px-3 py-2 text-gray-700">
                +44
              </span>
              <input
  type="tel"
  name="phoneNumber"
  className="w-full p-2 rounded-lg border-l-0"
  placeholder="Enter your phone number"
  pattern="[0-9]{11}" // Ensures exactly 11 numeric digits
  inputMode="numeric" // Displays numeric keypad on mobile devices
  title="Phone number must be exactly 11 digits."
  maxLength={11} // Limits input to 11 characters
  value={formData.phoneNumber}
  onChange={(e) => {
    const value = e.target.value;
    // Allow only numbers in the input field
    if (/^\d*$/.test(value)) {
      handleInputChange(e); // Call your input handler for valid input
    }
  }}
  required
/>

            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex flex-wrap items-center mb-3">
            <input
              type="checkbox"
              name="acceptTerms"
              className="mr-2"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              required
            />
            <label className="text-black">
              I accept the{" "}
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => {
                  navigate("/termsofservice");
                }}
              >
                {/* <Link to="/termsofservice">Terms and Conditions</Link> */}
                Terms and Conditions
              </span>
            </label>

            <input
              type="text"
              name="referralCode"
              value={formData.referralCode || ""}
              onChange={handleInputChange}
              className="rounded-lg px-2 py-1 mb-1 mt-1 outline-none"
              placeholder="Referral code"
            />
          </div>

          {/* Submit Button */}
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <button
              type="submit"
              className={`w-full ${
                isFormValid ? "bg-red-500" : "bg-gray-400 cursor-not-allowed"
              } text-md text-white py-1 px-3 h-[40px] rounded-lg font-bold`}
              disabled={!isFormValid}
            >
              Sign Up
            </button>
          )}

          {/* Already have an account */}
          <p className="text-center mt-3 text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

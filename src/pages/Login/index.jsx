import axios from "axios";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/loader";
import { toast } from "react-toastify";
import { HttpClient } from "../../server/client/http";
import { LogIn } from "../../server/user";
// import { useDispatch } from "react-redux";
import { setRole } from "../../Redux/roleSlice";
import Modal from "react-modal";
import { CiLock } from "react-icons/ci";
import { useEffect } from "react";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // const formLogin = async (values) => {
  //  // console.log(values);
  //   try {
  //   //  debugger
  //     setLoading(true);
  //     const response = await axios.post(`${process.env.REACT_APP_URL}/user/login`, values);
  //     if (response) {
  //       setLoading(false);
  //     }
  //     localStorage.setItem(
  //       "USER_INFO",
  //       JSON.stringify({ role: response?.data?.userData?.role })
  //     );
  //     const role = localStorage.getItem("USER_INFO");
  //     console.log(role, "43");

  //     console.log(localStorage.getItem("USER_INFO"));
  //     LogIn(response?.data);
  //     toast.success("Login Successfully");
  //     console.log(response.data?.userData?.name, "name");
  //     localStorage.setItem(
  //       "name",
  //       JSON.stringify({ role: response?.data?.userData?.name })
  //     );

  //     // window.location.reload();
  //     // if (role.role === "admin") {
  //     //   window.open("/admindasbored", "_blank", "noopener,noreferrer");
  //     // } else {
  //       window.location.reload();
  //       localStorage.setItem('navigateTo', '/'); 
  //    // window.open("/", "_blank", "noopener,noreferrer");
  //     // }


  //     // dispatch(setRole(response.userData.role));
  //     // localStorage.setItem("role", JSON.stringify(response.userdata.role));
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     toast.error(error?.response?.data?.message);
  //   }
  // };


  const formLogin = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_URL}/user/login`, values);
      setLoading(false)

      const role = response?.data?.userData?.role?.toLowerCase(); // Ensure role is lowercase for consistency
      console.log(role, "43");

      localStorage.setItem(
        "USER_INFO",
        JSON.stringify({ role: role })
      );

      console.log(localStorage.getItem("USER_INFO"));
      LogIn(response?.data);
      toast.success("Login Successfully");
      console.log(response.data?.userData?.name, "name");
      localStorage.setItem(
        "name",
        JSON.stringify({ name: response?.data?.userData?.name })
      );

      // window.location.reload();
      // if (role.role === "admin") {
      //   window.open("/admindasbored", "_blank", "noopener,noreferrer");
      // } else {

      if (response?.data?.userData?.role === 'employer') {
        // debugger;
        //setTimeout(()=>setLoading(false),10000)
        window.location.href = '/employerprofile';
        // window.location.reload();
      }
      else if (response?.data?.userData?.role === 'employee') {
        //navigate('/userprofile')
        window.location.href = '/userprofile';
      }
      else if (response?.data?.userData?.role === 'admin') {
        // navigate('/admin-dashboard')
        window.location.href = '/admin-dashboard';
      }
      //localStorage.setItem('navigateTo', '/');
      // window.open("/", "_blank", "noopener,noreferrer");
      // }


      // dispatch(setRole(response.userData.role));
      // localStorage.setItem("role", JSON.stringify(response.userdata.role));
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      //alert("Login successful!");
      console.log(formData);
      // Perform login logic here
    }
    formLogin(formData);
  };

  // useEffect(() => {
  //   // Check if navigation target exists
  //   const navigateTo = localStorage.getItem('navigateTo');
  //   if (navigateTo) {
  //     navigate(navigateTo); // Navigate to the target
  //     localStorage.removeItem('navigateTo');
  //   }
  // }, [navigate]);
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex justify-end sm:justify-center items-center p-5"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/viplav2411/image/upload/v1731757039/flglvmkwb34b1v108z0l.png")',
      }}
    >
      {/* Dark overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      {/* Login form container */}
      <div className="relative z-10 p-6 bg-white bg-opacity-60 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-black text-2xl font-bold text-center mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-white w-full mt-2 rounded-lg p-2 border border-gray-300"
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {/* Password Field */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-white w-full mt-2 rounded-lg p-2 border border-gray-300"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          {/* Keep me logged in */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="keepLoggedIn"
              checked={formData.keepLoggedIn}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-black">Keep me logged in</label>
          </div>
          {/* Submit Button */}
          {loading === false ? (
            <button
              type="submit"
              className="w-full h-[40px] bg-red-500 text-white text-lg rounded-lg px-2 py-1 mt-2"
            >
              Login
            </button>
          ) : (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {/* Forgot Password */}
          <p className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="text-white font-bold text-lg hover:text-[#c5363c] hover:underline focus:outline-none transition-all"
            >
              Forgot Password?
            </button>
          </p>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker overlay for better contrast
                zIndex: 1000, // Ensure overlay covers everything behind
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              content: {
                color: "black",
                padding: "40px",
                maxWidth: "500px",
                margin: "auto",
                borderRadius: "12px", // Slightly rounded corners for a softer look
                backgroundColor: "#fff",
                zIndex: 1010, // Ensure content appears above overlay
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.1)", // More subtle shadow effect
              },
            }}
          >
            <div className="flex justify-end w-full mb-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#c5363c] text-lg font-light hover:text-[#D3555A] transition-all"
                aria-label="Close modal"
              >
                <span className="text-2xl font-bold">&times;</span>{" "}
                {/* X symbol for close */}
              </button>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
              Reset Password
            </h2>
            <CiLock size={45} className="text-[#c5363c] mb-4" />{" "}
            {/* Slightly bigger icon */}
            <div className="flex flex-col items-center w-full">
              <p className="text-lg text-center mb-4 text-gray-600">
                Please Enter Your Email Address To Receive a Reset Password Link
              </p>

              <label htmlFor="email" className="mb-2 text-sm text-gray-500">
                Email Address
              </label>
              <div className="w-full mb-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#c5363c] focus:border-[#c5363c] text-sm"
                />
              </div>



              {
                loading === false ?
                  <button
                    onClick={async () => {
                      try {
                      //  debugger
                        setLoading(true)
                        const response = await HttpClient.post('/user/sendOtp', {
                          email: email
                        })
                        setLoading(false);
                        if (response.success === true) {
                          toast.success(response?.message);
                          setLoading(false);
                          setIsModalOpen(false)

                        }
                      } catch (err) {
                        toast.error( "user not registered with this email")

                      }
                    }}
                    className="w-[200px] bg-[#000] text-white px-4 py-1 rounded-lg text-lg font-semibold hover:bg-[#333] transition-all">
                    Send Link
                  </button> :
                  <Spinner />
              }
            </div>
          </Modal>

          {/* Don't have an account */}
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#ff3E45] font-bold">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import { CiTwitter } from "react-icons/ci";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HttpClient } from "../../server/client/http";
import { toast } from "react-toastify";

const ContactUs = () => {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Submitted Data:", formData);
      // Reset form
      try{
         const response=await HttpClient.post('/support',formData);
      if(response.success){
        setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
      }

      }catch(err){
        toast.error(err.response.data.message||err.message||"internal server error")
      }
      
    }
  };

  // Change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: "url('/assets/contactbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center w-11/12 lg:w-3/4 gap-10">
        {/* Contact Form */}
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Contact Us
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            Feel free to contact us anytime. We will get back to you as soon as
            we can!
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                name="name"
          value={formData.name}
          onChange={handleChange}
                type="text"
                placeholder="Name"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                 name="email"
          value={formData.email}
          onChange={handleChange}
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <textarea
                maxLength={200}
               name="message"
          value={formData.message}
          onChange={handleChange}
                placeholder="Message "
                rows="4"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <div>{formData.message.length}{"/"}{200}</div>
               {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white text-sm rounded-md py-1 hover:bg-gray-800 transition-colors"
            >
              Send
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="flex-1 ml-2 bg-black text-white rounded-lg p-6 md:p-8 lg:p-10">
          <h2 className="text-lg font-semibold mb-3">Info</h2>
          <p className="text-sm mb-3">
            <a
              href="mailto:info@trajansecurity.co.uk"
              className="underline hover:text-gray-300"
            >
              info@trajansecurity.co.uk
            </a>
          </p>
          <p className="text-sm mb-3">
            Trajan Security (UK) Ltd
            <br />
            48 Green Lanes, Palmers Green,
            <br />
            London, N13 5RT
          </p>
          <p className="text-sm mb-5">0208 920 6682</p>
          <div className="flex space-x-4">
            {/* linkedin */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/securethatjob.com/about/"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1877F2] text-[#fff] text-2xl hover:opacity-90"
            >
              {/* Icon or Text Here */}
              <FaLinkedin />
            </a>

              {/* instagram */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/securethatjob/?hl=en"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1877F2] text-[#fff] text-2xl hover:opacity-90"
            >
              {/* Icon or Text Here */}
              <FaInstagram />
            </a>
            {/* <a
              href="/"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1D9BF0] text-[#fff] text-2xl hover:opacity-90"
            >
              <CiTwitter />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

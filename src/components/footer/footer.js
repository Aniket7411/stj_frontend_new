import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  const role = localStorage.getItem("USER_INFO");
  // console.log(role, "kk");

  return (
    <footer className="bg-white text-black p-2">
      <div className="mx-auto flex flex-col sm:flex-row lg:justify-between px-4 md:px-10">
        {/* Left Section */}
        <div className="flex flex-col items-start space-y-4 mb-2">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/assets/logoWithText.svg"
              alt="logo"
              className="w-[200px]"
            />
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 text-2xl gap-3">
            <a
              href="https://www.linkedin.com/company/securethatjob.com/about/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:text-red-500" />
            </a>
            {/* <Link to="/">
              <FaTwitter className="hover:text-red-500" />
            </Link> */}
            <a
              href="https://www.instagram.com/securethatjob/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-red-500" />

            </a>
          </div>
        </div>

        {/* Center Links */}
        <div className="flex space-x-16">
          <div className="flex flex-col space-y-2">
            <a href="/" className="hover:text-red-500">
              Home
            </a>
            <a href="/about-us" className="hover:text-red-500">
              About Us
            </a>
            <a href="/termsofservice" className="hover:text-red-500">
              Terms & Uses
            </a>
            {/* <a href="#" className="hover:text-red-500">
              Terms of Use
            </a> */}
          </div>
          <div className="flex flex-col space-y-2">
            {!role && (
              <a href="/" className="hover:text-red-500">
                Login/Register
              </a>
            )}
            <a href="/faqs" className="hover:text-red-500">
              FAQ
            </a>
            {/* <a href="#" className="hover:text-red-500">
              Feedback
            </a> */}
            <a href="/contact-us" className="hover:text-red-500">
              Contact Us
            </a>
          </div>
        </div>
        {/* Copyright */}
      </div>
      <p className="text-sm text-gray-500 text-center mt-4 mb-4">
        © 2024 <span className="text-red-500">securethatjob.com</span>
      </p>
    </footer>
  );
}

export default Footer;

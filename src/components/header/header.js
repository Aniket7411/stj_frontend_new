import React, { useState, useEffect, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu4Fill, RiCloseFill } from "react-icons/ri";
import "./header.css";
import { useLocation } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import Modal from "react-modal";
import ProfileContext from "../../profilecontext";
import { HttpClient } from "../../server/client/http";


import { NotificationContext } from "../../pages/notificationprovider";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  //const signupStatus = localStorage.getItem("login-status"); // Fetch signup status
  const signupStatus = localStorage.getItem("accessToken");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { profile, loading, error } = useContext(ProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, notificationCount, getNotifications, setNotificationCount, notificationCountToShow,
    setNotificationCountToShow } = useContext(NotificationContext);

  // Format time as "X minutes ago", "Yesterday", etc.
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const inputDate = new Date(dateString);

    const timeDifference = now - inputDate; // Difference in milliseconds
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutesAgo < 1) {
      return "Just now";
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else if (daysAgo === 1) {
      return "Yesterday";
    } else {
      return inputDate.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };



  // Mark notification as read when clicked
  const handleNotificationClick = (notificationId) => {
    // Your implementation to mark as read
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setIsOpen(!isOpen);
  };

  // Calculate unread count
  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;
  setNotificationCount(unreadCount);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setNotificationCountToShow(0)
  };



  let notificationsCount = notifications.filter(notification => !notification.isRead).length;

  console.log("notificationsnotificationsnotonsnotificationsnotific", notificationsCount); // Output: 0



  const loggedIn = localStorage.getItem("accessToken") !== null

  console.log("accessTokenaccessTokenaccessToken", loggedIn)

  let hideTimeout;
  const handleMouseEnter = () => {
    // Clear any existing hide timeout
    clearTimeout(hideTimeout);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    // Set a timeout to hide the dropdown
    hideTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 100); // Adjust delay as needed
  };

  const location = useLocation();
  // Check if the current route is "findjobs"
  const isFindJobsRoute =
    location.pathname === "/findjobs" ||
    location.pathname === "/" ||
    location.pathname === "/employerinfo" ||
    location.pathname === "/employerProfile" ||
    location.pathname === "/enterjobdetails" ||

    location.pathname === "/jobrequirements" ||
    location.pathname === "/jobtimings" ||
    location.pathname === "/publishjob" ||



    location.pathname === "/entercompanydetails";

  const notificationColor = location.pathname === "/userprofile"


  console.log("isFindJobsRoute", isFindJobsRoute)

  const navigate = useNavigate();
  const clickToLogout = () => {
    // localStorage.setItem("login-status", false)
    localStorage.clear();
    navigate("/");
  };
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 10) {
      setIsScrolled(true); // Trigger when scrolled past half the viewport height
    } else {
      setIsScrolled(false);
    }
  };
  // Add or remove the 'no-scroll' class to body when menu is toggled
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  //   const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  // Set up event listener for scroll


  useEffect(() => {
    // Add event listener only if the currentPath is NOT "findjobs"
    // if (currentPath !== "findjobs") {
    window.addEventListener("scroll", handleScroll);
    // }

    // Cleanup the event listener
    return () => {
      if (currentPath === "findjobs") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentPath]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  useEffect(() => {
    getNotifications()
  }, [])


  const Navbar1 = (
    <div className="flex items-center font-semibold justify-between px-3  md:px-10 py-5">
      {/* Left-side items */}
      <ul className="flex items-center gap-8 w-[40%]">
        <Link to="/">
          <li className="text-[#000000] text-xl font-bold">
            <img
              src="/assets/logoWithText.svg"
              alt="logo"
              className="w-[160px]"
            />
          </li>
        </Link>
      </ul>
      {/* Menu toggle icon */}
      <ul className="w-[20%] flex justify-center">
        <li>
          <RiMenu4Fill
            className="text-[#000000] text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </li>
      </ul>
      {/* Right-side items */}
      <ul
        className={`flex items-center  gap-6 w-[40%] text-[15px] justify-end ${isFindJobsRoute ? "text-[#000]" : "text-[#000]"
          }`}
      >
        <Link to="/login">
          <li
            className={` cursor-pointer ${isScrolled ? "text-red-800 " : ""}`}
          >
            Sign In
          </li>
        </Link>
        <Link to="/signup">
          <li
            className={` cursor-pointer ${isScrolled ? "text-red-800 " : ""}`}
          >
            Join
          </li>
        </Link>
      </ul>
    </div>
  );
  // Navbar 2
  const Navbar2 = (
    <div className="flex items-center  justify-between p-3">
      {/* Left-side items */}
      <ul className="flex items-center gap-8 w-[40%]">
        <Link to="/">
          <li className="text-[#000000] text-xl font-bold">
            <img
              src="/assets/logoWithText.svg"
              alt="logo"
              className="w-[160px]"
            />
          </li>
        </Link>
      </ul>
      {/* Menu toggle icon */}
      <ul className="md:hidden flex gap-2 items-center w-[15%]">

        <li className="relative r cursor-pointer ">
          <IoIosNotifications
            onClick={toggleModal}
            size={26}

            className={
              currentPath === "findjobs" ||
                currentPath === "userprofile" ||
                currentPath === "employerprofile" ||
                currentPath === "courses" ||
                currentPath === "createdjob"
                ? "text-red-800"
                : isScrolled
                  ? "text-red-800"
                  : "text-red-800"
            }
          />



          {notificationCountToShow !== 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"> {notificationCountToShow}
          </span>}




        </li>
        <li className="flex justify-center">
          <RiMenu4Fill
            className="text-[#000000] text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </li>
      </ul>
      {/* Right-side items */}
      <div className="hidden md:block md:w-[40%]">
        <ul
          className={`flex items-center gap-3 text-[15px] justify-end ${isFindJobsRoute ? "text-[#fff]" : "text-[#000]"
            }`}
        >
          {" "}
          <Link to="/courses">
            <li
              className={`cursor-pointer ${currentPath === "findjobs"
                ? "bg-white text-red-800"
                : isScrolled
                  ? " text-red-800"
                  : ""
                }`}
            >
              Courses
            </li>
          </Link>
          {JSON.parse(localStorage.getItem("userData"))?.role ===
            "employer" && (
              <>
                <Link to="/findcandidate">
                  <li
                    className={` cursor-pointer ${currentPath === "findjobs"
                      ? "bg-white text-red-800"
                      : isScrolled
                        ? "text-red-800 "
                        : ""
                      }`}
                  >
                    Find Candidate
                  </li>
                </Link>


                <Link to="/entercompanydetails">
                  <li
                    className={` cursor-pointer ${currentPath === "findjobs"
                      ? "bg-white text-red-800"
                      : isScrolled
                        ? "text-red-800 "
                        : ""
                      }`}
                  >
                    Post Jobs
                  </li>
                </Link>
              </>
            )}
          {/* {JSON.parse(localStorage.getItem('userData'))?.role === "employee" && ( */}
          <Link to="/findjobs">
            <li
              className={` cursor-pointer ${currentPath === "findjobs"
                ? "bg-white text-red-800"
                : isScrolled
                  ? "text-red-800 "
                  : ""
                }`}
            >
              Find Jobs
            </li>
          </Link>
          {/* Notification Bell Icon with Badge */}
          <li className="relative cursor-pointer">
            <div className="relative" onClick={toggleModal}>
              <IoIosNotifications
                size={28}
                className={currentPath === "findjobs" || currentPath === "employerprofile" || currentPath === "courses" || currentPath === "createdjob"
                  ? "text-red-800"
                  : isScrolled
                    ? "text-red-800"
                    : "text-red-800"
                }
              />





              {notificationCountToShow !== 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"> {notificationCountToShow}
              </span>}




            </div>
          </li>

          {/* Notification Modal */}
          <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="Notifications Modal"
            className="modal-content bg-white rounded-lg shadow-2xl w-96 max-h-[80vh] overflow-y-auto absolute top-16 right-4 transform transition-all duration-200 ease-out"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[1000]"
            ariaHideApp={false}
            style={{
              overlay: {
                zIndex: 1000,
              },
              content: {
                zIndex: 1001,
              }
            }}
          >
            <div className="sticky top-0 bg-white z-10 p-4 border-b shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    Notifications
                  </h2>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  {notifications?.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={toggleModal}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {notifications?.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-4 transition-colors duration-150 ${!notification.isRead ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
                    onClick={() => handleNotificationClick(notification._id)}
                  >
                    <div className="flex gap-3">
                      {!notification.isRead && (
                        <div className="mt-1 flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className={`font-medium truncate ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}>
                            {notification.title.charAt(0).toUpperCase() + notification.title.slice(1)}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatTimeAgo(notification.sentAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification?.body
                            ? notification?.body.charAt(0).toUpperCase() + notification?.body.slice(1)
                            : "No content available."}
                        </p>
                        {notification?.link && (
                          <a
                            href={notification.link}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Open notification link"
                          >
                            View Details
                          </a>
                        )}


                        <div className="mt-2 flex justify-between items-center">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${notification.isRead
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}

                          </span>
                          {!notification.isRead && (
                            <span className="text-xs font-medium text-blue-600 animate-pulse">NEW</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="text-gray-500 font-medium">No notifications yet</h3>
                  <p className="text-gray-400 text-sm mt-1">We'll notify you when something arrives</p>
                </div>
              )}
            </div>
          </Modal>





          {/* )} */}
          <li className="relative">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Profile Image */}


              <div className="flex items-center gap-2">
                <div className="relative h-[35px] w-[35px] rounded-full overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-110 hover:ring-2 hover:ring-blue-500 flex justify-center items-center bg-gray-300">
                  {profile?.profile?.personalInformation?.profileImage ? (
                    <img
                      src={profile?.profile?.personalInformation?.profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold">
                      {(JSON.parse(localStorage.getItem("userData"))?.name || "")
                        .split(" ") // Split the full name by spaces
                        .map((n) => n[0]) // Extract the first letter of each part
                        .join("") // Join the initials
                        .toUpperCase() // Convert to uppercase
                      }
                    </span>
                  )}
                </div>
              </div>


              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-lg border p-2">
                  <ul className="text-[#000]">
                    {JSON.parse(localStorage.getItem("userData"))?.role ===
                      "admin" ? (
                      ""
                    ) : (
                      <Link
                        to={
                          JSON.parse(localStorage.getItem("userData"))?.role ===
                            "employee"
                            ? "/userprofile"
                            : "/employerprofile"
                        }
                      >
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">
                          Profile
                        </li>
                      </Link>
                    )}
                    {JSON.parse(localStorage.getItem("userData"))?.role ===
                      "admin" && (
                        <Link to="/admin-dashboard">
                          <li className="p-2 hover:bg-gray-100 cursor-pointer">
                            Dashboard
                          </li>
                        </Link>
                      )}
                    {JSON.parse(localStorage.getItem("userData"))?.role ===
                      "employer" && (
                        <Link to="/createdjob/alljobs">
                          <li className="p-2 hover:bg-gray-100 cursor-pointer">
                            My Jobs
                          </li>
                        </Link>
                      )}{" "}
                    {JSON.parse(localStorage.getItem("userData"))?.role ===
                      "employer" && (
                        <Link to="/my-courses">
                          <li className="p-2 hover:bg-gray-100 cursor-pointer">
                            My Courses
                          </li>
                        </Link>
                      )}
                    {JSON.parse(localStorage.getItem("userData"))?.role ===
                      "employee" && (
                        <Link to="/savedJobs">
                          <li className="p-2 hover:bg-gray-100 cursor-pointer">
                            Saved jobs
                          </li>
                        </Link>
                      )}


                      {JSON.parse(localStorage.getItem("userData"))?.role ===
                      "employee" && (
                        <Link to="/saved_courses">
                          <li className="p-2 hover:bg-gray-100 cursor-pointer">
                            Saved Courses
                          </li>
                        </Link>
                      )}
                    {/* <li className="p-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li> */}

                    {
                      loggedIn && <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={clickToLogout}
                      >
                        Logout
                      </li>
                    }


                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>

        <div className="fixed top-4 right-4 z-50">



        </div>

      </div>
    </div>
  );


  console.log("profileprofileprofile", (JSON.parse(localStorage.getItem("userData")))?.name)
  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${currentPath === "findjobs"
        ? "bg-white shadow-lg text-red-800"
        : isScrolled
          ? "bg-white shadow-lg text-red-800"
          : "bg-transparent text-white"
        }`}
    >
      {/* Conditionally render Navbar */}
      {signupStatus != undefined ? Navbar2 : Navbar1}
      {/* Full-page overlay (visible when menu is open) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
        />
      )}
      {/* Sliding navigation menu */}
      <div
        className={`${menuOpen ? "max-h-screen" : "max-h-0"
          } overflow-hidden bg-[#fff] transition-[max-height] duration-300 fixed inset-0 z-50`}
      >
        {/* Close button */}
        <div className="absolute top-8 right-10 cursor-pointer">
          <RiCloseFill className="text-4xl text-[#000]" onClick={toggleMenu} />
        </div>
        <nav className="flex justify-start md:justify-center items-center text-center h-full py-20 px-4">
          <ul
            className="flex flex-col items-start md:items-center  gap-7 text-[#000] 
               lg:text-5xl sm:text-lg"
          >
            <Link to="/" onClick={toggleMenu}>
              <li className="transition-all duration-300 font-thin font-futura hover:text-red-800 hover:scale-125">
                Home
              </li>
            </Link>

            {JSON.parse(localStorage.getItem("userData"))?.role === "employer" && (
              <Link to="/entercompanydetails" onClick={toggleMenu}>
                <li className="transition-all duration-300 font-futura hover:text-red-800 hover:scale-125">
                  Post Jobs
                </li>
              </Link>
            )}

            <Link to="/findjobs" onClick={toggleMenu}>
              <li className="transition-all duration-300 font-futura hover:text-red-800 hover:scale-125">
                Find Jobs
              </li>
            </Link>

            <Link to="/courses" onClick={toggleMenu}>
              <li className="transition-all duration-300 font-futura hover:text-red-800 hover:scale-125">
                Courses
              </li>
            </Link>

            <Link to="/termsofservice" onClick={toggleMenu}>
              <li className="transition-all duration-300 font-futura font-[100] hover:text-red-800 hover:scale-125">
                Terms of Service
              </li>
            </Link>

            <Link to="/contact-us" onClick={toggleMenu}>
              <li className="transition-all duration-300 font-futura font-[100] hover:text-red-800 hover:scale-125">
                Contact Us
              </li>
            </Link>

            <ul className="flex flex-col  gap-7 text-[#000]">
              {JSON.parse(localStorage.getItem("userData"))?.role === "admin" ? (
                ""
              ) : (
                <Link
                  to={
                    JSON.parse(localStorage.getItem("userData"))?.role === "employee"
                      ? "/userprofile"
                      : "/employerprofile"
                  }
                >
                  <li className="hover:bg-gray-100 cursor-pointer">Profile</li>
                </Link>
              )}
              {JSON.parse(localStorage.getItem("userData"))?.role === "admin" && (
                <Link to="/admin-dashboard">
                  <li className="hover:bg-gray-100 cursor-pointer">Dashboard</li>
                </Link>
              )}
              {JSON.parse(localStorage.getItem("userData"))?.role === "employer" && (
                <Link to="/createdjob">
                  <li className="hover:bg-gray-100 cursor-pointer">My Jobs</li>
                </Link>
              )}
              {JSON.parse(localStorage.getItem("userData"))?.role === "employer" && (
                <Link to="/my-courses">
                  <li className="hover:bg-gray-100 cursor-pointer">My Courses</li>
                </Link>
              )}
              {JSON.parse(localStorage.getItem("userData"))?.role === "employee" && (
                <Link to="/savedJobs">
                  <li className="p-2 hover:bg-gray-100 cursor-pointer">Saved Jobs</li>
                </Link>
              )}

              {JSON.parse(localStorage.getItem("userData"))?.role === "employee" && (
                <Link to="/saved_courses">
                  <li className="p-2 hover:bg-gray-100 cursor-pointer">Saved Course</li>
                </Link>
              )}

              {
                loggedIn && <li
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={clickToLogout}
                >
                  Logout
                </li>
              }

            </ul>
          </ul>
        </nav>

      </div>
    </header>
  );
}
export default Header;

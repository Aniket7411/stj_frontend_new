import React, { useEffect, useState } from "react";

import "./index.css";
import { MdArrowBackIos, MdArrowForward, MdArrowOutward } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { MdOutlineArrowOutward } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import securevideo from "../../assests/securevideo.mp4";
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5"; import './home.css';
import { FaClock } from "react-icons/fa6";
import { PiHandshake } from "react-icons/pi";
import { MdLock } from "react-icons/md";
import { TbInvoice } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import SingleScreen from "../SingleScreen/SingleScreen";
import Cards from "../cards";
import NewCards from "../newcards/index"
import { Link } from "react-router-dom";
import { HttpClient } from "../../server/client/http";





function Homepage() {
  // const [leftWidth, setLeftWidth] = useState(50);
  // const [rightWidth, setRightWidth] = useState(50);
  // const [leftScale, setLeftScale] = useState(1);
  // const [rightScale, setRightScale] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSec3, setIsVisibleSec3] = useState(false);
  const [mouseActive, setMouseActive] = useState(true)
  const [step, setStep] = useState(0)


  // const [leftImageHeight, setLeftImageHeight] = useState("65%");
  // const [rightImageHeight, setRightImageHeight] = useState("65%");
  // const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);
  // const [isRightButtonVisible, setIsRightButtonVisible] = useState(false);
  // const [isMouseMoveEnabled, setIsMouseMoveEnabled] = useState(true);
  // const [isRightContentVisible, setIsRightContentVisible] = useState(true);
  // const [hideImg, setHideImg] = useState(true);
  // const [hideLeftImg, setHideLeftImg] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [iconWidth, setIconWidth] = useState(40)

  const [leftWidth, setLeftWidth] = useState(50);
  const [rightWidth, setRightWidth] = useState(50);
  const [leftScale, setLeftScale] = useState(1);
  const [rightScale, setRightScale] = useState(1);
  const [leftImageHeight, setLeftImageHeight] = useState("65%");
  const [rightImageHeight, setRightImageHeight] = useState("65%");
  const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);
  const [isRightButtonVisible, setIsRightButtonVisible] = useState(false);
  const [isMouseMoveEnabled, setIsMouseMoveEnabled] = useState(true);
  const [isRightContentVisible, setIsRightContentVisible] = useState(true);
  const [hideImg, setHideImg] = useState(true);
  const [hideLeftImg, setHideLeftImg] = useState(true);
  const [newst, setNewst] = useState(false);
  const [isRightSectionHidden, setIsRightSectionHidden] = useState(false);
  const [isLeftSectionHidden, setIsLeftSectionHidden] = useState(false);


  const setInitial = () => {
    console.log(50)
    setLeftWidth(50);
    console.log(leftWidth)
    setRightWidth(50);
  };

  // Function to handle mouse movement
  // const handleMouseMove = (event) => {
  //   if (!isMouseMoveEnabled) return;

  //   const screenWidth = window.innerWidth;
  //   const cursorX = event.clientX;
  //   const cursorPercent = (cursorX / screenWidth) * 100;

  //   if (cursorPercent <= 40) {
  //     setLeftWidth(60);
  //     setRightWidth(40);
  //     setLeftScale(1.4);
  //     setRightScale(1);
  //     setLeftImageHeight("68%");
  //     setRightImageHeight("32%");
  //   } else if (cursorPercent >= 60) {
  //     setLeftWidth(40);
  //     setRightWidth(60);
  //     setLeftScale(1);
  //     setRightScale(1.2);
  //     setLeftImageHeight("32%");
  //     setRightImageHeight("68%");
  //   } else {
  //     setLeftWidth(50);
  //     setRightWidth(50);
  //     setLeftScale(1.1);
  //     setRightScale(1.1);
  //     setLeftImageHeight("65%");
  //     setRightImageHeight("65%");
  //   }
  // };

  // Function to handle mouse movement
  //   const handleMouseMove = (event) => {
  //     if (mouseActive) {
  //         const screenWidth = window.innerWidth;
  //         const cursorX = event.clientX;
  //         const cursorPercent = (cursorX / screenWidth) * 100;

  //         if (cursorPercent <= 40) {
  //             setLeftWidth(60);
  //             setRightWidth(40);
  //             setLeftScale(1.2);
  //             setRightScale(1);
  //         } else if (cursorPercent >= 60) {
  //             setLeftWidth(40);
  //             setRightWidth(60);
  //             setLeftScale(1);
  //             setRightScale(1.2);
  //         } else {
  //             setLeftWidth(50);
  //             setRightWidth(50);
  //             setLeftScale(1);
  //             setRightScale(1);
  //         }
  //     }
  // };



  // Handle "left" button click
  // const handleMouseMoveLeft = () => {
  //   setLeftWidth(90);
  //   setRightWidth(10);
  //   setLeftScale(1.6);
  //   setRightScale(1);
  //   setLeftImageHeight("85%");
  //   setIsLeftButtonVisible(true);
  //   setIsRightButtonVisible(false);
  //   setIsRightContentVisible(false); // Hide right content with sliding effect
  //   setIsMouseMoveEnabled(false);
  //   setHideLeftImg(false);
  //   setMouseActive(false)
  // };

  // Handle "right" button click
  // const handleMouseMoveRight = () => {
  //   setLeftWidth(10);
  //   setRightWidth(90);
  //   setLeftScale(1);
  //   setRightScale(1.1);
  //   setRightImageHeight("85%");
  //   setIsRightButtonVisible(true);
  //   setIsLeftButtonVisible(false);
  //   setIsRightContentVisible(true);
  //   setIsMouseMoveEnabled(false);
  //   setHideImg(false);
  // };


  // Handle "back" button click to reset
  // const handleBackClick = () => {
  //   setLeftWidth(50);
  //   setRightWidth(50);
  //   setLeftScale(1);
  //   setRightScale(1);
  //   setLeftImageHeight("65%");
  //   setRightImageHeight("65%");
  //   setIsLeftButtonVisible(false);
  //   setIsRightButtonVisible(false);
  //   setIsRightContentVisible(true); // Show right content
  //   setIsMouseMoveEnabled(true);
  //   setHideLeftImg(true);
  // };

  // Function to handle mouse movement
  const handleMouseMove = (event) => {
    if (!isMouseMoveEnabled) return;

    const screenWidth = window.innerWidth;
    const cursorX = event.clientX;
    const cursorPercent = (cursorX / screenWidth) * 100;

    if (cursorPercent <= 40) {
      setLeftWidth(65);
      setRightWidth(35);
      setLeftScale(1.4);
      setRightScale(1);
      setLeftImageHeight("65%");
      setRightImageHeight("38%");
    } else if (cursorPercent >= 60) {
      setLeftWidth(35);
      setRightWidth(65);
      setLeftScale(1);
      setRightScale(1.4);
      setLeftImageHeight("38%");
      setRightImageHeight("77%");
    } else {
      setLeftWidth(50);
      setRightWidth(50);
      setLeftScale(1.1);
      setRightScale(1.1);
      setLeftImageHeight("65%");
      setRightImageHeight("65%");
    }
  };

  // Handle "left" button click
  const handleMouseMoveLeft = () => {
    setLeftWidth(90);
    setRightWidth(10);
    setLeftScale(1.6);
    setRightScale(1);
    setLeftImageHeight("85%");
    setIsLeftButtonVisible(true);
    setIsRightContentVisible(false); // Hide right content with sliding effect
    setIsMouseMoveEnabled(false);
    setHideLeftImg(false);
    setIsRightSectionHidden(true);
  };

  // Handle "right" button click
  const handleMouseMoveRight = () => {
    setLeftWidth(10);
    setRightWidth(90);
    setLeftScale(1);
    setRightScale(1.3);
    setLeftImageHeight("38%");
    setRightImageHeight("75%");
    setIsRightButtonVisible(true);
    setIsLeftButtonVisible(false);
    setIsRightContentVisible(true);
    setIsMouseMoveEnabled(false);
    setHideImg(false);
    setNewst(true);
    setIsLeftSectionHidden(true);
  };

  // Handle "back" button click to reset
  const handleBackClick = () => {
    setLeftWidth(50);
    setRightWidth(50);
    setLeftScale(1);
    setRightScale(1);
    setLeftImageHeight("65%");
    setRightImageHeight("65%");
    setIsLeftButtonVisible(false);
    // setIsRightButtonVisible(false);
    setIsRightContentVisible(true); // Show right content
    setIsMouseMoveEnabled(true);
    setHideLeftImg(true);
    setIsRightSectionHidden(false);
  };

  const handleBackRightClick = () => {
    setLeftWidth(50);
    setRightWidth(50);
    setLeftScale(1);
    setRightScale(1);
    setLeftImageHeight("65%");
    setRightImageHeight("65%");
    setIsRightButtonVisible(false);
    setIsRightContentVisible(true); // Show right content
    setIsMouseMoveEnabled(true);
    setHideLeftImg(true);
    setNewst(false);
    setIsLeftSectionHidden(false);
  };



  const handleVideoClick = () => {
    setIsFullScreen(prev => !prev); // Toggle fullscreen state on click
  };

  // Setup the Intersection Observer to observe visibility
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true); // When the element is visible in the viewport
        }
      });
    }, { threshold: .1 }); // Trigger when 1% of the element is visible

    const elements = document.querySelectorAll('.scroll-element'); // Query all elements with 'scroll-element' class
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element)); // Clean up observer
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisibleSec3(true); // When the element is visible in the viewport
        } else {
          setIsVisibleSec3(false); // When the element is out of the viewport
        }
      });
    }, { threshold: 0.1 }); // Trigger when 30% of the element is visible

    // Query all elements with the 'scroll-sec3' class
    const elements = document.querySelectorAll('.scroll-sec3');

    // Start observing the elements
    elements.forEach(element => observer.observe(element));

    // Capture the current state of elements before the effect cleans up
    return () => {
      elements.forEach(element => observer.unobserve(element)); // Cleanup observer
    };
  }, []); // Empty dependency array to run only once on mount/unmount

  // // Function to reset both sections to initial 50-50 layout
  // const setInitial = () => {
  //   setLeftWidth(50);
  //   setRightWidth(50);
  //   setLeftScale(1);
  //   setRightScale(1);
  //   setMouseActive(true); // Reactivate mouse scaling
  // };

  // Function to set left section to 90% width
  const clickToSetLeftWidth = () => {
    setLeftWidth(90);
    setRightWidth(10);
    setLeftScale(1.1); // Slight scale-up effect
    setRightScale(1);
    setMouseActive(false); // Disable mouse scaling
  };

  // // Function to set right section to 90% width
  // const clickToSetRightWidth = () => {
  //     setRightWidth(90);
  //     setLeftWidth(10);
  //     setRightScale(1.1); // Slight scale-up effect
  //     setLeftScale(1);
  //     setMouseActive(false); // Disable mouse scaling
  //     setIsMouseMoveEnabled(false)
  // };


  useEffect(() => {
    console.log("Ananan")

  }, [leftWidth])
  // Function to set right section to 90% width
  const clickToSetRightWidth = () => {
    setRightWidth(90);
    setLeftWidth(10);
    setRightScale(1.1); // Slight scale-up effect
    setLeftScale(1);
    setMouseActive(false); // Disable mouse scaling
  };




  const checkcheck = async () => {
    try {
      const response = await fetch("http://217.21.95.69:5000/api/admin/dashboard-stats");
      const data = await response.json();
      console.log("Dashboard stats:", data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    checkcheck();
  }, []);






  //functionality for section 5 cards section
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cards = [
    {
      title: 'Secure work last minute',
      icon: <FaClock size={30} />,
      activeGradient: 'linear-gradient(90deg, rgba(255, 126, 126, 0.32) 13.73%, rgba(255, 80, 80, 0.28) 60.63%, rgba(255, 191, 191, 0.18) 101.57%)',
      inactiveGradient: 'linear-gradient(90deg, rgba(214, 214, 226, 0.36) 6.36%, rgba(214, 214, 226, 0.28) 28.11%, rgba(112, 112, 127, 0.12) 98.16%)',
      backgroundImage: '/assets/tab3.jpg'
    },
    {
      title: 'Dispute   Resolutions',
      icon: <PiHandshake size={30} />,
      activeGradient: 'linear-gradient(90deg, rgba(255, 126, 126, 0.32) 13.73%, rgba(255, 80, 80, 0.28) 60.63%, rgba(255, 191, 191, 0.18) 101.57%)',
      inactiveGradient: 'linear-gradient(90deg, rgba(214, 214, 226, 0.36) 6.36%, rgba(214, 214, 226, 0.28) 28.11%, rgba(112, 112, 127, 0.12) 98.16%)',
      backgroundImage: '/assets/tab2.jpg'
    },
    {
      title: 'Your money is secure',
      icon: <MdLock size={30} />,
      activeGradient: 'linear-gradient(90deg, rgba(255, 126, 126, 0.32) 13.73%, rgba(255, 80, 80, 0.28) 60.63%, rgba(255, 191, 191, 0.18) 101.57%)',
      inactiveGradient: 'linear-gradient(90deg, rgba(214, 214, 226, 0.36) 6.36%, rgba(214, 214, 226, 0.28) 28.11%, rgba(112, 112, 127, 0.12) 98.16%)',

      backgroundImage: '/assets/tab1.jpg'
    },
    {
      title: 'Bid for work at the right pay',
      icon: <TbInvoice size={30} />,
      activeGradient: 'linear-gradient(90deg, rgba(255, 126, 126, 0.32) 13.73%, rgba(255, 80, 80, 0.28) 60.63%, rgba(255, 191, 191, 0.18) 101.57%)',
      inactiveGradient: 'linear-gradient(90deg, rgba(214, 214, 226, 0.36) 6.36%, rgba(214, 214, 226, 0.28) 28.11%, rgba(112, 112, 127, 0.12) 98.16%)',
      backgroundImage: '/assets/tab4.jpg'
    },
    {
      title: 'All members are verified',
      icon: <MdVerified size={30} />,
      activeGradient: 'linear-gradient(90deg, rgba(255, 126, 126, 0.32) 13.73%, rgba(255, 80, 80, 0.28) 60.63%, rgba(255, 191, 191, 0.18) 101.57%)',
      inactiveGradient: 'linear-gradient(90deg, rgba(214, 214, 226, 0.36) 6.36%, rgba(214, 214, 226, 0.28) 28.11%, rgba(112, 112, 127, 0.12) 98.16%)',
      backgroundImage: '/assets/tab6.jpg'
    },
    {
      title: 'Rating system to improve your reputation',
      icon: <FaStar size={30} />,
      activeGradient: 'linear-gradient(90deg, rgba(255, 126, 126, 0.32) 13.73%, rgba(255, 80, 80, 0.28) 60.63%, rgba(255, 191, 191, 0.18) 101.57%)',
      inactiveGradient: 'linear-gradient(90deg, rgba(214, 214, 226, 0.36) 6.36%, rgba(214, 214, 226, 0.28) 28.11%, rgba(112, 112, 127, 0.12) 98.16%)',
      backgroundImage: '/assets/tab5.jpg'
    },
    {
      title: 'Find the right person',
      icon: <CgProfile size={30} />,
      activeGradient: 'linear-gradient(90deg, rgba(255, 126, 126, 0.32) 13.73%, rgba(255, 80, 80, 0.28) 60.63%, rgba(255, 191, 191, 0.18) 101.57%)',
      inactiveGradient: 'linear-gradient(90deg, rgba(214, 214, 226, 0.36) 6.36%, rgba(214, 214, 226, 0.28) 28.11%, rgba(112, 112, 127, 0.12) 98.16%)',
      backgroundImage: '/assets/tab7.jpg',
    }
  ];
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, cards.length]);




  // const handleMouseMove = (e) => {
  //   const windowWidth = window.innerWidth;
  //   const cursorPosition = e.clientX; // Horizontal position of the cursor

  //   const newLeftWidth = (cursorPosition / windowWidth) * 100;
  //   const newRightWidth = 100 - newLeftWidth;

  //   // Update widths based on cursor position (zoom when cursor >75% left or right)
  //   if (newLeftWidth < 25) {
  //     setLeftWidth(80);
  //     setRightWidth(20);
  //   } else if (newRightWidth < 25) {
  //     setLeftWidth(20);
  //     setRightWidth(80);
  //   } else if (newLeftWidth >= 10 && newLeftWidth <= 90) {
  //     setLeftWidth(newLeftWidth);
  //     setRightWidth(newRightWidth);
  //   }
  // };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = document.getElementById('section-three').offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;

      // Trigger animation only once (on first scroll to section-three)
      if (!hasScrolled) {
        if (scrollPosition > sectionTop + 200) setStep(1); // Show title
        if (scrollPosition > sectionTop + 300) setStep(2); // Show description
        if (scrollPosition > sectionTop + 500) setStep(3); // Show cards
        if (scrollPosition > sectionTop + 600) {
          setStep(4); // Show separated cards
          setHasScrolled(true); // Mark as scrolled to stop re-triggering animation
        }
      }
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);






  return (
    <div style={{ maxWidth: "100vw" }}>
      {/* man and lady section */}

      {/* <div className="containerx">
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          transition: "all 1.5s ease-in-out",
        }}
        onMouseMove={handleMouseMove}
      >
        <div
          className="left-section"
          style={{
            width: `${leftWidth}%`,
          }}
        >
          {!isLeftSectionHidden && (
            <>
              <div
                style={{
                transform: `scale${leftScale}%`,
                  transformOrigin: "top left",
                  transition: "all 1.2s ease",
                  marginTop: "5rem",
                  paddingLeft: "3rem",
                  zIndex:'10',

                }}
              >
                {(isLeftButtonVisible || isRightButtonVisible) && (
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onClick={handleBackClick}
                  >
                    Back
                  </div>
                )}
                <h2 style={{ fontSize: "12px", fontWeight: "600" }}>
                  For Employers
                </h2>
                <h2 style={{ fontSize: "36px", fontWeight: "900" }}>
                  Hire the Talent That <br /> Drives Your Business <br />{" "}
                  Forward
                </h2>
                <p style={{ fontSize: "12px", fontWeight: "400" }}>
                  Discover top candidates, streamline your recruitment <br />
                  process, and build a team that excels.
                </p>
                <button className="left-button">Post Your Job</button>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: "2rem",
                  height: leftImageHeight,
                  transform: `scale${leftScale}%`,
                  transformOrigin: "top right",
                  transition: "all 1.2s ease",
                }}
              >
                <img
                  src="https://res.cloudinary.com/viplav2411/image/upload/v1731477320/iaa9gnlxz0itmgxx7huo.png"
                  alt=""
                  className="left-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    transformOrigin: "bottom left",
                    transition: "transform 1.2s ease",
                  }}
                />
              </div>

              {!isLeftButtonVisible && !isRightButtonVisible && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "50%",
                    right: "1rem",
                    cursor: "pointer",
                    opacity: isLeftButtonVisible ? 0 : 1,
                    transition: "opacity 1.2s ease",
                    zIndex:'110'
                  }}
                  onClick={handleMouseMoveLeft}
                >
                  <FaChevronLeft />

                </div>
              )}
            </>
          )}
        </div>

        <div
          // className="right-section"
          className="right-section rightt"
          style={{
            width: `${rightWidth}%`,

          }}
        >
          {!isRightSectionHidden && (
            <>
             {!isRightButtonVisible && !isLeftButtonVisible && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "50%",
                    left: "1rem",
                    cursor: "pointer",
                    opacity: isRightButtonVisible ? 0 : 1,
                    transition: "opacity 1.2s ease",
                    zIndex:'110'

                  }}
                  onClick={handleMouseMoveRight}
                >
                  <FaChevronRight />
                </div>
              )}
              <div
className={`${newst ? "right-section-to" : ""}`}
style={{
                  // marginTop: "5rem",
                  paddingLeft: "5rem",
                  transform: `scale(${rightScale})`,
                  zIndex:'10',

                  // transform: `scale(${rightScale}) ${
                  //   !isRightContentVisible ? "translateX(100%)" : "translateX(0)"
                  // }`, // Slide out to the right
                  // height: rightImageHeight,
                  // transition: "transform 1.2s ease",
                  // transformOrigin: "top",

                  marginTop: "5rem",
                  height: "75%",
                  transition: "transform 1.2s ease-in-out",
                  // transform: "scale(1.3)",

                  transformOrigin: "top left",
                }}
              >
                {isRightButtonVisible && (
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      maxWidth: "maxContent",
                    }}
                    onClick={handleBackRightClick}
                  >
                    Back
                  </span>
                )}
                <h2 style={{ fontSize: "12px", fontWeight: "600" }}>
                  For Job Seekers
                </h2>
                <h2 style={{ fontSize: "36px", fontWeight: "900" }}>
                  Find Your Next <br /> Career Opportunity <br /> Today
                </h2>
                <p style={{ fontSize: "16px", fontWeight: "400", fontFamily:'montserrat' }}>
                  Find jobs that fit your skills and schedule. Apply
                  <br />
                  easily and get paid securely with our live <br /> booking system!
                </p>
                <button className="right-button">Browse Jobs</button>
              </div>
              {hideLeftImg && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: "2rem",
                    height: rightImageHeight,
                    transform: `scale(${rightScale})`,
                    transformOrigin: "top right",
                    transition: "all 1.2s ease",
                   }}
                >
                  <img
                    src="https://res.cloudinary.com/viplav2411/image/upload/v1731477332/tozbunwak2sqw9elkuei.png"
                    alt=""
                    className="right-image"
                    style={{
                      width: "100%",
                      height: "100%",
                      transformOrigin: "bottom left",
                      transition: "transform 1.2s ease",
                     }}
                  />
                </div>
              )}

             
            </>
          )}
        </div>
      </div>
    </div> */}

      <SingleScreen />

      {/* section2 */}
      <div className="p-8 flex justify-between flex-wrap mt-4 gap-3 md:gap-6">
        {/* First Container with animation on the card */}
        <div
          style={{ overflow: "hidden" }}
          className={`bg-[#fbfbfb] w-[100%] md:w-[48%] lg:w-[30%] rounded-3xl p-5 mb-3 scroll-element transform transition-transform duration-[1500ms] ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`} // Adjust the starting position (move to the left slightly)
        >
          <h1
            className={`transform transition-transform duration-[1500ms] ease-in-out text-3xl md:text-4xl lg:text-5xl
        ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}
          >
            <span className="italic">WHO</span>{" "}
            <span className="font-extrabold">
              WE <br /> ARE
            </span>
          </h1>
          <div className="flex justify-end items-center mt-4">
            <Link to="/about-us">
              <p
                className={`transform transition-transform duration-[1500ms] ease-in-out text-right underline
          ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}
              >
                Explore
              </p>
            </Link>
            <div
              className={`transform transition-transform duration-[1500ms] ease-in-out bg-black text-white rounded-full ml-1 p-2
          ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}
            >
              <Link to="/termsofservice">
                <MdOutlineArrowOutward />
              </Link>
            </div>
          </div>
        </div>

        {/* Second Container */}
        <div className="bg-[#C5363C] text-white w-full md:w-[48%] lg:w-[35%] rounded-3xl p-5 mb-3 scroll-element">
          <p
            className={`transform transition-transform duration-[1000ms] ease-in-out ${isVisible ? "translate-y-0" : "translate-y-10"
              }`}
          >
            /ABOUT
          </p>
          <p
            className={`transform transition-transform duration-[1500ms] ease-in-out text-right w-[95%] text-lg md:text-xl
      ${isVisible ? "translate-y-0" : "translate-y-10"}`}
          >
            <span className="font-bold">
              SECURETHATJOB bridges the <br /> gap between -{" "}
            </span>
            Skilled security
            <br /> professionals and the perfect <br /> Job Opportunities
          </p>
        </div>

        <div
          className={`bg-neutral-100 w-full md:w-[48%] lg:w-[30%] rounded-3xl p-5 mb-3 scroll-element transform transition-transform duration-[1500ms] ease-in-out ${isVisible ? "translate-x-0" : "-translate-x-[20%]"
            }`}
        >
          <p
            className={`transform transition-transform duration-[1500ms] font-bold ease-in-out text-1xl md:text-1xl lg:text-1xl ${isVisible ? "translate-x-0" : "-translate-x-[20%]"
              }`}
          >
            Our Team
          </p>

          <div className="relative flex">
            <img
              src="/assets/cap.svg"
              alt="profile"
              className="rounded-full w-20 h-20 border-white border-4"
            />
            <img
              className="rounded-full w-20 h-20 absolute left-12 border-white border-4"
              src="/assets/hat.svg"
              alt="2"
            />
            <img
              className="rounded-full w-20 h-20 absolute left-24 border-white border-4"
              src="/assets/girl.svg"
              alt="3"
            />
            <img
              className="rounded-full w-20 h-20 absolute left-36 border-white border-4"
              src="/assets/sitboy.svg"
              alt="4"
            />
          </div>

          <div className="flex justify-start items-center mt-4">
            <Link to="/contact-us">
              <p
                className={`transform transition-transform duration-[1500ms] ease-in-out text-right underline ${isVisible ? "translate-x-0" : "-translate-x-full"
                  }`}
              >
                Contact Us
              </p>
            </Link>
            <div
              className={`transform transition-transform duration-[1500ms] ease-in-out bg-black text-white rounded-full ml-1 p-2`}
            >
              <Link to="/contact-us">
                <MdOutlineArrowOutward />
              </Link>
            </div>
          </div>
        </div>

        {/* Fourth Container with flip animation */}
        <div
          className={`bg-black w-full md:w-[48%] h-[300px] lg:w-[30%] text-white rounded-3xl p-5 mb-3 scroll-element 
        ${isVisible ? "flip-card" : ""}`} // Apply the flip-card class when visible
        >
          <div className="border-2 border-dashed rounded-full border-white h-[230px] p-5 m-5 flex flex-col items-center justify-around">
            <div>
              <p className="mt-2 text-center text-1xl md:text-2xl">
                Unlock Your Potential with Our Courses
              </p>
            </div>

            <div className="flex items-center justify-center  bg-black">
              <Link to="/courses">
                <button className="flex items-center  bg-[#383838] p-5 w-[100px] text-white font-medium rounded-full hover:scale-105 transition-transform">
                  <span className="mr-1">Courses</span>
                  <MdArrowOutward />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Fifth Container */}
        <div className="relative text-white flex justify-between flex-col h-[300px] w-full sm:w-[90%] md:w-[48%] lg:w-[30%] rounded-3xl p-5 mb-3 scroll-element">
          {/* Top-Left Corner Image */}
          <div
            style={{
              backgroundImage: "linear-gradient(to bottom, #59BCD1, #071319)",
            }}
            className="absolute md:w-[100px] md:h-[100px] h-[70px] w-[70px] flex justify-center items-center top-[-3px]  md:top-[-10px] rounded-full outline"
          >
            <div className="flex flex-col items-center">
              <MdOutlineArrowOutward className="text-2xl" />

              <p className="text-white ">Explore</p>
            </div>
          </div>

          {/* Dashed Border Section with Rounded Image */}
          <div className="border-dashed border-2 rounded-full border-red-500">
            <img
              className="w-full p-3 rounded-full "
              src="assets/camera.png"
              alt="experient-image"
            />
            <div className="bg-green-300 rounded-full"></div>
          </div>

          {/* Content Section */}
          <h2 className=" text-black md:text-base text-center mt-2 text-sm">
            <span className="font-bold md:text-base  text-sm">
              Protect What Matters
            </span>{" "}
            - Monitor
            <br /> Secure and Stay Vigilant.
          </h2>

          {/* Arrow Buttons */}
          {/* <div className="flex">
                <div
                  className={`transform transition-transform duration-[1500ms] ease-in-out text-white rounded-full ml-1 px-2 py-2 md:py-4 md:px-4 lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] hover:scale-110 bg-gray-700
              ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}
                >
                  <FaArrowLeft className="opacity-50" />
                </div>

                <div
                  className={`transform transition-transform duration-[1500ms] ease-in-out bg-black text-white rounded-full ml-1 px-2 py-2 md:py-4 md:px-4 lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] hover:scale-110 hover:bg-gray-700
              ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}
                >
                  <FaArrowRight />
                </div>
              </div> */}
        </div>

        {/* Sixth Container with flip animation */}
        <div
          className={`flex items-center bg-black h-[300px] w-full text-center md:w-[48%] lg:w-[30%] text-white rounded-3xl p-5 mb-3 scroll-element 
        ${isVisible ? "flip-card" : ""}`} // Apply the flip-card class when visible
        >
          <p className="text-[15px] md:text-[16px] ">
            Whether in manned security, cybersecurity, or specialized roles. Our
            platform empowers you to discover jobs, receive instant payments,
            and advance your career effortlessly.
            <span className="text-gray-400 bold mt-2">
              {" "}
              <br />
              With key features like secure payments, worker ratings, and
              industry-leading training courses, we provide everything you need
              to succeed and thrive in the security field.
            </span>
          </p>
        </div>
      </div>
      {/*ideally section three*/}
      {/* <div className="mt-5 mb-10 md:block hidden">
        <div
          id="section-three"
          className="font-futura text-custom-lg font-normal leading-custom text-center"
    
        >
          <div className="font-section-three-futura text-section-three-lg leading-section-three-line text-center">
            <h2
              className={`title ${step >= 1 ? "visible" : ""} font-section-three-futura text-section-three-lg leading-section-three-line`}
            >
              We Offer
            </h2>
            <p
              className={`description ${step >= 2 ? "visible" : ""}`}
              style={{
                opacity: step === 2 ? 1 : 0,
                transform: step === 2 ? "scale(1)" : "scale(0.8)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              Here is a description of our offerings.
            </p>
          </div>

          <div
            className={`cards-container ${step >= 3 ? "visible" : ""} ${step >= 4 ? "separate" : ""}`}
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? "translateY(0)" : "translateY(100px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {[
              {
                title: "Security",
                img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image3_mrcntc.png",
                icon: "assets/icon2.png",
                description: "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
                buttonText: "I need Security →"
              },
              {
                title: "Jobs",
                img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image2_axs8kn.png",
                icon: "assets/icon1.png",
                description: "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
                buttonText: "Find Jobs→"
              },
              {
                title: "Training",
                img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image1_qhi5a8.png",
                icon: "assets/icon3.png",
                description: "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
                buttonText: "Security →"
              },
            ].map((card, index) => (
              <div
                key={index}
                className="card"
                style={{
                  backgroundImage: `url(${card.img})`,
                }}
              >
                <div className="icon-container">
                  <img src={card.icon} className="card-icon" style={{
                    height:"40px",
                    width: `${iconWidth}px` 
                  }} alt={`${card.title} Icon`} />
                  <div className="card-content">
                    <h3 className="card-title">{card.title}</h3>
                  </div>
                </div>


                <div className="card-hover-content"
                >

                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  <button className="card-button">{card.buttonText}</button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div> */}

      <NewCards />
      {/* <Cards /> */}

      {/*  */}

      <div className="flex flex-col items-center md:hidden space-y-5">
        {[
          {
            title: "Security",
            img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image3_mrcntc.png",
            icon: "assets/icon2.png",
            description:
              "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
            buttonText: "I need Security →",
          },
          {
            title: "Jobs",
            img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image2_axs8kn.png",
            icon: "assets/icon1.png",
            description:
              "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
            buttonText: "Find Jobs→",
          },
          {
            title: "Training",
            img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image1_qhi5a8.png",
            icon: "assets/icon3.png",
            description:
              "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
            buttonText: "Security →",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="w-[80%] flex flex-col items-center rounded-lg bg-center p-5 shadow-md relative"
            style={{
              backgroundImage: `url(${card.img})`,
            }}
          >
            <div className="hover:bg-opacity-75  hover:scale-105 transition-all duration-300 w-full relative">
              <img
                src={card.icon}
                className="mb-2 absolute top-4 left-4 w-10 h-10"
                alt={`${card.title} Icon`}
              />
              <h3 className="text-lg font-bold mb-2 text-white mt-5 text-center">
                {card.title}
              </h3>
              <p className="text-sm mb-3 text-white text-center ">
                {card.description}
              </p>
              <Link to="/findjobs">
                <button className="bg-blue-500 w-auto text-white rounded px-2 py-1 hover:bg-blue-600">
                  {card.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* section3  this is section four */}
      <div>
        <svg
          id="wave"
          style={{
            transform: "rotate(0deg)", // Correct usage of the rotate property
            transition: "transform 0.3s", // Apply transition for the transform property
          }}
          viewBox="0 0 1440 110"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(16.258, 4.408, 0.602, 0.99)" offset="0%" />
              <stop stopColor="rgba(255, 179, 11, 1)" offset="100%" />
            </linearGradient>
          </defs>
          <path
            style={{
              transform: "translate(0, 0px)",
              opacity: 1,
              transition: "transform 0.3s", // Ensure the path has its own transition
            }}
            fill="#000000"
            d="M0,55L20,49.5C40,44,80,33,120,31.2C160,29,200,37,240,33C280,29,320,15,360,9.2C400,4,440,7,480,14.7C520,22,560,33,600,44C640,55,680,66,720,60.5C760,55,800,33,840,27.5C880,22,920,33,960,44C1000,55,1040,66,1080,58.7C1120,51,1160,26,1200,25.7C1240,26,1280,51,1320,51.3C1360,51,1400,26,1440,23.8C1480,22,1520,44,1560,51.3C1600,59,1640,51,1680,44C1720,37,1760,29,1800,25.7C1840,22,1880,22,1920,31.2C1960,40,2000,59,2040,66C2080,73,2120,70,2160,69.7C2200,70,2240,73,2280,62.3C2320,51,2360,26,2400,23.8C2440,22,2480,44,2520,53.2C2560,62,2600,59,2640,53.2C2680,48,2720,40,2760,40.3C2800,40,2840,48,2860,51.3L2880,55L2880,110L2860,110C2840,110,2800,110,2760,110C2720,110,2680,110,2640,110C2600,110,2560,110,2520,110C2480,110,2440,110,2400,110C2360,110,2320,110,2280,110C2240,110,2200,110,2160,110C2120,110,2080,110,2040,110C2000,110,1960,110,1920,110C1880,110,1840,110,1800,110C1760,110,1720,110,1680,110C1640,110,1600,110,1560,110C1520,110,1480,110,1440,110C1400,110,1360,110,1320,110C1280,110,1240,110,1200,110C1160,110,1120,110,1080,110C1040,110,1000,110,960,110C920,110,880,110,840,110C800,110,760,110,720,110C680,110,640,110,600,110C560,110,520,110,480,110C440,110,400,110,360,110C320,110,280,110,240,110C200,110,160,110,120,110C80,110,40,110,20,110L0,110Z"
          />
        </svg>
        <div className="bg-[#000000]  text-white h-[100%] p-10">
          <div
            className={`transform scroll-sec3 transition-transform duration-[1000ms] ease-in-out ${isVisibleSec3 ? "translate-y-0" : "translate-y-20"
              }`}
          >
            <h1 className="lg:text-6xl sm:text-5xl text-gray-200 mb-2">
              <span className="italic">Reason</span>{" "}
              <span className="font-bold">to join us</span>
            </h1>
            <hr />
            <p className="sm:w-full text-center mt-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-inter">
              At SecureThatJob, safety is our top priority. We connect you with
              thoroughly vetted security professionals to protect your assets,
              while also offering a platform for job seekers to find
              opportunities tailored to their skills. Whether you're seeking
              protection or employment, we ensure a secure, reliable experience
              every step of the way.
            </p>
          </div>

          <div className="flex justify-center mt-4" style={{ height: "100%" }}>
            <div
              className={`video-container rounded-2xl ${isFullScreen ? "zoomed" : ""
                }`}
              onClick={handleVideoClick}
            >
              <video
                className={`video ${isFullScreen ? "full-screen" : ""}`}
                controls
              >
                <source
                  src="https://www.securethatjob.com/videos/Secure-that-Job-V7.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/*section five*/}
      <div className="">
        <div className="bg-black min-h-screen flex flex-col items-center py-16 text-white relative">
          {/* Title that changes according to the active card */}
          <h2 className="text-3xl font-bold text-center z-20">
            {cards[activeIndex]?.title || "Select a Card"}
          </h2>
          <hr className="gradient-divider z-20" />

          <Link to="/">
            <p className="mt-5 text-sm text-gray-400 text-center z-20">
              Need Someone Fast? Post Work or Find a Job With Our Live Booking
              System
            </p>
          </Link>

          {/* Gradient Black Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-black z-10" />

          {/* Dynamic background image */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-500 z-5"
            style={{
              backgroundImage: `url(${cards[activeIndex]?.backgroundImage})`,
              opacity: activeIndex !== null ? 1 : 0.3,
            }}
          />

          {/* Card Container */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 max-w-4xl relative z-20">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`w-32 p-3 h-32 flex flex-col items-center justify-center text-center rounded-lg shadow-lg cursor-pointer transition-all duration-300
          ${index === activeIndex ? "bg-[#c94b4b]" : "bg-gray-700"
                  } hover:bg-opacity-90`} // Default background when hovered
                onMouseEnter={() => setActiveIndex(index)} // Hover action to make it active
                onMouseLeave={() => {
                  // Reset hover on mouse leave, but keep the active index
                  if (activeIndex !== index) setActiveIndex(null);
                }}
                style={{
                  background: `${index === activeIndex
                    ? card.activeGradient
                    : card.inactiveGradient
                    }`, // Apply gradient based on hover or active state
                }}
              >
                <div className="mb-2">{card.icon}</div>
                <p className="text-sm font-thin ">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*section six above footer*/}
      <div>
        <div className="relative bg-black">
          <div className="mx-4 lg:mb-6 sm:mx-6 md:mx-10 flex flex-wrap gap-2 lg:justify-start justify-center items-center">
            <p className="text-[#ECECEC] font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:leading-[144px]">
              Security
            </p>
            <p className="text-[#ECECEC] font-poppins text-4xl sm:text-5xl md:text-6xl lg:text-6xl italic font-light leading-tight md:leading-[144px]">
              Categories
            </p>
          </div>

          {/* Image Container */}
          <div
            style={{
              position: "relative",
              height: "650px",
            }}
          >
            <div
              style={{
                padding: "10px 40px",
              }}
            >
              <hr className="border-t w-[100%] border-gray-300 mb-4" />
              <img
                src="/assets/industry.svg"
                alt="bg-signIn"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div
              className="hidden md:block"
              style={{
                position: "absolute",
                right: "20px",
                left: "20px",
                bottom: "130px",
              }}
            >
              <div
                className="flex gap-20 py-4 justify-around rounded-lg"
                style={{
                  outline: "1px solid gray",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
                }}
              >
                <div>
                  <ul className="text-[#ECECEC] space-y-2">
                    <li>Bailiff</li>
                    <li>Concierge</li>
                    <li>Door supervisor (DS)</li>
                    <li>Locksmith</li>
                    <li>Private detective</li>
                  </ul>
                </div>

                <div>
                  <ul className="text-[#fff] space-y-2">
                    <li>Cash & valuables in transit (CVIT)</li>
                    <li>Covid</li>
                    <li>Drone flyers</li>
                    <li>Medical security</li>
                    <li>Protection dog breeders</li>
                  </ul>
                </div>

                <div>
                  <ul className="text-[#fff] space-y-2">
                    <li>CCTV operator</li>
                    <li>Cyber security</li>
                    <li>Fire</li>
                    <li>Patrol</li>
                    <li>Protection dog trainers</li>
                  </ul>
                </div>

                <div>
                  <ul className="text-[#fff] space-y-2">
                    <li>Close protection (CP)</li>
                    <li>Dog handling</li>
                    <li>Key holding (KH)</li>
                    <li>Prison officers</li>
                    <li>Static installation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Overlayed List Container sm screen */}

          <div className="md:hidden   gradient-border absolute bottom-10 left-10 right-10 z-10 bg-black bg-opacity-60 p-6 rounded-lg backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center mt-6 md:mt-0">
              {/* Full List */}
              <ul className="text-[#fff] space-y-2 max-h-96 overflow-y-auto">
                {/* First batch of items */}
                <li>Bailiff</li>
                <li>Concierge</li>
                <li>Door supervisor (DS)</li>
                <li>Locksmith</li>
                <li>Private detective</li>

                {/* Second batch of items (conditionally rendered) */}
                {isVisible && (
                  <>
                    <li>Cash & valuables in transit (CVIT)</li>
                    <li>Covid</li>
                    <li>Drone flyers</li>
                    <li>Medical security</li>
                    <li>Protection dog breeders</li>
                    <li>CCTV operator</li>
                    <li>Cyber security</li>
                    <li>Fire</li>
                    <li>Patrol</li>
                    <li>Protection dog trainers</li>
                    <li>Close protection (CP)</li>
                    <li>Dog handling</li>
                    <li>Key holding (KH)</li>
                    <li>Prison officers</li>
                    <li>Static installation</li>
                  </>
                )}
              </ul>

              {/* "See More" button */}
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="text-blue-400 mt-4 hover:underline"
              >
                {isVisible ? "See Less" : "See More"}
              </button>
            </div>
          </div>

          {/* above */}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
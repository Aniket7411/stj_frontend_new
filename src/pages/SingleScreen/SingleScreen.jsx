import React, { useState } from "react";
import "./SingleScreen.css";
import insightsImg from "../../assests/leftSec.jpg";
import dashbGirl from "../../assests/dashbGirl.png";
import backIcon from "../../assests/arrowBackWhite.svg";
import arrowBackBlack from "../../assests/arrowBackBlack.svg";





import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function SingleScreen() {
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
    } else if (cursorPercent >= 72) {
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

  return (
    <>
      <div className="containerx">
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
                    transform: `scale(${leftScale})`,
                    transformOrigin: "top left",
                    transition: "all 1.2s ease",
                    marginTop: "5rem",
                    paddingLeft: "3rem",
                    zIndex: "10",
                  }}
                >
                  {(isLeftButtonVisible || isRightButtonVisible) && (
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display:'flex',
                        alignItems:'center',
                        marginBottom:'1rem',
                      }}
                      onClick={handleBackClick}
                    >
                      <img src={arrowBackBlack}  width={22} height={10} className="me-3" alt="" />
                      Back
                    </div>
                  )}
                  <div>
                    <h2
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        marginLeft: "6px",
                      }}
                    >
                      For Employers
                    </h2>
                    <h2
                      style={{ fontSize: "36px", fontWeight: "900" }}
                      className="italic"
                    >
                      Hire the Talent That <br /> Drives Your Business <br />{" "}
                      Forward
                    </h2>
                    <p style={{ fontSize: "12px", fontWeight: "400" }}>
                      Discover top candidates, streamline your recruitment{" "}
                      <br />
                      process, and build a team that excels.
                    </p>
                  </div>
                  <Link
                    to={
                      JSON.parse(localStorage.getItem("userData"))?.role ===
                      "employee"
                        ? "/courses"
                        : JSON.parse(localStorage.getItem("userData"))?.role ===
                          "employer"
                        ? "/entercompanydetails"
                        : "/login"
                    }
                  >
                    <button className="left-button w-[120px]">
                      {
                        (JSON.parse(localStorage.getItem("userData"))?.role ===
                      "employee") ? "Browse Courses" :
                      "Post Your Job"
                      }
                    </button>
                  </Link>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: "2rem",
                    height: leftImageHeight,
                    transform: `scale(${leftScale})`,
                    transformOrigin: "top right",
                    transition: "all 1.2s ease",
                  }}
                >
                  <img
                    src={insightsImg}
                    alt=""
                    className="left-image mt-6"
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
                      right: "0.5rem",
                      cursor: "pointer",
                      opacity: isLeftButtonVisible ? 0 : 1,
                      transition: "opacity 1.2s ease",
                      zIndex: "10",
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
                      left: "0.5rem",
                      cursor: "pointer",
                      opacity: isRightButtonVisible ? 0 : 1,
                      transition: "opacity 1.2s ease",
                      zIndex: "10",
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
                    zIndex: "10",

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
                        display:'flex',
                        alignItems:'center',
                        marginBottom:'1rem'
                      }}
                      onClick={handleBackRightClick}
                    >
                      <img height={10} width={22} src={backIcon} className="me-3" alt="" />
                      Back
                    </span>
                  )}
                  <h2 style={{ fontSize: "12px", fontWeight: "600" }}>
                    For Job Seekers
                  </h2>
                  <h2
                    style={{ fontSize: "36px", fontWeight: "900" }}
                    className="italic"
                  >
                    Find Your Next <br /> Career Opportunity <br /> Today
                  </h2>
                  <p style={{ fontSize: "12px", fontWeight: "400" }}>
                    Find jobs that fit your skills and schedule.
                    <br /> Apply easily and get paid securely <br /> with our
                    live booking system!
                  </p>
                  <Link to="/findjobs">
                    <button className="right-button w-[120px]">
                      Browse Jobs
                    </button>
                  </Link>
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
                      src={dashbGirl}
                      alt=""
                      className="right-image mt-16"
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
      </div>
      <div className="containery h-[100%]">
        <div className="top-section  flex flex-col justify-between">
          <div className="p-4 mt-10">
            <p className="text-xs">For Employers</p>
            <h1 className="italic text-xl">
              {" "}
              Hire the Talent That <br /> Drives Your Business <br /> Forward
            </h1>
            <p className="text-sm mt-2">
              Discover top candidates, streamline your recruitment process, and
              build a team that excels.
            </p>
            <Link to="/findjobs">
              <button
                style={{ border: "1px solid red" }}
                className="hover:bg-white mt-3 w-auto hover:text-black text-red"
              >
                Find Candidate
              </button>
            </Link>
          </div>
          <div className="flex justify-end">
            <img
              className="h-[200px] w-[150px] "
              src="https://res.cloudinary.com/viplav2411/image/upload/v1731477320/iaa9gnlxz0itmgxx7huo.png"
              alt="man"
            />
          </div>
        </div>
        <div className="top-section bg-[#C5363C] text-white flex flex-col justify-between">
          <div className="p-4 mt-5">
            <p className="text-xs">For Job Seekers</p>
            <h1 className="italic text-xl">
              {" "}
              Find your next <br /> carrer opportunity <br /> Today
            </h1>
            <p className="text-sm mt-2">
              Find jobs that fit your skills and schedule. Apply easily and get
              paid securely with our live booking system
            </p>

            <Link to="/findcandidate">
              <button
                style={{ border: "1px solid #ffffff" }}
                className="hover:bg-white mt-3 hover:text-black text-red"
              >
                Find Job
              </button>
            </Link>
          </div>
          <div className="flex justify-end">
            <img className="h-[200px] w-[150px]" src={dashbGirl} alt="man" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleScreen;

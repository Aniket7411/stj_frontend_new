import React, { useState } from "react";
import "./index.css";
import dashbGirl from "../../assests/dashbGirl.png";


function Section1() {
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

  // Function to handle mouse movement
  const handleMouseMove = (event) => {
    if (!isMouseMoveEnabled) return;

    const screenWidth = window.innerWidth;
    const cursorX = event.clientX;
    const cursorPercent = (cursorX / screenWidth) * 100;

    if (cursorPercent <= 40) {
      setLeftWidth(60);
      setRightWidth(40);
      setLeftScale(1.4);
      setRightScale(1);
      setLeftImageHeight("65%");
      setRightImageHeight("38%");
    } else if (cursorPercent >= 60) {
      setLeftWidth(40);
      setRightWidth(60);
      setLeftScale(1);
      setRightScale(1.2);
      setLeftImageHeight("38%");
      setRightImageHeight("65%");
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
    setIsRightButtonVisible(false);
    setIsRightContentVisible(false); // Hide right content with sliding effect
    setIsMouseMoveEnabled(false);
    setHideLeftImg(false);
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
    setIsRightButtonVisible(false);
    setIsRightContentVisible(true); // Show right content
    setIsMouseMoveEnabled(true);
    setHideLeftImg(true);
  };

  return (
    <div className="containerx">
      <div
        style={{ display: "flex", width: "100%", height: "100vh" }}
        onMouseMove={handleMouseMove}
      >
        <div
          className="left-section"
          style={{
            width: `${leftWidth}%`,
          }}
        >
          <div
            style={{
              transform: `scale(${leftScale})`,
              transformOrigin: "top left",
              transition: "all 0.8s ease",
              marginTop: "5rem",
              paddingLeft: "3rem",
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
              Hire the Talent That <br /> Drives Your Business <br /> Forward
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
              transform: `scale(${leftScale})`,
              transformOrigin: "top right",
              transition: "all 0.8s ease",
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
                transition: "transform 0.8s ease",
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
                transition: "opacity 0.8s ease",
              }}
              onClick={handleMouseMoveLeft}
            >
              Left
            </div>
          )}
        </div>

        <div
          className="right-section"
          style={{
            width: `${rightWidth}%`,
          }}
        >
          <div
            style={{
              marginTop: "5rem",
              paddingLeft: "5rem",
              // transform: `scale(${rightScale})`,
              
              transform: `scale(${rightScale}) ${
                  !isRightContentVisible ? "translateX(100%)" : "translateX(0)"
                }`, // Slide out to the right
                height: rightImageHeight,
              transition: "transform 0.8s ease",
              transformOrigin: "top",
            }}
          >
            <h2 style={{ fontSize: "12px", fontWeight: "600" }}>
              For Job Seekers
            </h2>
            <h2 style={{ fontSize: "36px", fontWeight: "900" }}>
              Find Your Next <br /> Career Opportunity <br /> Today
            </h2>
            <p style={{ fontSize: "12px", fontWeight: "400" }}>
              Find jobs that fit your skills and schedule. Apply easily <br />
              and get paid securely with our live booking system!
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
                transition: "all 0.8s ease",
              }}
            >
              <img
                src={dashbGirl}
                alt=""
                className="right-image"
                style={{
                  width: "100%",
                  height: "100%",
                  transformOrigin: "bottom left",
                  transition: "transform 0.8s ease",
                }}
              />
            </div>
          )}

          {!isRightButtonVisible && !isLeftButtonVisible && (
            <div
              style={{
                position: "absolute",
                bottom: "50%",
                right: "0.5rem",
                cursor: "pointer",
                opacity: isRightButtonVisible ? 0 : 1,
                transition: "opacity 0.8s ease",
              }}
              onClick={handleMouseMoveRight}
            >
              Right
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Section1;

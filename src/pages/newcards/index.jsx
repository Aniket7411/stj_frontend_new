import { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewCards = () => {
  const [step, setStep] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered card

  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = document.getElementById("section-three").offsetTop;
      const scrollPosition = window.scrollY + window.innerHeight;

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);
const navigate = useNavigate()
  const handleButtonClick = (cardTitle, route) => {
    if (cardTitle === "Security") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData?.role) {
        if (userData?.role === "employee" || userData?.role === "admin") {
          toast.info("Please Login/Register First as a Business User");
          navigate(`/login`);
        } else {
          navigate(`/findcandidate`);

        }
      } else {
        toast.info("Please Login/Register First as a Business User");
        navigate(`/login`);
      }
    } else {
      navigate(route);
    }
  };

  return (
    <div className=" mb-10 md:block hidden">
      <div
        id="section-three"
        className="font-futura text-custom-lg font-normal leading-custom text-center"
      >
        <div className="font-section-three-futura text-section-three-lg leading-section-three-line text-center">
          <h2
            className={`title ${
              step >= 1 ? "visible" : ""
            } font-section-three-futura text-section-three-lg leading-section-three-line`}
          >
            We Offer--
          </h2>
          <p
            className={`description ${step >= 2 ? "visible" : ""}`}
            style={{
              opacity: step === 2 ? 1 : 0,
              transform: step === 2 ? "translateY(0)" : "translateY(-20px)", // Upward movement
              transition: "opacity 0.5s ease, transform 0.5s ease", // Smooth opacity and movement transition
              animation: step === 2 ? "fadeInUp 6s ease-out forwards" : "", // Custom animation for fading and upward movement
            }}
          >
            Here is a description of our offerings.
          </p>
        </div>

        <div
          className={`cards-container ${step >= 3 ? "visible" : ""} ${
            step >= 4 ? "separate" : ""
          }`}
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(100px)",
            transition: "opacity 3s ease, transform 0.9s ease",
          }}
        >
          {[
            {
              title: "Security",
              route: "/findcandidate",
              img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image3_mrcntc.png",
              icon: "assets/icon2.png",
              description:
                "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
              buttonText: "I need Security→",
            },
            {
              title: "Jobs",
              img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image2_axs8kn.png",
              icon: "assets/icon3.png",
              route: "/findjobs",

              description:
                "Whether you are taking full time part time or temprary employement we link you with job openinings in a range of industries tailored to your requirements.",
              buttonText: "Find Jobs→",
            },
            {
              title: "Training",
              img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image1_qhi5a8.png",
              icon: "assets/icon1.png",
              route: "/courses",
              description:
                "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
              buttonText: "Security→",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="card1 card"
              style={{
                backgroundImage:
                  hoveredIndex === index ? "none" : `url(${card.img})`, // Conditionally remove background on hover
              }}
              onMouseEnter={() => setHoveredIndex(index)} // Set hovered card
              onMouseLeave={() => setHoveredIndex(null)} // Reset when hover leaves
            >
              <img
                src={card.icon}
                className="card1-title "
                alt={`${card.title} Icon`}
              />
              <h1 className="text-5xl single-heading">{card.title}</h1>
              <div className="bottom-section mt-0 flex flex-col items-center">
                <h1 className="text-3xl text-black ">{card.title}</h1>
                <p className="works-at text-sm text-black">
                  {card.description}
                </p>
                <div className="flex items-center justify-center bg-gray-200  rounded-md w-[100%] h-[35px] mt-3 border-2 border-dashed border-black hover:bg-[#00b7ff] ">
                  {/* <Link to={card.route}> */}
                    <button className="text-black font-semibold w-auto  " onClick={() => handleButtonClick(card.title, card.route)}>
                      {card.buttonText}
                    </button>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCards;

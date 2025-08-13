import { useEffect, useState } from "react";
import "./index.css";

const Card2 = () => {
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

  return (
    <div className="mt-5 mb-10 md:block hidden">
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
              img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image3_mrcntc.png",
              icon: "assets/policeman.svg",
              description:
                "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
              buttonText: "I need Security→",
            },
            {
              title: "Jobs",
              img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image2_axs8kn.png",
              icon: "assets/job-seeker.svg",
              description:
                "Whether you're seeking full-time, part-time, or temporary employment, we link you with job openings in a range of industries tailored to your requirements.",
              buttonText: "Find Jobs→",
            },
            {
              title: "Training",
              img: "https://res.cloudinary.com/viplav2411/image/upload/v1732617361/image1_qhi5a8.png",
              icon: "assets/training.svg",
              description:
                "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
              buttonText: "Security→",
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`relative w-64 group overflow-hidden flex justify-center items-center text-white hover:text-black ease-in-out weOfferOuter rounded-lg border-2 ${
                hoveredIndex === index ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div
                className="inset-0 bg-cover bg-center w-72 h-96"
                style={{
                  backgroundImage: `url(${card.img})`,
                }}
              ></div>

              {/* Circular Div with SVG */}
              <div
                className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center z-10
                  group-hover:top-0 group-hover:left-0 group-hover:w-full group-hover:h-full group-hover:items-start group-hover:rounded-none
                  transition-all duration-700 ease-in-out py-2"
              >
                <img
                  className="w-10 h-10 text-blue-500 group-hover:w-24 group-hover:h-24 group-hover:mt-1 transition-all duration-500 ease-in-out "
                  src={card.icon}
                  alt={card.title}
                />
              </div>

              {/* Text */}
              <h1
                className="absolute bottom-10 z-10 text-6xl font-extralight
                  group-hover:bottom-[62%]
                  group-hover:text-3xl transition-all duration-500 ease-in-out"
              >
                {card.title}
              </h1>

              {/* Hidden Text and Button */}
              <div
                className="z-10 absolute bottom-10 text-center opacity-0 group-hover:opacity-100
                  transition-all duration-700 ease-in-out px-2"
              >
                <p
                  className="text-white group-hover:text-black text-sm mb-7"
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                >
                  {card.description}
                </p>
                <button
                  className="w-[100%] px-1 text-white rounded transition buttonColor"
                  style={{
                    height: "40px",
                  }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card2;

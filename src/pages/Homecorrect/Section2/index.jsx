import { MdArrowBackIos, MdArrowForward } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";

import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";




const Section2 = () => {
    const [isVisible, setIsVisible] = useState(false);


     // Setup the Intersection Observer to observe visibility
     useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // When the element is visible in the viewport
                } else {
                    setIsVisible(false); // When the element is out of the viewport
                }
            });
        }, { threshold: .1 }); // Trigger when 1% of the element is visible

        const elements = document.querySelectorAll('.scroll-element'); // Query all elements with 'scroll-element' class
        elements.forEach(element => observer.observe(element));

        return () => {
            elements.forEach(element => observer.unobserve(element)); // Clean up observer
        };
    }, []);

    return (
        <div className="p-3 flex justify-between flex-wrap gap-3 md:gap-6">

            {/* First Container with animation on the card */}
            <div
                className={`bg-neutral-100 w-full md:w-[48%] lg:w-[30%] rounded-3xl p-5 mb-3 scroll-element transform transition-transform duration-[1500ms] ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`} // Adjust the starting position (move to the left slightly)
            >
                <h1 className={`transform transition-transform duration-[1500ms] ease-in-out text-3xl md:text-4xl lg:text-5xl
        ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}>
                    <span className="italic">WHO</span> <span className="font-extrabold">WE <br /> ARE</span>
                </h1>
                <div className="flex justify-end items-center mt-4">
                    <p className={`transform transition-transform duration-[1500ms] ease-in-out text-right underline
          ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}>
                        Explore
                    </p>
                    <div className={`transform transition-transform duration-[1500ms] ease-in-out bg-black text-white rounded-full ml-1 p-2
          ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}>
                        <MdOutlineArrowOutward />
                    </div>
                </div>
            </div>

            {/* Second Container */}
            <div className="bg-[#d32f2f] text-white w-full md:w-[48%] lg:w-[35%] rounded-3xl p-5 mb-3 scroll-element">
                <p className={`transform transition-transform duration-[1000ms] ease-in-out ${isVisible ? "translate-y-0" : "translate-y-10"}`}>
                    /ABOUT
                </p>
                <p
                    className={`transform transition-transform duration-[1500ms] ease-in-out text-right w-[95%] text-lg md:text-xl
      ${isVisible ? "translate-y-0" : "translate-y-10"}`}
                >
                    <span className="font-bold">SECURETHATJOB bridges the <br /> gap between - </span>
                    Skilled security<br /> professionals and the perfect <br /> Job Opportunities
                </p>
            </div>

            {/* Third Container */}
            <div
                className={`bg-neutral-100 w-full md:w-[48%] lg:w-[30%] rounded-3xl p-5 mb-3 scroll-element transform transition-transform duration-[1500ms] ease-in-out
        ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`} // Apply animation to card as well
            >

                <p
                    className={`transform transition-transform duration-[1500ms] ease-in-out text-3xl md:text-4xl lg:text-5xl ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}
                >
                    Our Team
                </p>
                <div className="flex justify-start items-center mt-4">
                    <p
                        className={`transform transition-transform duration-[1500ms] ease-in-out text-right underline ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        Contact Us
                    </p>
                    <div
                        className={`transform transition-transform duration-[1500ms] ease-in-out bg-black text-white rounded-full ml-1 p-2
          ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <MdOutlineArrowOutward />
                    </div>
                </div>
            </div>

            {/* Fourth Container with flip animation */}
            <div
                className={`bg-black w-full md:w-[48%] lg:w-[30%] text-white rounded-3xl p-5 mb-3 scroll-element 
        ${isVisible ? "flip-card" : ""}`} // Apply the flip-card class when visible
            >
                <div
                    className="border-2 border-dashed rounded-full border-white p-5 m-5 h-[250px] md:h-[300px] lg:h-[350px] 
          flex flex-col justify-center items-center"
                >
                    Get Our App
                    <div className="mt-2">
                        <button className="bg-white text-black px-4 py-2 rounded-lg mt-2">Download</button>
                    </div>
                </div>
            </div>

            {/* Fifth Container */}
            <div className="text-white flex justify-between flex-col w-full sm:w-[90%] md:w-[48%] lg:w-[35%] rounded-3xl p-5 mb-3 scroll-element">
                <div className="border-dashed border-2 rounded-full border-red-500">
                    <img className="w-full p-3 rounded-full mb-3" src="https://res.cloudinary.com/viplav2411/image/upload/v1731563291/qdumaolkpv0kkbo4pvcu.jpg" alt="experient-image" />
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-m text-black">
                            <span className="font-bold">Protect What Matters</span> - Monitor<br /> Secure and Stay Vigilant.
                        </h2>

                        <div className="flex">
                            <div
                                className={`transform transition-transform duration-[1500ms] ease-in-out bg-black text-white rounded-full ml-1 p-4 w-[50px] h-[50px]
            ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}
                            >
                                <FaArrowLeft />
                            </div>
                            <div
                                className={`transform transition-transform duration-[1500ms] ease-in-out bg-black text-white rounded-full ml-1 p-4 w-[50px] h-[50px]
            ${isVisible ? "translate-x-0" : "-translate-x-[20%]"}`}
                            >
                                <FaArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sixth Container with flip animation */}
            <div
                className={`bg-black w-full md:w-[48%] lg:w-[30%] text-white rounded-3xl p-5 mb-3 scroll-element 
        ${isVisible ? "flip-card" : ""}`} // Apply the flip-card class when visible
            >
                <p className="text-2xl">
                    Whether in manned security, cybersecurity, or specialized roles. Our platform empowers you to discover jobs, receive instant payments, and advance your career effortlessly.
                    <span className="text-gray-400 bold">
                        With key features like secure payments, worker ratings, and industry-leading training courses, we provide everything you need to succeed and thrive in the security field.
                    </span>
                </p>
            </div>

        </div>
    )
}

export default Section2
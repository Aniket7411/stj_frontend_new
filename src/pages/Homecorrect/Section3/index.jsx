import { useState } from "react";



const Section3 = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isVisibleSec3, setIsVisibleSec3] = useState(false);



    const handleVideoClick = () => {

        setIsFullScreen(prev => !prev); // Toggle fullscreen state on click
    };


    return (
        <div>
        <svg
            id="wave"
            style={{
                transform: 'rotate(0deg)',  // Correct usage of the rotate property
                transition: 'transform 0.3s',  // Apply transition for the transform property
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
                    transform: 'translate(0, 0px)',
                    opacity: 1,
                    transition: 'transform 0.3s', // Ensure the path has its own transition
                }}
                fill="#000000"
                d="M0,55L20,49.5C40,44,80,33,120,31.2C160,29,200,37,240,33C280,29,320,15,360,9.2C400,4,440,7,480,14.7C520,22,560,33,600,44C640,55,680,66,720,60.5C760,55,800,33,840,27.5C880,22,920,33,960,44C1000,55,1040,66,1080,58.7C1120,51,1160,26,1200,25.7C1240,26,1280,51,1320,51.3C1360,51,1400,26,1440,23.8C1480,22,1520,44,1560,51.3C1600,59,1640,51,1680,44C1720,37,1760,29,1800,25.7C1840,22,1880,22,1920,31.2C1960,40,2000,59,2040,66C2080,73,2120,70,2160,69.7C2200,70,2240,73,2280,62.3C2320,51,2360,26,2400,23.8C2440,22,2480,44,2520,53.2C2560,62,2600,59,2640,53.2C2680,48,2720,40,2760,40.3C2800,40,2840,48,2860,51.3L2880,55L2880,110L2860,110C2840,110,2800,110,2760,110C2720,110,2680,110,2640,110C2600,110,2560,110,2520,110C2480,110,2440,110,2400,110C2360,110,2320,110,2280,110C2240,110,2200,110,2160,110C2120,110,2080,110,2040,110C2000,110,1960,110,1920,110C1880,110,1840,110,1800,110C1760,110,1720,110,1680,110C1640,110,1600,110,1560,110C1520,110,1480,110,1440,110C1400,110,1360,110,1320,110C1280,110,1240,110,1200,110C1160,110,1120,110,1080,110C1040,110,1000,110,960,110C920,110,880,110,840,110C800,110,760,110,720,110C680,110,640,110,600,110C560,110,520,110,480,110C440,110,400,110,360,110C320,110,280,110,240,110C200,110,160,110,120,110C80,110,40,110,20,110L0,110Z"
            />
        </svg>
        <div className="bg-[#000000]  text-white h-[100%] p-10">
            <div className={`transform scroll-sec3 transition-transform duration-[1000ms] ease-in-out ${isVisibleSec3 ? "translate-y-0" : "translate-y-20"}`}>
                <h1 className="lg:text-7xl sm:text-5xl text-gray-200 mb-5"><span className="italic">Reason</span> <span className="font-bold">to join us</span></h1>
                <hr />
                <div className="flex flex-col lg:flex-row justify-between mt-5 mb-5">
                    <p>. RELIABLE, SECURE</p>
                    <p className="lg:w-[450px] sm:w-[100%]">At SecureThatJob, safety is our top priority. We
                        connect you with thoroughly vetted security
                        professionals to protect your assets, while also
                        offering a platform for job seekers to find
                        opportunities tailored to their skills. Whether you're
                        seeking protection or employment, we ensure a
                        secure, reliable experience every step of the way.

                    </p>
                </div>
            </div>

            <div className="flex justify-center mt-4" style={{ height: "100%" }}>

                <div
                    className={`video-container rounded-2xl ${isFullScreen ? "zoomed" : ""}`}
                    onClick={handleVideoClick}
                >
                    <video
                        className={`video ${isFullScreen ? "full-screen" : ""}`}
                        controls
                    >
                        {/* <source src="" type="video/mp4" /> */}
                        <source
                  src="https://www.securethatjob.com/videos/Secure-that-Job-V7.mp4"
                  type="video/mp4"
                />
                        {/* Your browser does not support the video tag. */}
                    </video>
                </div>
            </div>
        </div>

    </div>

    )
}


export default Section3
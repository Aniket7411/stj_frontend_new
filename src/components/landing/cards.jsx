import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import '../../pages/Homepage/home.css'

const Section3 = () => {
    const [step, setStep] = useState(0);
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
    
  <div
    id="section-three"
    className="font-futura text-custom-lg font-normal leading-custom text-center"
    style={{
      background: "linear-gradient(to right, #FFFFFF 80%, #7CFFFF80)100%",
      height:"700px"
    }}
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
        { title: "Security",
           img: "/assets/checkout-girl.png",
            icon: "/assets/icon2.png" ,
            description: "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
      buttonText: "I need Security →"},
        { title: "Jobs",
           img: "assets/men-hoodie.png", 
           icon: "assets/icon1.png",
           description: "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
           buttonText: "Find Jobs→" },
        { title: "Training",
           img: "/assets/tab-4.jpg",
            icon: "/assets/icon3.png" ,
            description: "We connect you with trusted security professionals, ensuring your protection with secure payments and verified ratings.",
            buttonText: "Security →"},
      ].map((card, index) => (
        <div
          key={index}
          className="card"
          style={{
            backgroundImage: `url(${card.img})`,
          }}
        >
              <div className="icon-container">
        <img src={card.icon} className="card-icon" alt={`${card.title} Icon`} />
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

  )
}

export default Section3
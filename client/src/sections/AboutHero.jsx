import React from 'react';
// I'm using a placeholder here since I can't access local assets.
// Please make sure your import path is correct.
import backgroundImage from '../assets/images/AboutUs/image.png';

const AboutHero = () => {
  // The background image is positioned to 'left center'.
  // This ensures the left side of the image remains visible on smaller screens,
  // and any trimming required by 'bg-cover' happens from the right side.
  const heroStyle = {
    backgroundImage: `linear-gradient(#00000033, #00000033), url(${backgroundImage})`,
  };

  return (
    <section 
      className="relative bg-cover bg-left-center bg-no-repeat py-20 sm:py-24 md:py-32 lg:py-40 text-white text-center px-0 md:px-12 lg:px-22 xl:px-25"
      style={heroStyle}
    >
      <div className="container mx-auto">
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-tight">
          About Us
        </p>
        <p className="max-w-7xl font-bold    lg:max-w-4xl xl:max-w-5xl mx-auto text-2xl sm:text-xl md:text-3xl lg:text-4xl xl:text-[4xl] mb-8 sm:mb-10 md:mb-12 lg:mb-16   leading-relaxed">
          Empowering Healthy Schools
        </p>
        <div className="max-w-4xl font-bold mx-auto space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-base lg:text-lg mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <p>
                Quwwa Health delivers school-based fitness, wellness, and preventive health programs designed to improve physical and mental well-being in students. We focus on early intervention, movement-based learning, and data-driven support aligned with the WHO Health-Promoting Schools framework.
            </p>
            <p>
                We also operate the Alpro Health & Fitness program, offering structured PE sessions, multi-sport coaching, and health assessments tailored for schools. Our programs support active lifestyles, improve student health outcomes, and fit seamlessly into academic settings.
            </p>
            <p>
                Quwwa Health is committed to building stronger, healthier school communities through evidence-based physical education and wellness solutions.
            </p>
        </div>
        <button className="bg-[#F3F25B] text-gray-900 font-bold text-base sm:text-base md:text-lg lg:text-xl py-3 sm:py-4 md:py-5 px-8 sm:px-10 md:px-12 rounded-md hover:bg-yellow-400 transition-all duration-300 hover:scale-105 transform-gpu shadow-lg hover:shadow-xl">
          See More
        </button>
      </div>
    </section>
  );
};

export default AboutHero;

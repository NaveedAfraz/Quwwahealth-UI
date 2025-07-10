import React from 'react';
import cardImage from '../assets/images/OurProgrammes/coach.png';
import { useNavigate } from 'react-router-dom';

const CoachCard = () => {
  const navigate = useNavigate();
  return (
    <section className="py-5 sm:py-10 md:py-15 lg:py-20 bg-yellow-50 px-3 sm:px-6 md:px-10 lg:px-16 bg-gradient-to-r from-white to-green-50">
      <div className="container mx-auto flex justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px]">
        <div className="w-full rounded-3xl shadow-xl bg-white flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 p-4 xs:p-6 sm:p-8 md:p-12 lg:p-16 relative  ">
          {/* Left Column */}
          <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-2xl xs:text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-1 xs:mb-2 sm:mb-2 md:mb-4 lg:mb-4 leading-tight">
              Sports Coaching and Sports Events
            </p>
            <p className="text-[#0F172A] text-sm xs:text-base sm:text-sm md:text-sm lg:text-md font-medium mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-xl lg:max-w-2xl">
              At Quwwa Health, we believe every child deserves the opportunity to excel in sports. We provide expert coaching in various sports, helping students develop gross motor skills, confidence, and a passion for sports through our structured programs.
            </p>
            <button className="border-2 border-blue-600 text-blue-600 font-semibold text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl rounded-lg px-4 xs:px-6 sm:px-8 md:px-10 py-2 xs:py-3 sm:py-4 md:py-5 hover:bg-blue-50 transition-all duration-300 hover:scale-105" onClick={() => navigate('/auth?mode=signup')}>
              Sign up now
            </button>
          </div>
          {/* Right Column with SVG background */}
          <div className="w-2/3 relative flex justify-center items-center min-h-[450px] xs:min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px]">
            {/* SVG Background */}
            <div className="absolute -bottom-4 xs:-bottom-6 flex justify-center items-center z-0 pointer-events-none w-full h-full">
              <svg width="713" height="627" viewBox="0 0 713 627" fill="none" xmlns="http://www.w3.org/2000/svg"
                className="w-[100%] max-w-[300px] sm:max-w-[400px] md:max-w-[590px] lg:max-w-[550px] h-auto transform scale-110 transition-transform duration-500">
                <rect y="471.948" width="666.284" height="217.934" transform="rotate(-45 0 391.948)" fill="#FDE68A" />
                <rect opacity="0.75" x="458" y="454" width="74" height="74" rx="30" fill="#A21CAF" />
                <rect opacity="0.75" x="115" y="100" width="90" height="90" rx="40" fill="#B45309" />
                <rect opacity="0.75" x="553" y="6" width="59" height="60" rx="29.5" fill="#0369A1" />
                <rect opacity="0.75" x="495" y="375" width="218" height="138" rx="50" fill="#0540F2" />
              </svg>
            </div>
            {/* Card Image */}
            <div className="relative z-10 w-[70vw] max-w-[240px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] overflow-hidden mt-6 sm:mt-8 transition-transform duration-300 hover:scale-105">
              <img src={cardImage} alt="Sports Coaching" className="w-full h-auto object-cover " />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachCard;
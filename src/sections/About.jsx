import React from 'react';
import CheckIcon from '../components/CheckIcon';
import aboutImage from '../assets/images/About/image.png';
import amandaImage from '../assets/images/About/image1.png'; // Placeholder for Amanda
 
const About = ({ isChatOpen, setIsChatOpen }) => {
  return (
    <section className="py-16 md:py-20 lg:py-28  bg-gradient-to-r from-white to-green-50 px-6 sm:px-8 lg:px-14">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="md:w-1/2">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight md:leading-[110%] lg:leading-[120%] tracking-[0%] text-[#191A15] mb-8 md:mb-12 lg:mb-14 w-full md:w-3/4">
              Health & Fitness Reporting System
            </p>
            <ul className="space-y-4 md:space-y-6">
              <li className="flex items-center text-lg text-[#848383]">
                <CheckIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-3 md:mr-4 flex-shrink-0" />
                <span className="text-base md:text-lg lg:text-xl font-medium">Empowering decision making with data.</span>
              </li>
              <li className="flex items-center text-lg text-[#848383]">
                <CheckIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-3 md:mr-4 flex-shrink-0" />
                <span className="text-base md:text-lg lg:text-xl font-medium">Annual & Biannual Health Check-Ups</span>
              </li>
              <li className="flex items-center text-lg text-[#848383]">
                <CheckIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-3 md:mr-4 flex-shrink-0" />
                <span className="text-base md:text-lg lg:text-xl font-medium">Ensuring continuous monitoring and timely interventions</span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">
            <img
              src={aboutImage}
              alt="Health and Fitness Reporting"
              className="rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl md:h-[500px] lg:h-[600px] object-cover hover:scale-105 transition-transform duration-300"
            />
            {/* Amanda Young Card */}
            <div className="hidden md:flex absolute top-8 -left-12 bg-white p-4 md:p-5 rounded-2xl shadow-xl items-center gap-3 w-auto z-10">
              <img
               src="/chatbotImage.jpg"
                alt="Amanda Young"
                className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover"
              />
              <div className="flex-grow">
                <p className="font-bold text-[#191A15] text-base md:text-lg lg:text-xl">Chat with Us</p>
                <p className="text-sm md:text-base lg:text-lg text-[#A6A6A6]">Amanda Young</p>
              </div>
              <div onClick={() => { setIsChatOpen(true) }} className="bg-[#54BD95] p-2 md:p-3 rounded-full text-white ml-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745A9.953 9.953 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
            {/* Image Icon Card */}
            <div className="hidden md:block absolute bottom-18 -left-2 bg-[#54BD95] p-3 md:p-4 lg:p-5 rounded-xl text-white shadow-lg z-10 transform -rotate-20">
              <svg width="25" height="25" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1_9845)">
                  <path d="M16.1876 3.74049L4.91847 6.76004C4.02936 6.99828 3.50172 7.91217 3.73996 8.80128L6.75951 20.0704C6.99775 20.9595 7.91165 21.4872 8.80076 21.2489L20.0699 18.2294C20.959 17.9911 21.4866 17.0772 21.2484 16.1881L18.2288 4.919C17.9906 4.02989 17.0767 3.50225 16.1876 3.74049Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9.24581 11.6396C9.91264 11.461 10.3084 10.7755 10.1297 10.1087C9.95102 9.44187 9.2656 9.04614 8.59876 9.22482C7.93193 9.40349 7.5362 10.0889 7.71488 10.7557C7.89356 11.4226 8.57898 11.8183 9.24581 11.6396Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M20.3859 12.9683L15.2828 10.022L8.80097 21.2489" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_1_9845">
                    <rect width="20" height="20" fill="white" transform="translate(0.24707 5.42334) rotate(-15)" />
                  </clipPath>
                </defs>
              </svg>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
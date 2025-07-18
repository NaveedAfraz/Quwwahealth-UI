import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import futureImage1 from '../assets/images/OurProgrammes/program.png';
import futureImage2 from '../assets/images/OurProgrammes/program1.png';
import futureImage3 from '../assets/images/OurProgrammes/program2.png';

const Future = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-16 sm:pt-14 md:pt-18 lg:pt-22 pb-30 sm:pb-0 md:pb-0 lg:pb-0  bg-yellow-50">
      <div className="mx-auto px-0 sm:px-0 lg:px-0">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-0 md:px-12 lg:px-22 xl:px-25">
          <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#191A15]">
            Why Quwwa Health for Schools?
          </p>
          <div className="flex justify-center mt-2 sm:mt-3 md:mt-4">
            <svg width="284" height="40" viewBox="0 0 284 40" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="w-48 sm:w-64 md:w-72 lg:w-96 h-auto">
              <g clipPath="url(#clip0_1_13202)">
                <path d="M180.851 0.697709C160.655 1.32266 140.471 2.37085 120.321 3.84229C102.035 4.16634 83.7464 4.49039 65.4609 4.81443C45.3964 5.17155 25.3319 5.52535 5.27073 5.88247C3.32975 5.91553 0.324047 7.34068 0.0264527 9.49328C-0.300901 11.8674 2.63536 12.2642 4.28867 12.2378C17.3266 12.0063 30.3646 11.7748 43.4025 11.5434C37.9764 12.2345 32.5568 12.952 27.1373 13.7026C25.2592 13.9638 22.637 14.8434 22.0385 16.8968C21.5029 18.7286 23.176 20.0281 24.9516 20.0612C55.0616 20.577 85.1748 21.0962 115.285 21.612C121.693 21.7211 128.101 21.8335 134.509 21.9426C125.291 22.9512 116.085 24.1118 106.906 25.4245C92.5122 27.4878 78.1781 29.9347 63.9068 32.7222C62.3659 33.0231 60.1802 34.3722 59.9454 36.1015C59.7173 37.7548 61.5392 38.8361 63.0007 38.8493C97.2439 39.1469 131.487 39.4478 165.73 39.7454C175.386 39.8281 185.038 39.914 194.693 39.9967C196.905 40.0165 199.742 39.385 200.856 37.2126C201.852 35.2683 199.987 33.6513 198.085 33.6348C165.122 33.3471 132.158 33.0595 99.1948 32.7718C100.114 32.6329 101.03 32.4907 101.949 32.3551C114.405 30.5101 126.904 28.946 139.43 27.6664C164.494 25.1071 189.67 23.6819 214.863 23.4009C215.978 23.3876 217.105 23.381 218.229 23.3744C230.999 23.5926 243.766 23.8142 256.536 24.0324C258.745 24.0688 261.592 23.4075 262.7 21.2483C263.718 19.2643 261.814 17.7466 259.929 17.6705C246.898 17.1481 233.853 16.9232 220.812 16.9993C203.74 16.705 186.668 16.414 169.596 16.1197C139.486 15.6039 109.373 15.0847 79.2626 14.5689C76.8356 14.5259 74.4052 14.4863 71.9782 14.4433C87.7441 12.7668 103.536 11.3483 119.349 10.1943C152.312 9.60901 185.279 9.02705 218.243 8.44178C238.307 8.08467 258.372 7.73086 278.433 7.37374C280.274 7.34068 282.979 6.07756 283.531 4.17956C284.074 2.32456 282.387 1.08127 280.618 1.01514C247.377 -0.221528 214.096 -0.330646 180.851 0.697709Z" fill="#F3F25B" />
              </g>
              <defs>
                <clipPath id="clip0_1_13202">
                  <rect width="283.634" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 md:space-y-10  lg:space-y-12">
          {/* Block 1 */}
          <div className="flex flex-col md:flex-row rounded-2xl bg-[#54BD95] px-0 md:pl-12 lg:pl-22 xl:pl-25 overflow-hidden shadow-lg ">
            <div className="md:w-1/2 bg-[#54BD95] my-10 text-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16  flex flex-col justify-center">
              <p className="text-xl sm:text-xl font-Inter md:text-2xl lg:text-3xl font-[800] mb-4 sm:mb-6 md:mb-8">Comprehensive health <br />monitoring</p>
              <p className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-base sm:text-sm md:text-md lg:text-lg font-[400] leading-relaxed">Tailor educational strategies with data driven insights to enhance student health now into the future</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-green-600 font-semibold text-sm sm:text-base md:text-lg py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate('/contact')}>
                  Get in touch <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2" />
                </button>
                <button className="border border-white text-white font-semibold text-sm sm:text-base md:text-lg py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-md hover:bg-white hover:text-green-600 transition-colors">Learn more</button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src={futureImage1} alt="Comprehensive health monitoring" className="w-full h-64 sm:h-80 md:h-full object-cover" />
            </div>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col md:flex-row-reverse rounded-2xl bg-[#54BD95]  overflow-hidden shadow-lg">
            <div className="md:w-1/2 bg-[#54BD95] my-10 text-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
              <p className="text-xl sm:text-xl font-Inter md:text-2xl lg:text-3xl font-[800] mb-4 sm:mb-6 md:mb-8 leading-tight">Curriculum development</p>
              <p className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-base sm:text-sm md:text-md lg:text-lg font-[400] leading-relaxed">Quwwa Health helps develop targeted programs <br /> ensuring every student reaches their fitness potential.</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-green-600 font-semibold text-sm sm:text-base md:text-lg py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate('/contact')}>
                  Get in touch <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2" />
                </button>
                <button className="border border-white text-white font-semibold text-sm sm:text-base md:text-lg py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-md hover:bg-white hover:text-green-600 transition-colors">Learn more</button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src={futureImage2} alt="Curriculum development" className="w-full h-64 sm:h-80 md:h-full object-cover" />
            </div>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col md:flex-row rounded-2xl bg-[#54BD95] px-0 md:pl-12 lg:pl-22 xl:pl-25 overflow-hidden shadow-lg">
            <div className="md:w-1/2   my-10 text-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
              <p className="text-xl sm:text-xl font-Inter md:text-2xl lg:text-3xl font-[800] mb-4 sm:mb-6 md:mb-8 leading-tight">Link between Fitness and
                academic excellence</p>
              <p className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-base sm:text-sm md:text-md lg:text-lg font-[400] leading-relaxed">Schools committed to regular fitness assessment <br />  witness healthier students with heightened  <br />  concentration cognitive function and overall academic excellence.</p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-green-600 font-semibold text-sm sm:text-base md:text-lg py-1 sm:py-2 md:py-3 px-3 sm:px-3 md:px-6 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => navigate('/contact')}>
                  Get in touch <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2" />
                </button>
                <button className=" text-white font-semibold text-sm sm:text-base md:text-lg py-1 sm:py-2 md:py-3 px-3 sm:px-3 md:px-6 rounded-md hover:bg-white hover:text-green-600 transition-colors">Learn more</button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src={futureImage3} alt="Comprehensive health monitoring" className="w-full h-64 sm:h-80 md:h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future; 
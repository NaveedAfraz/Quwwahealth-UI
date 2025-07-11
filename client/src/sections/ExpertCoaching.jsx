import React from 'react';

const ExpertCoaching = () => {
  return (
    <section className="pt-20 px-0 md:px-12 lg:px-22 xl:px-25  bg-gradient-to-r from-white to-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24 xl:gap-x-32 gap-y-12 md:gap-y-16 lg:gap-y-20">

          <div className="flex flex-col items-start text-center md:text-left">
            <div className="flex-grow">
              <h3 className="text-3xl sm:text-center md:text-left sm:text-4xl md:text-4xl lg:text-4xl font-semibold text-black leading-tight">
                Expert Coaching & Aligned Curriculum
              </h3>
              <div className="w-32 sm:w-40 md:w-48 lg:w-56 mx-auto md:mx-0  md:h-1 lg:h-1 bg-[#F3F25B] my-2 sm:my-2 md:my-3"></div>
              <p className="text-[#848383] text-base sm:text-sm md:text-md lg:text-md font-light mb-6 sm:mb-8 md:mb-10 lg:mb-12  ">
                Our coaches are experts in working with children across multiple sports. They tailor their programs to meet the standards of the USA PE curriculum, creating a customized experience for your school. The science-backed curriculum encourages fitness through fun, engaging activities that foster healthy minds and bodies. We integrate physical activity into active classrooms and recess, ensuring comprehensive development.
              </p>
            </div>
            <button className="bg-[#F3F25B] mx-auto md:mx-0 text-gray-900 font-[600] text-base sm:text-sm md:text-md lg:text-lg py-3 sm:py-4 md:py-5 px-8 sm:px-10 md:px-12 lg:px-14 rounded-xl shadow-md hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
              View More
            </button>
          </div>

          <div className="flex flex-col items-start text-center md:text-left">
            <div className="flex-grow">
              <h3 className="text-3xl sm:text-center md:text-left sm:text-4xl md:text-4xl lg:text-4xl font-semibold text-black leading-tight">
                Flexible Options: Regular or <br /> One-Off Programs
              </h3>
              <div className="w-32 sm:w-40 md:w-48 lg:w-56 mx-auto md:mx-0 h-1 md:h-1 lg:h-1 bg-[#F3F25B] my-2 sm:my-2 md:my-3"></div>
              <p className="text-[#848383] text-base sm:text-sm md:text-md lg:text-md font-light mb-6 sm:mb-8 md:mb-10 lg:mb-12 ">
                Our programs can be implemented as a long-term solution throughout the academic year or as a one-time experience. We leave schools with a sustainable program that can be carried forward each term, allowing students to continue learning, growing, and staying active.
              </p>
            </div>
            <button className="bg-[#F3F25B] mx-auto  md:mx-0 text-gray-900 font-[600] text-base sm:text-sm md:text-md lg:text-lg py-3 sm:py-4 md:py-5 px-8 sm:px-10 md:px-12 lg:px-14 rounded-xl shadow-md hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
              View More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExpertCoaching; 
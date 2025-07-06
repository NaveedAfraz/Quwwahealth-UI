import React from 'react';

const ExpertCoaching = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#F7FBEF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24 xl:gap-x-32 gap-y-12 md:gap-y-16 lg:gap-y-20">
          
          <div className="flex flex-col items-start text-left">
            <div className="flex-grow">
              <h3 className="text-2xl sm:text-center md:text-left sm:text-4xl md:text-5xl lg:text-5xl font-semibold text-black leading-tight">
                Expert Coaching & Aligned Curriculum
              </h3>
              <div className="w-32 sm:w-40 md:w-48 lg:w-56 h-1 bg-[#F3F25B] my-4 sm:my-6 md:my-8"></div>
              <p className="text-[#848383] text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed">
                Our coaches are experts in working with children across multiple sports. They tailor their programs to meet the standards of the USA PE curriculum, creating a customized experience for your school. The science-backed curriculum encourages fitness through fun, engaging activities that foster healthy minds and bodies. We integrate physical activity into active classrooms and recess, ensuring comprehensive development.
              </p>
            </div>
            <button className="bg-[#F3F25B] text-gray-900 font-[600] text-base sm:text-lg md:text-xl lg:text-2xl py-3 sm:py-4 md:py-5 px-8 sm:px-10 md:px-12 lg:px-14 rounded-xl shadow-md hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
              View More
            </button>
          </div>

          <div className="flex flex-col items-start text-left">
            <div className="flex-grow">
              <h3 className="text-2xl sm:text-center md:text-left sm:text-4xl md:text-5xl lg:text-5xl font-semibold text-black leading-tight">
                Flexible Options: Regular or <br/> One-Off Programs
              </h3>
              <div className="w-32 sm:w-40 md:w-48 lg:w-56 h-1 bg-[#F3F25B] my-4 sm:my-6 md:my-8"></div>
              <p className="text-[#848383] text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed">
                Our programs can be implemented as a long-term solution throughout the academic year or as a one-time experience. We leave schools with a sustainable program that can be carried forward each term, allowing students to continue learning, growing, and staying active.
              </p>
            </div>
            <button className="bg-[#F3F25B] text-gray-900 font-[600] text-base sm:text-lg md:text-xl lg:text-2xl py-3 sm:py-4 md:py-5 px-8 sm:px-10 md:px-12 lg:px-14 rounded-xl shadow-md hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
              View More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExpertCoaching; 
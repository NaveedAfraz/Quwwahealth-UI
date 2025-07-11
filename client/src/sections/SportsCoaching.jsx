import React from 'react';

const SportsCoaching = () => {
  return (
    <section className="pt-14 sm:py-11 md:py-11 lg:py-11  px-0 md:px-12 lg:px-22 xl:px-25  bg-gradient-to-r from-white to-green-50 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24 xl:gap-x-32 gap-y-12 md:gap-y-16 lg:gap-y-20">

          <div className="flex flex-col items-start text-left">
            <div className="flex-grow">
              <h3 className="text-2xl sm:text-2xl md:text-3xl text-center md:text-left lg:text-4xl mb-4 font-semibold text-gray-900 leading-tight">
                Sports Coaching
              </h3>
              <p className="text-[#848383] text-center md:text-left mx-auto md:mx-0 text-base sm:text-sm md:text-md lg:text-md xl:text-lg mb-1 leading-relaxed">
                Our expert coaching covers a range of sports, allowing students to enhance their abilities in:
              </p>
              <div className="w-2/3 sm:w-3/4 md:w-3/5 lg:w-4/6 h-1 mx-auto md:mx-0 bg-[#F3F25B] mb-2"></div>
              <ul className="text-[#848383] text-center md:text-left mx-auto md:mx-0 text-base sm:text-sm md:text-md lg:text-md xl:text-lg mb-2 sm:mb-4 md:mb-6 lg:mb-8 list-disc list-inside  leading-relaxed">
                <li>Soccer</li>
                <li>Basketball</li>
                <li>Tennis</li>
                <li>Volleyball</li>
                <li>Baseball</li>
              </ul>
            </div>
            <button className="bg-[#F3F25B] mx-auto md:mx-0 text-gray-900 font-[500] text-base sm:text-sm md:text-md lg:text-md py-2 sm:py-2 md:py-4 px-4 sm:px-6 md:px-8 lg:px-20 rounded-xl shadow-md hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
              View More
            </button>
          </div>

          <div className="flex flex-col items-start text-left">
            <div className="flex-grow">
              <h3 className="text-2xl sm:text-2xl md:text-3xl text-center md:text-left lg:text-4xl mb-4 font-semibold text-gray-900 leading-tight">
                Sports Day and Events
              </h3>
              <p className="text-[#848383] text-center md:text-left mx-auto md:mx-0 text-base sm:text-sm md:text-md lg:text-md xl:text-lg mb-1 leading-relaxed">
                Sports Day and Events
              </p>

              <div className="w-2/3 sm:w-3/4 md:w-3/5 lg:w-4/6 h-1 mx-auto md:mx-0 bg-[#F3F25B] mb-2"></div>
              <p className="text-[#848383] text-center  md:text-left mx-auto md:mx-0 text-base sm:text-sm md:text-md lg:text-md xl:text-lg mb-4 sm:mb-4 md:mb-6 lg:mb-8 leading-relaxed">
                We also organize Sports Day programs and Inter-house matches to give children a platform to participate in competitive sports at multiple levels. These events not only foster team spirit but also provide a fun and engaging environment where students can showcase their talents.
              </p>
            </div>
            <button className="bg-[#F3F25B] mx-auto md:mx-0 text-gray-900 font-[500] text-base sm:text-sm md:text-md lg:text-md py-2 sm:py-2 md:py-4 px-4 sm:px-6 md:px-8 lg:px-20 rounded-xl shadow-md hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
              View More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SportsCoaching; 
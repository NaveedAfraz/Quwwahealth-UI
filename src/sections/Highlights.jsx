import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiActivity, FiClock, FiCommand } from 'react-icons/fi';

const Rating = ({ rating, source, totalStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="text-center md:text-left">
      <div className="flex justify-center md:justify-start text-yellow-400 mb-2 md:mb-3">
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />)}
        {halfStar && <FaStarHalfAlt className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />)}
      </div>
      <p className="font-semibold text-[#191A15] text-lg md:text-xl lg:text-2xl">{rating} / {totalStars} rating</p>
      <p className="text-sm md:text-base lg:text-lg font-bold text-[#A6A6A6]">{source}</p>
    </div>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex items-center space-x-4 md:space-x-6">
    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
      {React.cloneElement(icon, { className: "text-2xl md:text-3xl lg:text-4xl text-[#54BD95]" })}
    </div>
    <p className="text-gray-700 text-base md:text-lg lg:text-xl font-medium w-full md:w-2/3">{text}</p>
  </div>
);


const Highlights = () => {
  const features = [
    {
      icon: <FiActivity />,
      text: 'Health reporting for early identification of health concerns',
    },
    {
      icon: <FiClock />,
      text: 'In-school PE and sports programs',
    },
    {
      icon: <FiCommand />,
      text: 'Sports coaching and Sports Day events',
    },
  ];

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#F9F8FE] px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Left Column */}
          <div>
            <p className="text-4xl md:text-5xl lg:text-[64px] text-center font-semibold leading-tight md:leading-[100%] tracking-[0%] text-[#191A15] mb-12 md:mb-16 lg:mb-24">
              Program
              <br />
              Highlights
            </p>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
              <Rating rating={4.9} source="google.com" />
              <Rating rating={4.8} source="healthplatform" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-10 md:space-y-12 lg:space-y-16 pl-8">
            {features.map((feature, index) => (
              <Feature key={index} icon={feature.icon} text={feature.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
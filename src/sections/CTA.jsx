import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-r from-white to-green-50 px-6 sm:px-8 lg:px-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-12">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-semibold text-[#191A15] text-center md:text-left leading-tight">
            Building Healthy
            <br />
            Habits for Life!
          </p>
          <p className="text-[#848383] text-base sm:text-lg md:text-xl lg:text-2xl">
            Let's Get you what you need!
          </p>
          <Link
            to="/auth"
            className="bg-[#54BD95] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-semibold text-base sm:text-lg md:text-xl lg:text-2xl hover:opacity-90 transition-opacity duration-300 flex-shrink-0"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
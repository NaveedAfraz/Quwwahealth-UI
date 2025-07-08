import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import img1 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.45.jpeg';
import img2 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.46.jpeg';
import img3 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.47.jpeg';
import img4 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.53.jpeg';
import img5 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.54.jpeg';
import img6 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.54 (1).jpeg';
import img7 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.55.jpeg';
import img8 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.55 (1).jpeg';
import img9 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.56.jpeg';
import img10 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.56 (1).jpeg';
import img11 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.57.jpeg';
import img12 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.57 (1).jpeg';
import img13 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.57 (2).jpeg';
import img14 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.58.jpeg';
import img15 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.58 (1).jpeg';
import img16 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.58 (2).jpeg';
import img17 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.59.jpeg';
import img18 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.59 (1).jpeg';
import img19 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.49.59 (2).jpeg';
import img20 from '../assets/images/Holiday/WhatsApp Image 2025-06-23 at 16.50.00.jpeg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20];

const SvgBackground = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 636 526" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <g clipPath="url(#clip0_1_9887)">
            <rect width="636" height="526" rx="20" fill="#52BD94"/>
            <path d="M50 1.5L27 122.5L103.5 56L128 149L209 56L228 149L276.5 97.5L291.5 223L372 97.5L377.5 229.5L409.5 263.5" stroke="#30946D" strokeWidth="5" opacity="0.5"/>
            <path d="M-16 206.303C9.82648 206.56 64.2411 214.608 75.2877 244.751C86.3342 274.895 198.027 223.477 252.493 194L264 473.901C219.507 492.1 131.748 535.726 136.658 564.638C142.795 600.78 120.548 609.238 81.4247 609.238C42.3014 609.238 48.4384 621.541 29.2603 630" stroke="#30946D" strokeWidth="5" opacity="0.5"/>
        </g>
        <defs>
            <clipPath id="clip0_1_9887">
                <rect width="636" height="526" rx="20" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const HolidayCampHero = () => {
  return (
    <>
      <section className="py-12 md:py-24 bg-gradient-to-r from-white to-green-50 px-3 sm:px-6 md:px-10 lg:px-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Column: Text Content */}
            <div className="text-center md:text-left p-10">
              <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight md:leading-[1.2] tracking-[0%] text-[#191A15] mb-4">
                Holiday Camps <br /> (Summer & Winter Breaks)
              </p>
              <div className="flex justify-center md:justify-start my-6">
                <svg width="487" height="34" viewBox="0 0 487 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto">
                  <path d="M4 30C73.6307 10.3798 266.914 -17.0885 483 30" stroke="#54BD95" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Right Column: Image Slider */}
            <div className="relative mt-8 md:mt-0 w-full">
              <div className="relative aspect-[636/526]">
                <SvgBackground />
                <div className="absolute inset-0 pt-[110px] pr-[10px] z-10">
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                      nextEl: '.swiper-button-next-hero',
                      prevEl: '.swiper-button-prev-hero',
                    }}
                    loop={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    className="w-full h-full"
                  >
                    {images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} alt={`Holiday Camp Slide ${index + 1}`} className="w-full h-full object-cover rounded-b-2xl" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {/* Navigation Arrows */}
                <div className="swiper-button-prev-hero absolute top-1/2 left-4 -translate-x-1/2 z-20 cursor-pointer">
                  <FiChevronLeft className="text-black text-6xl" />
                </div>
                <div className="swiper-button-next-hero absolute top-1/2 right-6 translate-x-1/2 z-20 cursor-pointer">
                  <FiChevronRight className="text-black text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Camps Section */}
      <section className="py-16 bg-white px-3 sm:px-6 md:px-10 lg:px-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-4">Our Holiday Camps offer children a fun, safe, and energetic environment during school breaks. Activities include multi-sport games, creative workshops, fitness challenges, and wellness learning. Camps are open to children ages 5–14 and designed to encourage teamwork, independence, and healthy habits.</p>
            <div className="border-t-4 border-[#F3F25B] w-1/2 mb-2"/>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-6 mb-2 ">Benefits:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Keeps children active and engaged during holidays</li>
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Encourages social interaction, creativity, and confidence</li>
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Supports WHO recommendations for daily physical activity</li>
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Reduces screen time and promotes healthier routines</li>
            </ul>
          </div>
          {/* Image Content */}
          <div className="flex justify-center md:justify-end">
            <img src={img7} alt="Holiday Camp Info" className="w-full max-w-md rounded-2xl shadow-lg object-cover" />
          </div>
        </div>
      </section>

      {/* Sports & Branded Events Organization Section */}
      <section className="py-16 bg-[#F8FAF8] px-3 sm:px-6 md:px-10 lg:px-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image Content (on left for variety) */}
          <div className="order-2 md:order-1 flex justify-center md:justify-start">
            <img src={img8} alt="Sports & Events" className="w-full max-w-md rounded-2xl shadow-lg object-cover" />
          </div>
          {/* Text Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Sports & Branded Events Organization</h2>
            <p className="text-gray-700 mb-4 text-sm sm:text-base md:text-lg lg:text-xl">Quwwa Health organizes high-energy sports days, fitness carnivals, inter-school tournaments, and branded wellness events to promote community engagement and a culture of health.</p>
            <div className="border-t-4 border-[#F3F25B] w-1/2 mb-2"/>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-6 mb-2 ">What We Provide:</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>End-to-end event planning and execution</li>
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Branded decor, sports equipment, team coordination</li>
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Live fitness zones, challenges, and awareness booths</li>
            </ul>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-6 mb-2">Benefits:</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Showcases the school's commitment to health and wellness</li>
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Enhances student motivation and participation</li>
              <li className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl"><span className="inline-block w-3 h-3 mt-2 mr-3 bg-[#52BD94] rounded-full flex-shrink-0"></span>Builds positive brand visibility and parent-school relationships</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default HolidayCampHero; 
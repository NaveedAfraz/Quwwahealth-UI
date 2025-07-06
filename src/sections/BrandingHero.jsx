import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight, FiCheckCircle, FiStar } from 'react-icons/fi';

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

// Brand images
import brand1 from '../assets/images/Hero/rahilsphoto.jpg';
import brand2 from '../assets/images/Brands/WhatsApp Image 2025-06-23 at 23.16.50 (1).jpeg';
import brand3 from '../assets/images/Brands/WhatsApp Image 2025-06-23 at 23.16.50 (2).jpeg';
import brand4 from '../assets/images/Brands/WhatsApp Image 2025-06-23 at 23.16.50.jpeg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20];

const brandLogos = [
  { image: brand1, name: 'Alpro' },
  { image: brand2, name: 'Yoga Association Bhopal' },
  { image: brand3, name: 'Partner Brand 3' },
  { image: brand4, name: 'Doon Public School' }
];

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

const services = [
  'Brand positioning and event integration',
  'Sponsorship deal structuring and activation',
  'Multi-channel campaign execution and reporting',
];

const benefits = [
  'Increases brand visibility in trusted community settings',
  'Supports CSR and wellness-based brand alignment',
  'Delivers measurable reach and engagement through school-based programs',
];

const BrandingHero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-white to-green-50 px-3 sm:px-6 md:px-10 lg:px-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Column: Text Content */}
            <div className="text-center md:text-left p-10">
              <p className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[75px] leading-tight md:leading-[76px] tracking-[0%] text-[#191A15] mb-4">
                Branding & <br /> Sponsorship
              </p>
              <div className="flex justify-center md:justify-start my-6">
                <svg width="487" height="34" viewBox="0 0 487 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm h-auto">
                  <path d="M4 30C73.6307 10.3798 266.914 -17.0885 483 30" stroke="#54BD95" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#A6A6A6] font-medium max-w-xl mx-auto md:mx-0">
                Quwwa Health offers integrated branding and sponsorship opportunities for businesses looking to align with health, fitness, and education initiatives. From designing brand identities to executing high-impact sponsorships, we deliver creative and data-driven strategies that connect sponsors with engaged school communities.
              </p>
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
                        <img src={image} alt={`Branding Slide ${index + 1}`} className="w-full h-full object-cover rounded-b-2xl" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {/* Navigation Arrows */}
                <div className="swiper-button-prev-hero absolute top-1/2 left-4 -translate-x-1/2 z-20 cursor-pointer">
                  <FiChevronLeft className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
                </div>
                <div className="swiper-button-next-hero absolute top-1/2 right-6 translate-x-1/2 z-20 cursor-pointer">
                  <FiChevronRight className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Benefits Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white px-3 sm:px-6 md:px-10 lg:px-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Services */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 flex items-center gap-2"><FiStar className="text-[#F3F25B] text-lg sm:text-xl md:text-2xl" /> Services Include</h3>
            <ul className="space-y-4 md:space-y-6">
              {services.map((service, idx) => (
                <li key={idx} className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl">
                  <FiCheckCircle className="text-[#52BD94] mt-1 mr-3 flex-shrink-0 text-base sm:text-lg md:text-xl" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
          {/* Benefits */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 flex items-center gap-2"><FiStar className="text-[#F3F25B] text-lg sm:text-xl md:text-2xl" /> Benefits</h3>
            <ul className="space-y-4 md:space-y-6">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start text-[#A6A6A6] text-sm sm:text-base md:text-lg lg:text-xl">
                  <FiCheckCircle className="text-[#52BD94] mt-1 mr-3 flex-shrink-0 text-base sm:text-lg md:text-xl" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Brands Partnership Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-50 to-white px-3 sm:px-6 md:px-10 lg:px-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#191A15] mb-4">
              Brands that have benefitted from our partnership
            </h2>
            <div className="flex justify-center my-6">
             <svg width="284" height="40" viewBox="0 0 284 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M181.035 0.697709C160.838 1.32266 140.654 2.37085 120.504 3.84229C102.218 4.16634 83.9295 4.49039 65.644 4.81443C45.5795 5.17155 25.515 5.52535 5.45383 5.88247C3.51286 5.91553 0.507153 7.34068 0.209558 9.49328C-0.117796 11.8674 2.81847 12.2642 4.47177 12.2378C17.5097 12.0063 30.5477 11.7748 43.5856 11.5434C38.1595 12.2345 32.7399 12.952 27.3204 13.7026C25.4423 13.9638 22.8201 14.8434 22.2216 16.8968C21.686 18.7286 23.3591 20.0281 25.1347 20.0612C55.2447 20.577 85.3579 21.0962 115.468 21.612C121.876 21.7211 128.284 21.8335 134.693 21.9426C125.474 22.9512 116.268 24.1118 107.089 25.4245C92.6953 27.4878 78.3612 29.9347 64.0899 32.7222C62.549 33.0231 60.3633 34.3722 60.1286 36.1015C59.9004 37.7548 61.7223 38.8361 63.1839 38.8493C97.4271 39.1469 131.67 39.4478 165.913 39.7454C175.569 39.8281 185.221 39.914 194.876 39.9967C197.088 40.0165 199.925 39.385 201.04 37.2126C202.035 35.2683 200.17 33.6513 198.269 33.6348C165.305 33.3471 132.342 33.0595 99.378 32.7718C100.297 32.6329 101.213 32.4907 102.132 32.3551C114.588 30.5101 127.087 28.946 139.613 27.6664C164.677 25.1071 189.853 23.6819 215.046 23.4009C216.161 23.3876 217.288 23.381 218.412 23.3744C231.183 23.5926 243.949 23.8142 256.719 24.0324C258.928 24.0688 261.775 23.4075 262.883 21.2483C263.901 19.2643 261.997 17.7466 260.112 17.6705C247.081 17.1481 234.036 16.9232 220.995 16.9993C203.923 16.705 186.851 16.414 169.779 16.1197C139.669 15.6039 109.556 15.0847 79.4457 14.5689C77.0187 14.5259 74.5883 14.4863 72.1613 14.4433C87.9272 12.7668 103.72 11.3483 119.532 10.1943C152.495 9.60901 185.462 9.02705 218.426 8.44178C238.49 8.08467 258.555 7.73086 278.616 7.37374C280.458 7.34068 283.162 6.07756 283.715 4.17956C284.257 2.32456 282.57 1.08127 280.801 1.01514C247.56 -0.221528 214.279 -0.330646 181.035 0.697709Z" fill="#F3F25B"/>
</svg>

            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#A6A6A6] font-medium max-w-3xl mx-auto">
              We've partnered with leading brands to create meaningful health and wellness initiatives that drive real impact in school communities.
            </p>
          </div>

          {/* Brand Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-center justify-items-center">
            {brandLogos.map((brand, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className=" sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40  shadow-lg  flex items-center justify-center transition-transform duration-300 group-hover:scale-110 overflow-hidden">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-contain "
                  />
                </div>
                <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 font-medium text-center">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>

     
        </div>
      </section>
    </>
  );
};

export default BrandingHero; 
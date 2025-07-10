import React from 'react';

// Placeholder images - replace with your actual image paths
import image1 from '../assets/images/Programmes/image1.png';
import image2 from '../assets/images/Programmes/image2.png';
import image3 from '../assets/images/Programmes/image3.png';
import image4 from '../assets/images/Programmes/image4.png';


const programData = [
  {
    image: image1,
    title: 'Health Card Reporting System',
    description: 'Empowering decision making with data. Annual & Biannual Health Check-Ups. Ensuring continuous monitoring and timely interventions.',
  },
  {
    image: image2,
    title: 'In-School PE & Sports Programs',
    description: 'Structured PE and sports for developing mental and behavioral skills along with physical conditioning with periodic assessments.',
  },
  {
    image: image3,
    title: 'Sports Coaching & Sports Event',
    description: 'We believe every child deserves a chance to excel in sports, we provide Expert coaching in various sports so that Students develop gross motor skills, confidence, and a passion for sports through structured programs.',
  },
  {
    image: image4,
    title: 'Healthy Canteen',
    description: 'Promoting nutritious eating habits through school canteen options. Get Kids active and healthy again as the pandemic continues!',
  },
];

const ProgramCard = ({ image, title, description }) => (
  <div className="flex flex-col h-full">
    <div className="bg-[#F9F9FF] rounded-2xl overflow-hidden mb-6 md:mb-8 aspect-video">
      <img src={image} alt={title} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
    </div>
    <h3 className="text-2xl md:text-xl lg:text-2xl font-bold text-[#191A15] mb-3 md:mb-4">{title}</h3>
    <p className="text-[#A6A6A6] text-base md:text-lg lg:text-xl font-medium">{description}</p>
  </div>
);

const Programs = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white px-0 md:px-12 lg:px-22 xl:px-25">
      <div className="container mx-auto">
        <p className="text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight md:leading-[100%] tracking-[0%] text-[#191A15] text-center mb-12 md:mb-16 lg:mb-24">
          Our Programs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-12 md:gap-y-16 lg:gap-y-20">
          {programData.map((program, index) => (
            <ProgramCard
              key={index}
              image={program.image}
              title={program.title}
              description={program.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
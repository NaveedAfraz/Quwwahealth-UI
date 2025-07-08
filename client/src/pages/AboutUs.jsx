import React from 'react';
import AboutHero from '../sections/AboutHero';
import Success from '../sections/Success';
import InvestmentReturn from '../sections/InvestmentReturn';
import Team from '../sections/Team';

const AboutUs = () => {
  return (
    <div>
      <AboutHero />
      <Success />
      <InvestmentReturn />
      <Team />
      
      {/* Other sections for the About Us page will go here */}
    </div>
  );
};

export default AboutUs; 
import React from 'react';
import ProgramsHero from '../sections/ProgramsHero';
import AlproHealthCard from '../sections/AlproHealthCard';
import KeyFeatures from '../sections/KeyFeatures';
import Future from '../sections/Future';
import AlproCard from '../sections/AlproCard';
import ExpertCoaching from '../sections/ExpertCoaching';
import KeyBenefits from '../sections/KeyBenefits';
import CoachCard from '../sections/CoachCard';
import SportsCoaching from '../sections/SportsCoaching';
import CanteenCard from '../sections/CanteenCard';
import CanteenMenu from '../sections/CanteenMenu';
import EmpoweringFuture from '../sections/EmpoweringFuture';

const Programs = () => {
  return (
    <div>
      <ProgramsHero />
      <AlproHealthCard />
      <KeyFeatures />
      <EmpoweringFuture />
      <Future />
      <AlproCard />
      <ExpertCoaching />
      <KeyBenefits />
      <CoachCard />
      <SportsCoaching />
      <CanteenCard />
      <CanteenMenu />
      {/* Other sections for the Programs page will go here */}
    </div>
  );
};

export default Programs;
import React from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Highlights from '../sections/Highlights'
import CTA from '../sections/CTA'
import Programs from '../sections/Programs'
import Testimonials from '../sections/Testimonials'

const Home = () => {
  return (
    <div className="home ">
      <Hero />
      <Highlights />
      <CTA />
      <Programs />
      <About />
      <Testimonials />
    </div>
  )
}

export default Home 
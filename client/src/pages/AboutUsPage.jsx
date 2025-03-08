import React from 'react'
import AboutUs  from '../features/details/components/AboutUs.jsx';
import {Navbar} from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'

export const AboutPage = () => {
  return (
    <>
    <Navbar/>
    <AboutUs/>
    <Footer/>
    </>
  )
}

export default AboutPage;
import React from 'react'
import {Navbar} from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'
import FAQ from '../features/details/components/FAQ.jsx';

export const FaqPage = () => {
  return (
    <>
    <Navbar/>
    <FAQ/>
    <Footer/>
    </>
  )
}

export default FaqPage;
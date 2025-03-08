import React from 'react'
import {Navbar} from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'
import TermsAndConditions from '../features/details/components/TermsAndConditions.jsx';

export const TermsAndConditionsPage = () => {
  return (
    <>
    <Navbar/>
    <TermsAndConditions/>
    <Footer/>
    </>
  )
}

export default TermsAndConditionsPage;
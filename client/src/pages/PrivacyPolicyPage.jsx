import React from 'react'
import {Navbar} from '../features/navigation/components/Navbar.jsx'
import {Footer} from '../features/footer/Footer.jsx'
import PrivacyPolicy from '../features/details/components/PrivacyPolicy.jsx';

export const PrivacyPolicyPage = () => {
  return (
    <>
    <Navbar/>
    <PrivacyPolicy/>
    <Footer/>
    </>
  )
}

export default PrivacyPolicyPage;
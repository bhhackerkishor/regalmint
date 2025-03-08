import React from 'react'
import {Navbar} from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'
import ContactScreen from '../features/contact/components/ContactPage.jsx';

export const ContactPage = () => {
  return (
    <>
    <Navbar/>
    <ContactScreen/>
    <Footer/>
    </>
  )
}

export default ContactPage;
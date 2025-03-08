import React from 'react'
import {Navbar} from '../features/navigation/components/Navbar.jsx'
import {Footer} from '../features/footer/Footer.jsx'
import ShippingDelivery from '../features/details/components/ShippingDelivery.jsx';

export const ShippingDeliveryPage = () => {
  return (
    <>
    <Navbar/>
    <ShippingDelivery/>
    <Footer/>
    </>
  )
}

export default ShippingDeliveryPage;
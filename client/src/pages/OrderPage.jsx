import React from 'react'
import OrderDetailsPage from '../features/order/components/OrderPage'
import {Navbar} from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'

export const OrderPage = () => {
  return (
    <>
    <Navbar/>
    <OrderDetailsPage/>
    <Footer/>
    </>
  )
}


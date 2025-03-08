import React from 'react'
import { ProductUpdate } from '../features/admin/components/ProductUpdate'
import AdminSidebar  from '../features/admin/components/adminSidebar'


export const ProductUpdatePage = () => {
  return (
    <>
    <AdminSidebar/>
    <ProductUpdate/>
    </>
  )
}

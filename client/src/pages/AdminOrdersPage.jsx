import React from 'react'
import { AdminOrders } from '../features/admin/components/AdminOrders'
import AdminSidebar  from '../features/admin/components/adminSidebar'

export const AdminOrdersPage = () => {
  return (
    <>
    <AdminSidebar/>
    <AdminOrders/>
    </>
  )
}

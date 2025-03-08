import {axiosi} from '../../config/axios'


export const createOrder=async(order)=>{
    try {
        const res=await axiosi.post("/orders",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getOrderByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`/orders/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const getOrderById=async(id)=>{
    try {
        console.log(id)
        const res=await axiosi.get(`/orders/order/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getAllOrders=async()=>{
    try {
        const res=await axiosi.get(`/orders`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateOrderById=async(update)=>{
    try {
        
        const res=await axiosi.patch(`/orders/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const PayOrderById=async(id)=>{
    try {
        const res=await axiosi.put(`/orders/${id}/pay`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const sendEmail=async(order)=>{
    try {
        const res=await axiosi.post("/orders",order)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateOrderStatusAndLocation=async(update)=>{
    try {
        const res=await axiosi.patch(`/orders/${update.orderId}/update`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const CancelOrder=async(orderId)=>{
    try {
        const res=await axiosi.patch(`/orders/${orderId}/cancel`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const handleReturnProduct=async(orderId)=>{
    try {
        const res=await axiosi.patch(`/orders/${orderId}/return`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
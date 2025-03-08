import { axiosi } from "../../config/axios";


export const fetchAdminDashboardInfo = async()=>{
    try {
        const res=await axiosi.get(`/admin/dashboard-stats`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
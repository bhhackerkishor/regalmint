import { axiosi } from "../../config/axios"

// Delete category

export const fetchAllCategories=async()=>{
    try {
        const res= await axiosi.get("/categories")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const createCategory=async( category)=>{
    try {
        const res=await axiosi.post("/categories" ,category)
        return res.data
    } catch (error) {
        throw error.response.data
    }
} 
export const updateCategory =async(id,category)=>{

    try {
        const res=await axiosi.put(`/categories/${id}`,category);
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteCategory =async(id,category)=>{

    try {
        const res=await axiosi.delete(`/categories/${id}`,category);
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
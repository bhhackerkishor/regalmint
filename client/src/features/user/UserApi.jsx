import { axiosi } from "../../config/axios"

export const fetchLoggedInUserById=async(id)=>{
    try {
        const res=await axiosi.get(`/users/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateUserById=async(update)=>{
    try {
        const res=await axiosi.patch(`/users/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchAllUsers = async () => {
    try {
        const res = await axiosi.get("/users");
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createUser = async (userData) => {
    try {
        const res = await axiosi.post("/users", userData);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const res = await axiosi.put(`/users/${userId}`, userData);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteUser = async (userId) => {
    try {
        const res = await axiosi.delete(`/users/${userId}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

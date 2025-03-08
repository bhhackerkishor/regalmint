import { axiosi } from "../../config/axios";

// ✅ Fetch all brands
export const fetchAllBrands = async () => {
    try {
        const res = await axiosi.get("/brands");
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: "Error fetching brands" };
    }
};

// ✅ Fetch a single brand by ID
export const fetchBrandById = async (id) => {
    try {
        const res = await axiosi.get(`/brands/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: "Error fetching brand" };
    }
};

// ✅ Create a new brand
export const createBrand = async (brandData) => {
    try {
        const res = await axiosi.post("/brands", brandData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: "Error creating brand" };
    }
};

// ✅ Update a brand
export const updateBrand = async (id, brandData) => {
    try {
        const res = await axiosi.put(`/brands/${id}`, brandData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: "Error updating brand" };
    }
};

// ✅ Delete a brand
export const deleteBrand = async (id) => {
    try {
        await axiosi.delete(`/brands/${id}`);
    } catch (error) {
        throw error.response?.data || { message: "Error deleting brand" };
    }
};

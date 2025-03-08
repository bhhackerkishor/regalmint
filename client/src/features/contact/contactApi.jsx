import { axiosi } from "../../config/axios";

export const submitContactForm = async (formData) => {
  try {
    const res = await axiosi.post("/contact", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Error submitting message" };
  }
};




export const fetchAllContactForms=async()=>{
    try {
        const res= await axiosi.get("/contact")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
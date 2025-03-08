import axios from 'axios'
const apiUrl = import.meta.env.VITE_APP_BASE_URL;

export const axiosi=axios.create({withCredentials:true,baseURL:apiUrl})
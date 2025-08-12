import axios from "axios";

// Base API URL from .env
const BASE_URL = import.meta.env.VITE_API_URL ||"http://localhost:5000/api";
console.log("API Base URL:", BASE_URL );

// Create Axios instance
const instance = axios.create({
  baseURL: BASE_URL ,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically for every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling (optional)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;

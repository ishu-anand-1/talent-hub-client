import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", BASE_URL);
const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

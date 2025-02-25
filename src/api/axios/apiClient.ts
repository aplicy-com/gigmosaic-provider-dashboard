import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_PORT,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

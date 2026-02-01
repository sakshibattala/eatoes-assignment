import axios from "axios";

export const apiBaseUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

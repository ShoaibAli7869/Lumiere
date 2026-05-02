import axios from "axios";

// Helper to ensure URL ends with /api
const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://lumiere-w1a6.vercel.app/api" : "/api");
  if (url.startsWith("http") && !url.endsWith("/api")) {
    return `${url.replace(/\/$/, "")}/api`;
  }
  return url;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
  withCredentials: true,
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Only redirect to login if not already there
      if (!window.location.pathname.includes("/login")) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);

export default api;

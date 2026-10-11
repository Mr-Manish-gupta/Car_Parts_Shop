import axios from "axios";

export const getApiBaseUrl = (): string => {
  return "/api";
};

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Request Interceptor: Attach JWT Token automatically to all requests
api.interceptors.request.use(
  (config) => {
    config.baseURL = "/api";
    config.headers["ngrok-skip-browser-warning"] = "true";
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized (401) global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);
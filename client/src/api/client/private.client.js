import axios from "axios";

const API_URL =
  import.meta.env.MODE === "production"
    ? "https://corn-films.onrender.com/api/v1"
    : "http://localhost:5000/api/v1";

const privateClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Thêm interceptor để tự động gắn token vào header
privateClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý lỗi 401
privateClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/log-in";
    }
    return Promise.reject(error);
  }
);

export default privateClient;

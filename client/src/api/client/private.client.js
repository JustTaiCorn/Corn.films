import store from "@/redux/store";
import axios from "axios";
import { setAccessToken } from "@/redux/features/userSlice";
const API_URL =
  import.meta.env.MODE === "production"
    ? "https://corn-films.onrender.com/api/v1"
    : "http://localhost:5000/api/v1";

const privateClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

privateClient.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().user.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url?.includes("/user/refresh-token") ||
      originalRequest.url?.includes("/user/login") ||
      originalRequest.url?.includes("/user/signup") ||
      originalRequest.url?.includes("/user/forgot-password") ||
      originalRequest.url?.includes("/user/reset-password")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = originalRequest._retry || 0;
    if (error.response?.status === 401 && originalRequest._retry < 4) {
      originalRequest._retry += 1;
    }

    try {
      const response = await privateClient.post("/user/refresh-token");
      store.dispatch(setAccessToken(response.data.accessToken));
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      return privateClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);
export default privateClient;

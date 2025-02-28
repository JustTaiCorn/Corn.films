import axios from "axios";
import {
  setAuthState,
  setCheckingAuth,
  setError,
  setListFavorites,
  setLoading,
  setMessage,
} from "./userSlice";
import privateClient from "../../api/client/private.client";
import { setGlobalLoading } from "./globalLoadingSlice";
export const signup = (email, password, username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.post(`/user/signup`, {
      email,
      password,
      username,
    });
    dispatch(setAuthState({ user: response.data.user, isAuthenticated: true }));
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during sign up";
    dispatch(setError(errorMessage));
    throw error;
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.post(`/user/login`, {
      email,
      password,
    });
    dispatch(
      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
      })
    );
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Đăng nhập thất bại"));
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setGlobalLoading(true));
  try {
    await privateClient.post(`/user/logout`);
    dispatch(setAuthState({ user: null, isAuthenticated: false }));
    dispatch(setListFavorites([]));
  } catch (error) {
    dispatch(setError("Error logging out"));
    throw error;
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch(setCheckingAuth(true));
  try {
    const response = await axios.get(`/user/check-auth`);
    dispatch(setAuthState({ user: response.data.user, isAuthenticated: true }));
  } catch (error) {
    dispatch(setAuthState({ user: null, isAuthenticated: false }));
    throw error;
  }
};

export const verifyEmail = async (code) => {
  const response = await privateClient.post(`/user/verify-email`, { code });
  return response.data;
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`/user/forgot-password`, { email });
    dispatch(setMessage(response.data.message));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Error sending reset email")
    );
    throw error;
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`/user/reset-password/${token}`, {
      password,
    });
    dispatch(setMessage(response.data.message));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Error resetting password")
    );
    throw error;
  }
};

export const uploadAvatar = (file) => async (dispatch) => {
  dispatch(setLoading(true));
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.post("/api/user/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(
      setAuthState({
        user: { ...response.data.user, avatarUrl: response.data.avatarUrl },
        isAuthenticated: true,
      })
    );
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Error uploading avatar")
    );
    throw error;
  }
};

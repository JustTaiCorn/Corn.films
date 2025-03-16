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
    // Không lưu trạng thái người dùng ngay sau khi đăng ký
    dispatch(
      setMessage("Đăng ký thành công. Vui lòng kiểm tra email để xác thực.")
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred during sign up";
    dispatch(setError(errorMessage));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.post(`/user/login`, {
      email,
      password,
    });

    // Kiểm tra xem người dùng đã xác thực email hay chưa
    if (!response.data.user.isVerified) {
      dispatch(setError("Vui lòng xác thực email trước khi đăng nhập"));
      return;
    }

    localStorage.setItem("token", response.data.token);
    dispatch(
      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
      })
    );
    return response.data;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Đăng nhập thất bại"));
    console.error("Login error:", error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setGlobalLoading(true));
  try {
    await privateClient.post(`/user/logout`);
    dispatch(setAuthState({ user: null, isAuthenticated: false }));
    dispatch(setListFavorites([]));
    dispatch(setGlobalLoading(false));
    localStorage.removeItem("token");
  } catch (error) {
    dispatch(setError("Error logging out"));
    throw error;
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch(setCheckingAuth(true));
  try {
    // Kiểm tra token trong localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setAuthState({ user: null, isAuthenticated: false }));
      return;
    }

    // Gọi API kiểm tra auth với token
    const response = await privateClient.get(`/user/check-auth`);
    if (response.data?.user) {
      dispatch(
        setAuthState({
          user: response.data.user,
          isAuthenticated: true,
        })
      );
    } else {
      // Nếu không có user data, xóa token và set trạng thái chưa auth
      localStorage.removeItem("token");
      dispatch(setAuthState({ user: null, isAuthenticated: false }));
    }
  } catch (error) {
    // Nếu có lỗi, xóa token và set trạng thái chưa auth
    localStorage.removeItem("token");
    dispatch(setAuthState({ user: null, isAuthenticated: false }));
    console.error("Check auth error:", error);
  } finally {
    dispatch(setCheckingAuth(false));
  }
};

export const verifyEmail = (code) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.post(`/user/verify-email`, { code });
    dispatch(
      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
      })
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Verification failed";
    dispatch(setError(errorMessage));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.post(`/user/forgot-password`, {
      email,
    });
    dispatch(setMessage(response.data.message));
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Error sending reset email")
    );
    console.error("Forgot password error:", error);
    throw error;
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.post(`/user/reset-password/${token}`, {
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
    const response = await privateClient.post(
      "/api/user/upload-avatar",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
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

// Thêm vào cuối file
export const updateProfile = (username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.put("/user/update-profile", {
      username,
    });

    dispatch(
      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
      })
    );

    return response.data;
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Failed to update profile")
    );
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updatePassword = (password, newPassword) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.put("/user/update-password", {
      password,
      newPassword,
    });

    return response.data;
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Failed to update password")
    );
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

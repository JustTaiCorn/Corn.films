import {
  setAccessToken,
  setAuthState,
  setCheckingAuth,
  setError,
  setListFavorites,
  setLoading,
  setMessage,
  setUser,
} from "./userSlice";
import privateClient from "../../api/client/private.client";
import { setGlobalLoading } from "./globalLoadingSlice";
import store from "../store";
import { toast } from "react-toastify";
export const signup = (email, password, username) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.post(
      `/user/signup`,
      {
        email,
        password,
        username,
      },
      { withCredentials: true }
    );
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
    const response = await privateClient.post(
      `/user/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    if (!response.data.user.isVerified) {
      dispatch(setError("Vui lòng xác thực email trước khi đăng nhập"));
      return;
    }
    dispatch(
      setAuthState({
        user: response.data.user,
        isAuthenticated: true,
        accessToken: response.data.accessToken,
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
    await privateClient.post(`/user/logout`, { withCredentials: true });
    dispatch(
      setAuthState({ user: null, isAuthenticated: false, accessToken: null })
    );
    dispatch(setListFavorites([]));
    dispatch(setGlobalLoading(false));
    toast.success("Đăng xuất thành công");
  } catch (error) {
    dispatch(setError("Error logging out"));
    throw error;
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch(setCheckingAuth(true));
  try {
    const response = await privateClient.get(`/user/check-auth`, {
      withCredentials: true,
    });
    if (response.data?.user) {
      dispatch(setUser(response.data.user));
    } else {
      dispatch(
        setAuthState({ user: null, isAuthenticated: false, accessToken: null })
      );
    }
  } catch (error) {
    dispatch(
      setAuthState({ user: null, isAuthenticated: false, accessToken: null })
    );
    console.error("Check auth error:", error);
  } finally {
    dispatch(setCheckingAuth(false));
  }
};
export const refreshToken = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await privateClient.post(`/user/refresh-token`, {
      withCredentials: true,
    });
    dispatch(setAccessToken(response.data.accessToken));
    const { user } = store.getState().user;
    if (!user) {
      await dispatch(checkAuth());
    }
  } catch (error) {
    dispatch(
      setError(error.response?.data?.message || "Error refreshing token")
    );
    toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    throw error;
  } finally {
    dispatch(setLoading(false));
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
        accessToken: response.data.accessToken,
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

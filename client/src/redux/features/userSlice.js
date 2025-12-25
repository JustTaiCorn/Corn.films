import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    isAuthenticated: false,
    accessToken: null,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
    listFavorites: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isCheckingAuth = false;
      state.error = null;
    },
    setCheckingAuth: (state, action) => {
      state.isCheckingAuth = action.payload;
      state.error = null;
    },
    setAuthState: (state, action) => {
      if (action.payload.user !== undefined) state.user = action.payload.user;
      if (action.payload.isAuthenticated !== undefined)
        state.isAuthenticated = action.payload.isAuthenticated;
      if (action.payload.accessToken !== undefined)
        state.accessToken = action.payload.accessToken;
      state.isLoading = false;
      state.isCheckingAuth = false;
      state.error = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isCheckingAuth = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    addFavorite: (state, action) => {
      const existingIndex = state.listFavorites.findIndex(
        (item) => item.mediaId === action.payload.mediaId
      );

      if (existingIndex === -1) {
        state.listFavorites = [action.payload, ...state.listFavorites];
      }
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = state.listFavorites.filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
  },
});

export const {
  setUser,
  setLoading,
  setAuthState,
  setCheckingAuth,
  setError,
  setListFavorites,
  setMessage,
  addFavorite,

  removeFavorite,
  setAccessToken,
} = userSlice.actions;
export default userSlice.reducer;

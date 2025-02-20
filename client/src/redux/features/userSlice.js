import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
    isAuthenticated: false, // Thêm trạng thái xác thực
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
        state.isAuthenticated = false;
      } else {
        if (action.payload.token) {
          localStorage.setItem("actkn", action.payload.token);
          state.isAuthenticated = true;
        }
      }
      state.user = action.payload;
    },
    //   setListFavorites: (state, action) => {
    //     if (!state.isAuthenticated) return; // Kiểm tra xác thực
    //     state.listFavorites = action.payload;
    //   },
    //   removeFavorite: (state, action) => {
    //     if (!state.isAuthenticated) return; // Kiểm tra xác thực
    //     const { mediaId } = action.payload;
    //     state.listFavorites = [...state.listFavorites].filter(e => e.mediaId.toString() !== mediaId.toString());
    //   },
    //   addFavorite: (state, action) => {
    //     if (!state.isAuthenticated) return; // Kiểm tra xác thực
    //     state.listFavorites = [action.payload, ...state.listFavorites];
    //   }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
// ... existing code ...

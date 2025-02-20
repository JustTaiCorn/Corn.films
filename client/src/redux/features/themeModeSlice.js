import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa các theme mode hợp lệ
const VALID_THEME_MODES = ["dark", "light"];

export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState: {
    themeMode: "dark",
  },
  reducers: {
    setThemeMode: (state, action) => {
      // Kiểm tra nếu giá trị truyền vào hợp lệ
      if (VALID_THEME_MODES.includes(action.payload)) {
        state.themeMode = action.payload;
      } else {
        console.warn(
          `Invalid theme mode: ${action.payload}. Only "dark" or "light" are allowed.`
        );
      }
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;

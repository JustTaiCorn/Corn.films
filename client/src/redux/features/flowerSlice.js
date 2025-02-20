import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showFlower: false,
};

const flowerSlice = createSlice({
  name: "flower",
  initialState,
  reducers: {
    toggleFlower: (state) => {
      state.showFlower = !state.showFlower;
    },
  },
});

export const { toggleFlower } = flowerSlice.actions;

export default flowerSlice.reducer;

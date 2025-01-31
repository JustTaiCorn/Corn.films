import { createSlice } from "@reduxjs/toolkit";

export const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    selectedEpisode: null,
  },
  reducers: {
    setEpisode: (state, action) => {
      state.selectedEpisode = action.payload;
    },
    resetSelectedEpisode: (state) => {
      state.selectedEpisode = null;
    },
  },
});

export const { setEpisode, resetSelectedEpisode } = episodeSlice.actions;

export default episodeSlice.reducer;

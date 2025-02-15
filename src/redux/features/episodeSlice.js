import { createSlice } from "@reduxjs/toolkit";

export const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    selectedEpisode: null,
    episodes: [],
  },
  reducers: {
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
    setEpisode: (state, action) => {
      state.selectedEpisode = action.payload;
    },
    resetSelectedEpisode: (state) => {
      state.selectedEpisode = null;
    },
  },
});

export const { setEpisode, resetSelectedEpisode, setEpisodes } =
  episodeSlice.actions;

export default episodeSlice.reducer;

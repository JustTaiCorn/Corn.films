import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import themeModeReducer from "./features/themeModeSlice";
import globalLoadingReducer from "./features/globalLoadingSlice";
import episodeReducer from "./features/episodeSlice";
const store = configureStore({
  reducer: {
    episode: episodeReducer,
    user: userReducer,
    themeMode: themeModeReducer,
    globalLoading: globalLoadingReducer,
  },
});

export default store;

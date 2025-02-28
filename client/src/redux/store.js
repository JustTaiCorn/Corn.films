import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import themeModeReducer from "./features/themeModeSlice";
import globalLoadingReducer from "./features/globalLoadingSlice";
import appStateReducer from "./features/appStateSlice";
import episodeReducer from "./features/episodeSlice";
import flowerReducer from "./features/flowerSlice";
const store = configureStore({
  reducer: {
    episode: episodeReducer,
    user: userReducer,
    themeMode: themeModeReducer,
    globalLoading: globalLoadingReducer,
    appState: appStateReducer,
    flower: flowerReducer,
  },
});

export default store;

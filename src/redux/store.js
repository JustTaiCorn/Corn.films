import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import authModalReducer from "./features/authModalSlice";
import themeModeReducer from "./features/themeModeSlice";
import globalLoadingReducer from "./features/globalLoadingSlice";
import appStateReducer from "./features/appStateSlice";
import episodeReducer from "./features/episodeSlice";
const store = configureStore({
  reducer: {
    episode: episodeReducer,
    user: userReducer,
    authModal: authModalReducer,
    themeMode: themeModeReducer,
    globalLoading: globalLoadingReducer,
    appState: appStateReducer,
  },
});

export default store;

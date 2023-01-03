import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
// import videosReducer from "./slices/videosSlice";
import alertReducer from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // videos: videosReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

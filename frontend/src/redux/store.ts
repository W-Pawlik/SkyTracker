import { configureStore } from "@reduxjs/toolkit";
import airplanesSlice from "./slices/airplanesSlice";
import snackbarSlice from "./slices/snackbarSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    airplanes: airplanesSlice,
    snackbar: snackbarSlice,
    user: userSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

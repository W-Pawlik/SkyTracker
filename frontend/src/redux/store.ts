import { configureStore } from "@reduxjs/toolkit";
import airplanesSlice from "./slices/airplanesSlice";
import snackbarSlice from "./slices/snackbarSlice";

export const store = configureStore({
  reducer: {
    airplanes: airplanesSlice,
    snackbar: snackbarSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

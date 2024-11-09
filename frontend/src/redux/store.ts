import { configureStore } from "@reduxjs/toolkit";
import airplanesSlice from "./slices/airplanesSlice";

export const store = configureStore({
  reducer: {
    airplanes: airplanesSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

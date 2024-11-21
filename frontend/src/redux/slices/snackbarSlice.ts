import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { snackbarInitialState } from "../../consts/initialStates/snackbarInitialState";

const snackbarSlice = createSlice({
  name: "snackbarSlice",
  initialState: snackbarInitialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; alertType: "success" | "error" | "info" }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.alertType = action.payload.alertType;
    },
    closeSnackbar: (state) => {
      state.open = false;
      state.message = "";
    }
  }
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

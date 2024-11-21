import { RootState } from "../store";

export const selectSnackbarState = (state: RootState) => state.snackbar;
export const selectSnackbarOpen = (state: RootState) => state.snackbar.open;
export const selectSnackbarMessage = (state: RootState) => state.snackbar.message;
export const selectSnackbarAlertType = (state: RootState) => state.snackbar.alertType;

import { ISnackbarState } from "../../types/states/snackbarState";

export const snackbarInitialState: ISnackbarState = {
  open: false,
  message: "",
  alertType: "info"
};

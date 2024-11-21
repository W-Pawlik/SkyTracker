export interface ISnackbarState {
  open: boolean;
  message: string;
  alertType: "success" | "error" | "info";
}

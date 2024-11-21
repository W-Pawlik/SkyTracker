import { css } from "@emotion/react";
import { Alert, Snackbar } from "@mui/material";
import { Box, Theme } from "@mui/system";

type AlertType = "error" | "info" | "success" | "warning";

interface IBaseSnackbar {
  open: boolean;
  onClose: () => void;
  message: string;
  autHideDuration?: number;
  alertType?: AlertType;
}

const BaseSnackbarCss = {
  box: (theme: Theme) =>
    css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      padding: "0.5rem",
      borderRadius: "10px",
      color: theme.palette.common.white,
      backgroundColor: theme.palette.background.paper
    })
};

export const BaseSnackbar = ({
  open,
  onClose,
  message,
  autHideDuration,
  alertType
}: IBaseSnackbar) => (
  <Snackbar
    open={open}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    autoHideDuration={autHideDuration}
  >
    {alertType ? (
      <Alert severity={alertType} variant="filled">
        {message}
      </Alert>
    ) : (
      <Box css={BaseSnackbarCss.box}>{message}</Box>
    )}
  </Snackbar>
);

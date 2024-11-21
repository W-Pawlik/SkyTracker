import { css } from "@emotion/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import { Box, Theme } from "@mui/system";
import { CommonButton } from "./Button";

interface IInputField {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
}

interface IBaseFormDialog {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  dialogText?: string;
  inputs: IInputField[];
}

const BaseFormDialogCss = {
  dialogContainer: (theme: Theme) =>
    css({
      maxWidth: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      color: theme.palette.common.white
    }),
  title: css({
    textAlign: "center"
  }),
  text: (theme: Theme) =>
    css({
      marginBottom: "1rem",
      color: theme.palette.common.white
    }),
  inputsContainer: css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%"
  })
};

export const BaseFormDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  dialogText,
  inputs
}: IBaseFormDialog) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>
      <Typography variant="h2" css={BaseFormDialogCss.title}>
        {title}
      </Typography>
    </DialogTitle>
    <DialogContent>
      {dialogText && (
        <DialogContentText>
          <Typography variant="body1" css={BaseFormDialogCss.text}>
            {dialogText}
          </Typography>
        </DialogContentText>
      )}
      <Box css={BaseFormDialogCss.inputsContainer}>
        {inputs?.map((input, index) => (
          <TextField
            key={index}
            variant="filled"
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
            type={input.type}
            fullWidth
            className="MuiTextField-secondary"
          />
        ))}
      </Box>
    </DialogContent>
    <DialogActions>
      <CommonButton text="Cancle" onClick={onClose} />
      <CommonButton text="Delete" onClick={onSubmit} color="error" />
    </DialogActions>
  </Dialog>
);

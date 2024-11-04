import { css } from "@emotion/react";
import { TextField } from "@mui/material";
import { Theme, useTheme } from "@mui/system";

interface InputFieldProps {
  email: string;
  setEmail: () => void;
}

const InputFieldCss = {
  inputStyle: (theme: Theme) =>
    css({
      height: "3rem",
      backgroundColor: "#EAEFFF",
      borderRadius: "10px",

      "& .MuiFilledInput-root::before": {
        borderBottom: "none",
        borderBottomRightRadius: "10px !important"
      },
      "&: hover": {
        "& .MuiFilledInput-root::before": {
          borderBottomRightRadius: "10px !important",
          borderBottom: `2px solid ${theme.palette.background.paper}`,
          borderRadius: "10px"
        }
      },
      "& .MuiFilledInput-input": {
        height: "100%",
        padding: "13px 10px",
        fontSize: "1.2rem",
        color: "#6D6D70"
      },
      "& .MuiInputBase-input::placeholder": {
        color: "#6D6D70",
        opacity: "1"
      },
      "& .MuiFilledInput-underline:after": {
        borderRadius: "10px",
        height: "2rem"
      },
      "& input:-webkit-autofill": {
        WebkitTextFillColor: "#6D6D70",
        transition: "background-color 5000s ease-in-out 0s"
      }
    })
};

export const InputField = ({ email, setEmail }: InputFieldProps) => {
  const theme: Theme = useTheme();

  return (
    <TextField
      sx={{ height: "2.5rem" }}
      variant="filled"
      placeholder={`Email`}
      fullWidth
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      css={InputFieldCss.inputStyle}
    />
  );
};

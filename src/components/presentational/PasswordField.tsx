import { useState } from "react";
import { Theme, useTheme } from "@emotion/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment, TextField } from "@mui/material";
import { PasswordFieldProps } from "../../types/passwordField";

export const PasswordField = ({
  // showPassword,
  // toggleVisibility,
  password,
  setPassword
}: PasswordFieldProps) => {
  const theme: Theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      placeholder={`Password`}
      variant="filled"
      type={showPassword ? "text" : "password"}
      fullWidth
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      sx={{
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
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {showPassword ? (
              <VisibilityOffIcon
                fontSize="large"
                sx={{
                  fontWeight: "bold",
                  color: "#6D6D70",
                  cursor: "pointer",
                  "&: hover": {
                    color: theme.palette.primary.main
                  },
                  "&: active": {
                    color: theme.palette.common.darkerTurquoise
                  }
                }}
                onClick={handleTogglePasswordVisibility}
              />
            ) : (
              <VisibilityIcon
                fontSize="large"
                sx={{
                  fontWeight: "bold",
                  color: "#6D6D70",
                  cursor: "pointer",
                  "&: hover": {
                    color: theme.palette.primary.main
                  },
                  "&: active": {
                    color: theme.palette.common.darkerTurquoise
                  }
                }}
                onClick={handleTogglePasswordVisibility}
              />
            )}
          </InputAdornment>
        )
      }}
    />
  );
};

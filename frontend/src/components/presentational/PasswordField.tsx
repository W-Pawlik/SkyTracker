import { useState } from "react";
import { Theme, useTheme } from "@emotion/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment, TextField } from "@mui/material";
import { PasswordFieldProps } from "../../types/passwordField";

export const PasswordField = ({ password, setPassword, placeHolder }: PasswordFieldProps) => {
  const theme: Theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      placeholder={placeHolder ?? `Password`}
      variant="filled"
      type={showPassword ? "text" : "password"}
      fullWidth
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="MuiTextField-secondary"
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

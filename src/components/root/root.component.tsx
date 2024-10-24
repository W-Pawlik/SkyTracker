import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createTheme } from "../../assets/themes/createTheme";
import { AuthProvider } from "../../contexts/authContext/AuthContext";
import { router } from "./router";

const Root = () => (
  <AuthProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </AuthProvider>
);

export default Root;

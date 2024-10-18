import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createTheme } from "../../assets/themes/createTheme";
import { router } from "./router";

const Root = () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={createTheme()}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StyledEngineProvider>
);

export default Root;

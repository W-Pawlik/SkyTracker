import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { createTheme } from "../../assets/themes/createTheme";
import { router } from "./router";

const Root = () => (
  <ThemeProvider theme={createTheme()}>
    <RouterProvider router={router} />;
  </ThemeProvider>
);

export default Root;

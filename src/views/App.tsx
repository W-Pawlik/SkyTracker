import { css, Theme, useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/navigation/SideBar";
import { navItemsSideBar } from "../consts/navItems";

const AppCss = {
  box: () =>
    css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      flexDirection: "row",
      flex: "1",
      padding: "1rem",
      boxSizing: "border-box"
    }),
  panelContent: (theme: Theme) =>
    css({
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      height: "79.5vh !important",
      borderRadius: "20px",
      alignSelf: "stretch !important",
      justifySelf: "stretch"
    })
};

const App = () => {
  const theme: Theme = useTheme();

  return (
    <Box css={AppCss.box}>
      <SideBar navItems={navItemsSideBar()} />
      <Box css={AppCss.panelContent(theme)}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default App;

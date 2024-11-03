import { css, useTheme } from "@emotion/react";
import { Theme } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet, useLocation } from "react-router-dom";
import { navItemsApp, navItemsStarterPage } from "../../consts/navItems";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { LayoutWrapper } from "../containers/LayoutWrapper";
import { BottomBar } from "../navigation/BottomBar";
import { TopBar } from "../navigation/TopBar";

const MainLayoutCss = {
  outlet: (theme: Theme) =>
    css({
      display: "flex",
      flexDirection: "column",
      flexGrow: "1",
      color: theme.palette.common.white,
      gap: "11rem"
    })
};

export const MainLayout = () => {
  const theme: Theme = useTheme();
  const loc = useLocation();
  const appTopBar = loc.pathname.startsWith("/app");

  const authContext = useAuth();

  if (!authContext) {
    return null;
  }

  return (
    <LayoutWrapper>
      {appTopBar ? (
        <TopBar navItems={navItemsApp(theme, authContext)} />
      ) : (
        <TopBar navItems={navItemsStarterPage(theme, authContext)} />
      )}
      <Box css={MainLayoutCss.outlet(theme)}>
        <Outlet />
      </Box>
      <BottomBar />
    </LayoutWrapper>
  );
};

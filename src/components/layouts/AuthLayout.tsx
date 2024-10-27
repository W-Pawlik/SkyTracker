import { css, useTheme } from "@emotion/react";
import { Theme } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import { navItemsAuth } from "../../consts/navItems";
import { LayoutWrapper } from "../containers/LayoutWrapper";
import { TopBar } from "../navigation/TopBar";

const AuthLayoutCss = {
  outlet: (theme: Theme) =>
    css({
      position: "relative",
      display: "flex",
      flexGrow: "1",
      color: theme.palette.common.white,
      height: "90vh"
    })
};

export const AuthLayout = () => {
  const theme: Theme = useTheme();

  return (
    <LayoutWrapper>
      <TopBar bottomBorder={false} navItems={navItemsAuth(theme)} />
      <Box css={AuthLayoutCss.outlet(theme)}>
        <Outlet />
      </Box>
    </LayoutWrapper>
  );
};

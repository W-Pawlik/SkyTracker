import { css, useTheme } from "@emotion/react";
import { Theme } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import { LayoutWrapper } from "../containers/LayoutWrapper";
import { BottomBar } from "../navigation/BottomBar";
import { TopBar } from "../navigation/TopBar";

const MainLayoutCss = {
  outlet: (theme: Theme) =>
    css({
      flexGrow: "1",
      color: theme.palette.common.white
    })
};

export const MainLayout = () => {
  const theme: Theme = useTheme();

  return (
    <LayoutWrapper>
      <TopBar />
      <Box css={MainLayoutCss.outlet(theme)}>
        <Outlet />
      </Box>
      <BottomBar />
    </LayoutWrapper>
  );
};

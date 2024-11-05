import React from "react";
import { css } from "@emotion/react";
import { Box, Theme } from "@mui/material";
import { useTheme } from "@mui/system";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapperCss = {
  box: (theme: Theme) =>
    css({
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: theme.palette.background.default
    })
};

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const theme: Theme = useTheme();

  return <Box css={LayoutWrapperCss.box(theme)}>{children}</Box>;
};

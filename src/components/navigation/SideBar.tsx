import React, { useState } from "react";
import { css, useTheme } from "@emotion/react";
// eslint-disable-next-line import/no-unresolved
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Divider, Drawer, IconButton, Theme, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/png/SKYTRACKER.png";

interface navItem {
  element: ReactJSXElement;
}

interface TopBarProps {
  navItems: navItem[];
}

const SideBarCss = {
  box: (theme: Theme) =>
    css({
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    })
};

export const SideBar = ({ navItems }: TopBarProps) => {
  const theme: Theme = useTheme();

  return (
    <Box css={SideBarCss.box(theme)}>
      {navItems.map((item, index) => (
        <React.Fragment key={index}>{item.element}</React.Fragment>
      ))}
    </Box>
  );
};

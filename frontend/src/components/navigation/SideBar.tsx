import React from "react";
import { css } from "@emotion/react";
// eslint-disable-next-line import/no-unresolved
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box } from "@mui/material";

interface navItem {
  element: ReactJSXElement;
}

interface TopBarProps {
  navItems: navItem[];
}

const SideBarCss = {
  box: () =>
    css({
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    })
};

export const SideBar = ({ navItems }: TopBarProps) => (
  <Box css={SideBarCss.box()}>
    {navItems.map((item, index) => (
      <React.Fragment key={index}>{item.element}</React.Fragment>
    ))}
  </Box>
);

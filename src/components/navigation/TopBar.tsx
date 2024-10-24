import React, { useState } from "react";
import { css, useTheme } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Divider, Drawer, IconButton, Theme, Toolbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/png/SKYTRACKER.png";

const topBarCss = {
  appBar: () =>
    css({
      alignSelf: "center",
      padding: "0.25rem 3.5rem",
      background: "transparent",
      position: "static"
    }),
  toolBar: () =>
    css({
      width: "100%",
      justifyContent: "space-between"
    }),
  navContainer: () =>
    css({
      display: "flex",
      gap: "1rem"
    }),
  navLink: (theme: Theme) =>
    css({
      color: theme.palette.common.white,
      fontWeight: "600",
      fontSize: "1.56rem",
      textDecoration: "none",
      "&.active": {
        // color: theme.palette.primary.main,
        fontWeight: "bold",
        textDecoration: `underline 3px solid ${theme.palette.primary.main}`
      },
      "&:hover": {
        color: "#d1d0d0"
      },
      "&:nth-of-type(2)": {
        color: theme.palette.primary.main,
        "&:hover": {
          color: theme.palette.common.darkerTurquoise
        }
      }
    }),
  logo: () =>
    css({
      width: "14rem"
    })
};

const navItems = ["login", "register"];

export const TopBar = () => {
  const theme: Theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const hanldeNavClick = (item: string) => {
    navigate(`/${item}`);
    window.scrollTo(0, 0);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        paddingTop: "2rem"
      }}
    >
      {navItems.map((item, index) => (
        <React.Fragment key={item}>
          <NavLink
            css={topBarCss.navLink(theme)}
            onClick={() => hanldeNavClick(item)}
            key={index}
            to={`/${item}`}
          >
            {item}
          </NavLink>
        </React.Fragment>
      ))}
    </Box>
  );

  return (
    <AppBar
      css={topBarCss.appBar}
      component="nav"
      sx={{ Width: { md: "100%", lg: "90rem" }, borderBottomColor: theme.palette.common.lightGrey }}
    >
      <Toolbar css={topBarCss.toolBar}>
        <IconButton
          onClick={() => {
            navigate("/");
          }}
          disableRipple
          disableFocusRipple
          disableTouchRipple
          aria-label="logo"
        >
          <Box
            component="img"
            src={logo}
            css={topBarCss.logo}
            sx={{ width: { xs: "10rem", md: "14rem", lg: "19rem", xl: "19rem" } }}
          />
        </IconButton>
        <Box
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          css={topBarCss.navContainer}
        >
          {navItems.map((item, index) => (
            <React.Fragment key={item}>
              <NavLink
                css={topBarCss.navLink}
                onClick={() => hanldeNavClick(item)}
                key={index}
                to={`/${item}`}
              >
                {item}
              </NavLink>
              {index < navItems.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  variant="middle"
                  sx={{
                    height: "2rem",
                    borderColor: theme.palette.common.white
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        <IconButton onClick={handleDrawerToggle} sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

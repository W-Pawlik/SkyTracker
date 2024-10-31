import { css, Theme } from "@emotion/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { CommonButton } from "../components/presentational/Button";
import { doSignOut } from "../services/fireBase/auth";
import { AuthContextType } from "../types/authContext";

const navItemsCss = {
  navLink: (theme: Theme) =>
    css({
      color: theme.palette.common.white,
      fontWeight: "600",
      fontSize: "1.56rem",
      textDecoration: "none",
      "&.active": {
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
  back: (theme: Theme) =>
    css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
      padding: "0.4rem",
      borderRadius: "100%",
      height: "2rem",
      width: "2rem"
    }),
  arrow: (theme: Theme) =>
    css({
      fontSize: "1.4rem",
      color: "white",
      "&:hover": {
        color: theme.palette.primary.main
      }
    })
};

export const navItemsStarterPage = (theme: Theme, authContext: AuthContextType) => [
  {
    element: (
      <NavLink to={authContext.userLoggedIn ? `/app` : `/login`} css={navItemsCss.navLink(theme)}>
        {authContext.userLoggedIn ? "Go back to app" : "Login"}
      </NavLink>
    )
  },
  {
    element: authContext.userLoggedIn ? (
      <CommonButton text="signOut" onClick={doSignOut} />
    ) : (
      <NavLink to={`/register`} css={navItemsCss.navLink(theme)}>
        Register
      </NavLink>
    )
  }
];

export const navItemsAuth = (theme: Theme) => [
  {
    element: (
      <Box css={navItemsCss.back(theme)}>
        <NavLink to={`/`}>
          <ArrowBackIcon css={navItemsCss.arrow(theme)} />
        </NavLink>
      </Box>
    )
  }
];

export const navItemsApp = (theme: Theme, authContext: AuthContextType) => [
  {
    element: (
      <Box display="flex" gap="1rem">
        <Typography variant="body1">Hello {authContext?.currentUser?.email}</Typography>
        <PersonIcon />
      </Box>
    )
  },
  {
    element: <CommonButton text="Sign out" onClick={doSignOut} />
  }
];

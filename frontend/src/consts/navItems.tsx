import { css, Theme } from "@emotion/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MapIcon from "@mui/icons-material/Map";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import ProfilePic from "../assets/images/webp/profilePic.webp";
import { CommonButton } from "../components/presentational/Button";
import { doSignOut } from "../services/fireBase/auth";
import { auth } from "../services/fireBase/firebaseConfig";
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
    }),
  sideBarField: (theme: Theme) =>
    css({
      backgroundColor: theme.palette.background.paper,
      padding: "0.8rem",
      borderRadius: "10px 0 0 10px",
      "&:hover": {
        color: theme.palette.primary.main
      }
    }),
  sideBarIcon: (theme: Theme) =>
    css({
      fontSize: "2.5rem",
      "&:hover": {
        color: theme.palette.primary.main
      }
    }),
  sideBarLink: (theme: Theme) =>
    css({
      color: "white",
      "&.active": {
        color: theme.palette.primary.main
      }
    }),
  profileIcon: () =>
    css({
      width: "2.5rem",
      borderRadius: "50%"
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
      <Box display="flex" alignItems="center" gap="1rem">
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            fontSize: "1.5rem",
            fontWeight: "500",
            letterSpacing: "1px"
          }}
        >
          {auth.currentUser?.displayName ?? auth.currentUser?.email}
        </Typography>
        <Box
          component="img"
          src={authContext?.currentUser?.photoURL || ProfilePic}
          css={navItemsCss.profileIcon}
          alt="ProfileIcon"
        />
      </Box>
    )
  },
  {
    element: <CommonButton text="Sign out" onClick={doSignOut} />
  }
];

export const navItemsSideBar = () => [
  {
    element: (
      <Box css={navItemsCss.sideBarField}>
        <NavLink to={`/app/map`} css={navItemsCss.sideBarLink}>
          <MapIcon css={navItemsCss.sideBarIcon} />
        </NavLink>
      </Box>
    )
  },
  {
    element: (
      <Box css={navItemsCss.sideBarField}>
        <NavLink to={`/app/analytics`} css={navItemsCss.sideBarLink}>
          <BarChartIcon css={navItemsCss.sideBarIcon} />
        </NavLink>
      </Box>
    )
  },
  {
    element: (
      <Box css={navItemsCss.sideBarField}>
        <NavLink to={`/app/plans`} css={navItemsCss.sideBarLink}>
          <WorkspacePremiumIcon css={navItemsCss.sideBarIcon} />
        </NavLink>
      </Box>
    )
  },
  {
    element: (
      <Box css={navItemsCss.sideBarField}>
        <NavLink to={`/app/AccountSettings`} css={navItemsCss.sideBarLink}>
          <ManageAccountsIcon css={navItemsCss.sideBarIcon} />
        </NavLink>
      </Box>
    )
  }
];

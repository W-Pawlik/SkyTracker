import { css, useTheme } from "@emotion/react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { AppBar, Box, Divider, Theme, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SocialMediaContainer } from "../containers/SocialMediaContainer";

const bottomBarCss = {
  footer: () =>
    css({
      display: "flex",
      flexDirection: "column",
      padding: "0 5rem"
    }),
  footerContent: (theme: Theme) =>
    css({
      color: theme.palette.common.white,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center",
      padding: "0.8rem 1rem",
      borderTop: `thin solid ${theme.palette.common.lightGrey}`,
      fontWeight: "600"
    }),
  leftContent: () =>
    css({
      display: "flex",
      alignItems: "center",
      gap: "2rem"
    }),
  link: (theme: Theme) =>
    css({
      textDecoration: "none",
      color: theme.palette.common.white,
      fontWeight: "bold",
      "&:hover": {
        color: "#d1d0d0"
      }
    })
};

const socialMediaIcons = [
  { icon: FacebookIcon, url: "https://www.facebook.com" },
  { icon: InstagramIcon, url: "https://www.instagram.com/" }
];

export const BottomBar = () => {
  const theme: Theme = useTheme();
  return (
    <AppBar
      component="footer"
      css={bottomBarCss.footer}
      sx={{ padding: { xs: "1rem", sm: "5rem" }, paddingBottom: "0 !important" }}
    >
      <Box css={bottomBarCss.footerContent} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box css={bottomBarCss.leftContent}>
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            Copyright &copy;2024 SkyTracker. All rights reserved.
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{
              height: "2rem",
              borderColor: theme.palette.common.white
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            Designed by Wojciech pawlik{" "}
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{
              height: "2rem",
              borderColor: theme.palette.common.white
            }}
          />
          <Link to="#" css={bottomBarCss.link}>
            Privacy Policy
          </Link>
        </Box>
        <SocialMediaContainer icons={socialMediaIcons} />
      </Box>
    </AppBar>
  );
};

import { css } from "@emotion/react";
import { Divider, Typography } from "@mui/material";
import { Box, Theme, useTheme } from "@mui/system";
import BackgroundShape from "../../assets/images/png/backgrounds/backgroundShape1.png";
import { socialMediaIcons } from "../../consts/data/SocialMediaIcons";
import { SocialMediaContainer } from "../containers/SocialMediaContainer";
import { ContactForm } from "../forms/ContactForm";

const ContactSectionCss = {
  box: () =>
    css({
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 4rem"
    }),
  leftSide: () =>
    css({
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "3rem",
      height: "22rem",
      zIndex: "4"
    }),
  rightSide: () =>
    css({
      zIndex: "4",
      width: "50%"
    }),
  followContainer: () =>
    css({
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      gap: "2rem"
    }),
  bg: () =>
    css({
      position: "absolute",
      top: "-12rem",
      right: "-2rem",
      zIndex: "-1"
    })
};

export const ContactSection = () => {
  const theme: Theme = useTheme();

  return (
    <Box css={ContactSectionCss.box}>
      <Box css={ContactSectionCss.leftSide}>
        <Box component="img" src={BackgroundShape} css={ContactSectionCss.bg} />
        <Typography
          variant="h1"
          sx={{ color: theme.palette.primary.main, fontSize: " 3.12rem", maxWidth: "80%" }}
        >
          Did you like our app?
        </Typography>
        <Box css={ContactSectionCss.followContainer}>
          <Divider
            orientation="vertical"
            flexItem
            variant="fullWidth"
            sx={{
              position: "relative",
              width: "4rem",
              border: "none",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                height: "2px",
                width: "100%",
                backgroundColor: theme.palette.primary.main
              }
            }}
          />
          <Typography fontWeight="bold">Floow us</Typography>
          <Typography component="div" sx={{ color: theme.palette.primary.main }}>
            <SocialMediaContainer icons={socialMediaIcons} />
          </Typography>
        </Box>
      </Box>
      <Box css={ContactSectionCss.rightSide}>
        <ContactForm />
      </Box>
    </Box>
  );
};

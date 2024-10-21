import { useState } from "react";
import { css } from "@emotion/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Input, Typography } from "@mui/material";
import { Box, Theme, useTheme } from "@mui/system";
import GlassyLogo from "../../assets/images/png/startingViewpngs/GlassyLogo.png";
import NewsletterBackground from "../../assets/images/png/startingViewpngs/newsletterBackground.png";

const NewsletterCss = {
  box: (theme: Theme) =>
    css({
      height: "100%",
      maxWidth: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      color: theme.palette.common.white
    })
};

export const Newsletter = () => {
  const theme: Theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box
        component="img"
        src={GlassyLogo}
        alt="SkyTracker"
        sx={{
          width: "100%",
          transform: "translateY(3.2rem)",
          zIndex: "1",
          boxShadow: "0px -100px 40px 0px #082d6457 inset"
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          background: `url(${NewsletterBackground})`,
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",
          height: "20rem",
          zIndex: "2"
        }}
      >
        <Typography variant="h2" fontSize="2rem" width="20rem" textAlign="center">
          Sign up to get latest app updates
        </Typography>
        <Input
          placeholder="Enter your email"
          sx={{
            border: "1px solid #D9D9D9",
            padding: "0.5rem",
            borderRadius: "10px",
            width: "30%"
          }}
        />
      </Box>
    </Box>
  );
};

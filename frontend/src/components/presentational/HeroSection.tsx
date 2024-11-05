import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CommonButton } from "./Button";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  banner?: string;
}

const heroSectionCss = {
  box: () =>
    css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "60vh",

      "::before": {
        content: `""`,
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "90vh",
        // eslint-disable-next-line max-len
        background: `linear-gradient(90deg, rgba(14,56,120,0.9668242296918768) 19%, rgba(8,45,100,0.7231267507002801) 50%, rgba(115,115,115,0) 100%)`,
        zIndex: "10"
      }
    }),
  video: () =>
    css({
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "90vh",
      objectFit: "cover",
      zIndex: "5"
    }),
  textContent: () =>
    css({
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      zIndex: "12",
      margin: "0 5rem",
      padding: "0 1rem"
    }),
  btnsBox: () =>
    css({
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      gap: "2rem"
    })
};

export const HeroSection = ({ title, subtitle, banner }: HeroSectionProps) => (
  <Box css={heroSectionCss.box} component="div">
    <Box component="video" autoPlay muted loop src={banner} css={heroSectionCss.video} />
    <Box css={heroSectionCss.textContent}>
      <Typography
        variant="h3"
        sx={{
          fontSize: "2rem",
          fontWeight: "500",
          color: "#fff",
          textTransform: "uppercase",
          width: "70%"
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: "3.1rem",
          fontWeight: "600",
          color: "#fff",
          textTransform: "uppercase",
          marginBottom: "1.2rem",
          width: "70%"
        }}
      >
        {subtitle}
      </Typography>
      <Box sx={heroSectionCss.btnsBox}>
        <CommonButton text="Explore" type="button" color="secondary" size="large" />
        <CommonButton text="Try it!" size="large" />
      </Box>
    </Box>
  </Box>
);

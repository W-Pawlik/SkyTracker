import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import backgroundShape1 from "../../assets/images/png/backgrounds/backgroundShape1.png";

interface TitleSubTitleContProps {
  title: string;
  subtitle: string;
  gap?: string;
}

const TitleSubTitleContCss = {
  box: (gap: string) =>
    css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: `${gap}`,
      background: `url(${backgroundShape1})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      paddingTop: "1rem",
      maxHeight: "60rem",
      maxWidth: "60rem"
    })
};

export const TitleSubTitleCont = ({ gap = "0", title, subtitle }: TitleSubTitleContProps) => (
  <Box css={TitleSubTitleContCss.box(gap)}>
    <Typography variant="h1" width="70%" textAlign="start">
      {title}
    </Typography>
    <Typography variant="body1" width="70%">
      {subtitle}
    </Typography>
  </Box>
);

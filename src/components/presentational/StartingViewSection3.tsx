import { css, Theme, useTheme } from "@emotion/react";
import CircleIcon from "@mui/icons-material/Circle";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "../../assets/images/png/SKYTRACKER.png";
import Img2 from "../../assets/images/png/startingViewpngs/manWatchingAirplane.png";
import { CommonButton } from "./Button";

const items = [
  "Real-time aircraft tracking: Follow planes as they fly over different regions, updated every few seconds.",
  "Detailed flight data: View essential flight information such as aircraft speed, altitude, and origin-destination airports.",
  "Interactive map: Navigate an easy-to-use map that lets you zoom in on specific areas or planes of interest.",
  "Global coverage: Track flights across continents, from bustling airports to remote destinations."
];

const StartingViewSection3Css = {
  box: () =>
    css({
      display: "flex"
    }),
  contentBox: (theme: Theme) =>
    css({
      display: "flex",
      flexDirection: "column",
      padding: "4rem",
      gap: "3rem",
      backgroundColor: theme.palette.background.paper
    }),
  listItem: () =>
    css({
      padding: "0.20rem"
    })
};

export const StartingViewSection3 = () => {
  const theme: Theme = useTheme();

  return (
    <Box
      css={StartingViewSection3Css.box}
      sx={{ flexDirection: { xs: "column", sm: "column", md: "row" } }}
    >
      <Box
        component="img"
        src={Img2}
        alt="ManWatchingAirPlane"
        sx={{ width: { xs: "100%", sm: "100%", md: "50%" } }}
      />
      <Box
        css={StartingViewSection3Css.contentBox(theme)}
        sx={{
          width: { xs: "auto", sm: "auto", md: "50%" },
          padding: { xs: "2rem", sm: "3rem", md: "4rem" }
        }}
      >
        <Typography component="div" variant="h1">
          With <Box component="img" src={Logo} /> you'll get
        </Typography>
        <Box component="div" sx={{ maxWidth: "40rem" }}>
          <List>
            {items.map((item, index) => (
              <ListItem css={StartingViewSection3Css.listItem} key={index}>
                <ListItemIcon>
                  <CircleIcon htmlColor="#fff" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        <CommonButton text="Sign In" color="secondary" size="large" />
      </Box>
    </Box>
  );
};

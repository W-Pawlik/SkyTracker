import { css } from "@emotion/react";
import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Box, Theme, useTheme } from "@mui/system";
import GlassyLogo from "../../assets/images/png/startingViewpngs/GlassyLogo.png";
import NewsletterBackground from "../../assets/images/png/startingViewpngs/newsletterBackground.png";
import { CommonButton } from "./Button";

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
    }),
  input: (theme: Theme) =>
    css({
      border: "1px solid #D9D9D9",
      borderRadius: "15px",
      width: "30%",
      "&:: after": {
        borderColor: theme.palette.primary.main,
        borderBottomColor: `${theme.palette.primary.main} !important`,
        borderRadius: "15px !important"
      },
      "&: hover": {
        "&:: after": {
          borderBottom: `2px solid ${theme.palette.secondary.main} !important`,
          borderRadius: "15px !important"
        }
      },
      "& .MuiFilledInput-underline:before": {
        borderRadius: "15px",
        height: "20rem"
      },
      "& .MuiFilledInput-underline:after": {
        borderRadius: "15px",
        height: "100%"
      },
      "& .MuiFilledInput-root.Mui-focused:after": {
        borderRadius: "15px",
        height: "100%"
      }
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
        <TextField
          variant="filled"
          placeholder="Enter your email"
          css={NewsletterCss.input(theme)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {}}>
                  <CommonButton text="Sign up" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  );
};

import { css } from "@emotion/react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { Box, Theme, useTheme } from "@mui/system";
import { CommonButton } from "../presentational/Button";

const ContactFormCss = {
  box: (theme: Theme) =>
    css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      color: theme.palette.common.white,
      gap: "1rem",
      "& > button:last-of-type": {
        alignSelf: "end"
      }
    }),
  inputStyle: (theme: Theme) =>
    css({
      width: "100%",
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
      "& .MuiInputBase-input": {
        color: theme.palette.text.primary
      },
      "& .MuiFilledInput-underline": {
        backgroundColor: "transparent"
      },
      "& .MuiFilledInput-underline:after": {
        borderBottom: `2px solid ${theme.palette.primary.main}`
      },
      "& input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 100px transparent inset`,
        WebkitTextFillColor: theme.palette.text.primary,
        transition: "background-color 5000s ease-in-out 0s"
      },
      "& input:-webkit-autofill:focus": {
        WebkitBoxShadow: `0 0 0 100px transparent inset`
      }
    })
};

export const ContactForm = () => {
  const theme: Theme = useTheme();

  return (
    <Box css={ContactFormCss.box(theme)}>
      <Typography
        variant="h2"
        fontSize="3rem"
        gutterBottom
        sx={{ color: "white", fontWeight: "bold" }}
      >
        Get in touch
      </Typography>

      <TextField
        variant="filled"
        placeholder={`Name`}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineOutlinedIcon
                fontSize="large"
                sx={{ fontWeight: "bold", color: theme.palette.common.black }}
              />
            </InputAdornment>
          )
        }}
        css={ContactFormCss.inputStyle(theme)}
      />
      <TextField
        variant="filled"
        placeholder={`Email`}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon
                fontSize="large"
                sx={{ fontWeight: "bold", color: theme.palette.common.black }}
              />
            </InputAdornment>
          )
        }}
        css={ContactFormCss.inputStyle(theme)}
      />
      <TextField
        variant="filled"
        placeholder={`Phone`}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocalPhoneOutlinedIcon
                fontSize="large"
                sx={{ fontWeight: "bold", color: theme.palette.common.black }}
              />
            </InputAdornment>
          )
        }}
        css={ContactFormCss.inputStyle(theme)}
      />
      <TextField
        variant="filled"
        placeholder={`Message`}
        fullWidth
        multiline
        rows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ alignSelf: "start" }}>
              <ChatBubbleOutlineOutlinedIcon
                fontSize="large"
                sx={{ fontWeight: "bold", color: theme.palette.common.black }}
              />
            </InputAdornment>
          )
        }}
        css={ContactFormCss.inputStyle(theme)}
      />

      <CommonButton text="sumbit" size="large" />
    </Box>
  );
};

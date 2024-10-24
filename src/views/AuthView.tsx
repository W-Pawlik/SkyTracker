import { useState } from "react";
import { css, Theme, useTheme } from "@emotion/react";
import { Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import SideBackground from "../assets/images/png/backgrounds/sideBackground.png";
import FacebookIcon from "../assets/images/png/facebookIcon.png";
import GoogleIcon from "../assets/images/png/googleIcon.png";
import { CommonButton } from "../components/presentational/Button";
import { PasswordField } from "../components/presentational/PasswordField";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword
} from "../services/fireBase/auth";
import { AuthViewProps } from "../types/authView";

const AuthViewCss = {
  box: (theme: Theme, isCtaOnLeft: boolean) =>
    css({
      position: "absolute",
      top: "-4.7rem",
      display: "flex",
      width: "100%",
      height: "100vh",
      flexDirection: isCtaOnLeft ? "row-reverse" : "row"
    }),
  inputSection: () =>
    css({
      display: "flex",
      flexDirection: "column",
      width: "70%",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem"
    }),
  ctaSection: () =>
    css({
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      background: `url(${SideBackground})`,
      backgroundSize: "cover",
      width: "30%",
      padding: "0 2rem"
    }),
  dividerStyle: (theme: Theme) =>
    css({
      position: "relative",
      width: "5rem",
      border: "none",
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        height: "2px",
        width: "100%",
        backgroundColor: theme.palette.secondary.main
      }
    }),
  inputStyle: (theme: Theme) =>
    css({
      height: "3rem",
      backgroundColor: "#EAEFFF",
      borderRadius: "10px",

      "& .MuiFilledInput-root::before": {
        borderBottom: "none",
        borderBottomRightRadius: "10px !important"
      },
      "&: hover": {
        "& .MuiFilledInput-root::before": {
          borderBottomRightRadius: "10px !important",
          borderBottom: `2px solid ${theme.palette.background.paper}`,
          borderRadius: "10px"
        }
      },
      "& .MuiFilledInput-input": {
        height: "100%",
        padding: "13px 10px",
        fontSize: "1.2rem",
        color: "#6D6D70"
      },
      "& .MuiInputBase-input::placeholder": {
        color: "#6D6D70",
        opacity: "1"
      },
      "& .MuiFilledInput-underline:after": {
        borderRadius: "10px",
        height: "2rem"
      }
    })
};

const AuthView = ({
  isLogin,
  ctaTitle,
  ctaSubtitle,
  buttonText,
  ctaButtonText,
  isCtaOnLeft = false
}: AuthViewProps) => {
  const theme: Theme = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeAuthView = () => {
    navigate(`/${isLogin ? "register" : "login"}`);
  };

  const handleSubmit = async () => {
    if (!isLogin) {
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/app");
      } catch (error) {
        console.error("Rejestarcja nie powiodła się:", error);
      }
    } else if (isLogin) {
      try {
        navigate("/app");
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error("Logowanie nie powdiło się:", error);
      }
    }
  };

  return (
    <Box css={AuthViewCss.box(theme, isCtaOnLeft)}>
      <Box css={AuthViewCss.inputSection}>
        <Typography variant="h1" fontSize="2.5rem">
          {isLogin ? "Login to your Account" : "Create a New Account"}
        </Typography>
        <Typography variant="h3">
          {isLogin ? "Login using social networks" : "Sign up using social networks"}
        </Typography>
        <Box display="flex" gap="1rem" alignItems="center">
          <Box component="img" src={FacebookIcon} sx={{ height: "4rem", cursor: "pointer" }} />
          <Box component="img" src={GoogleIcon} sx={{ height: "3.2rem", cursor: "pointer" }} />
        </Box>
        <Box display="flex" gap="1rem">
          <Divider
            orientation="vertical"
            flexItem
            variant="fullWidth"
            css={AuthViewCss.dividerStyle}
          />
          <Typography textAlign="center" variant="body2">
            OR
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            variant="fullWidth"
            css={AuthViewCss.dividerStyle}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="1rem" width="50%">
          <TextField
            sx={{ height: "2.5rem" }}
            variant="filled"
            placeholder={`Email`}
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            css={AuthViewCss.inputStyle}
          />
          <PasswordField
            password={password}
            setPassword={setPassword}
            toggleVisibility={handleTogglePasswordVisibility}
            showPassword={showPassword}
          />
        </Box>
        <CommonButton text={buttonText} size="large" onClick={handleSubmit} />
      </Box>
      <Box css={AuthViewCss.ctaSection}>
        <Typography variant="h1">{ctaTitle}</Typography>
        <Typography variant="h2">{ctaSubtitle}</Typography>
        <CommonButton
          text={ctaButtonText}
          size="large"
          color="secondary"
          onClick={handleChangeAuthView}
        />
      </Box>
    </Box>
  );
};

export default AuthView;

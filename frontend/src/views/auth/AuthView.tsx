import { useState } from "react";
import { css, Theme, useTheme } from "@emotion/react";
import { Alert, Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import SideBackground from "../../assets/images/png/backgrounds/sideBackground.png";
import FacebookIcon from "../../assets/images/png/facebookIcon.png";
import GoogleIcon from "../../assets/images/png/googleIcon.png";
import { CommonButton } from "../../components/presentational/Button";
import { PasswordField } from "../../components/presentational/PasswordField";
import { navigationRoutes } from "../../consts/navigationRoutes";
import { useAuthAction } from "../../hooks/useAuthAction";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle
} from "../../services/fireBase/auth";
import { AuthViewProps } from "../../types/authView";

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
  error: (theme: Theme) =>
    css({
      backgroundColor: theme.palette.error.main,
      borderRadius: "20px",
      "& .MuiAlert-icon": {
        color: "black"
      }
    }),
  warning: (theme: Theme) =>
    css({
      backgroundColor: theme.palette.warning.main,
      borderRadius: "20px",
      "& .MuiAlert-icon": {
        color: "black"
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleAuthAction, loading, error, setError, warning } = useAuthAction();

  const handleSubmit = () => {
    handleAuthAction(() =>
      isLogin
        ? doSignInWithEmailAndPassword(email, password)
        : doCreateUserWithEmailAndPassword(email, password)
    );
  };

  const handleGoogleIClick = () => handleAuthAction(doSignInWithGoogle);

  const handleChangeAuthView = () => {
    setError("");
    setEmail("");
    setPassword("");
    navigate(`/${isLogin ? "register" : "login"}`);
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
          <Box
            component="img"
            src={GoogleIcon}
            sx={{ height: "3.2rem", cursor: "pointer" }}
            onClick={handleGoogleIClick}
          />
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
            className="MuiTextField-secondary"
          />
          <PasswordField password={password} setPassword={setPassword} />
        </Box>
        {isLogin ? (
          <Link to={`/${navigationRoutes.ResetPassword}`} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                textDecoration: "none",
                color: theme.palette.text.primary,
                "&:hover": {
                  color: theme.palette.primary.main
                }
              }}
            >
              Forgot Password?
            </Typography>
          </Link>
        ) : null}

        <CommonButton
          text={loading === true ? "loading" : buttonText}
          size="large"
          onClick={handleSubmit}
          disabled={loading}
        />
        {error ? (
          <Alert severity="error" css={AuthViewCss.error}>
            {error}
          </Alert>
        ) : null}
        {warning ? (
          <Alert severity="warning" css={AuthViewCss.warning}>
            {warning}
          </Alert>
        ) : null}
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

import { useState } from "react";
import { css } from "@emotion/react";
import { Alert, Box, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CommonButton } from "../../components/presentational/Button";
import { navigationRoutes } from "../../consts/navigationRoutes";
import { doPasswordReset } from "../../services/fireBase/auth";

const ResetPasswordViewCss = {
  box: () =>
    css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      gap: "2rem"
    }),
  newAccBox: () =>
    css({
      display: "flex",
      gap: "1rem"
    }),
  link: () =>
    css({
      fontSize: "1.5rem"
    })
};

const ResetPasswordView = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleClick = async () => {
    setMessage("");
    const result = await doPasswordReset(email);
    setMessage(result.message);
    setSuccess(result.success);
  };

  return (
    <Box css={ResetPasswordViewCss.box}>
      <Typography variant="h1" fontSize={"2.5rem"}>
        Password Reset
      </Typography>
      <Box sx={{ width: { xs: "15rem", sm: "25rem", md: "30rem", lg: "35rem", xl: "35rem" } }}>
        <TextField
          sx={{ height: "2.5rem" }}
          variant="filled"
          placeholder={`Email`}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="MuiTextField-secondary"
        />
      </Box>
      <CommonButton text="Reset Password" onClick={handleClick} />
      {message && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
      <Link to={`/${navigationRoutes.Login}`} css={ResetPasswordViewCss.link}>
        If you're done Login to your account
      </Link>
      <Box css={ResetPasswordViewCss.newAccBox}>
        <Typography variant="body2">Need an account? </Typography>
        <Link to={`/${navigationRoutes.Register}`}>Sign in</Link>
      </Box>
    </Box>
  );
};
export default ResetPasswordView;

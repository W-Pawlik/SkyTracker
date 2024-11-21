import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import accImg from "../../assets/images/webp/profilePic.webp";
import { AccSettingContainer } from "../../components/containers/AccSettingContainer";
import { AccIntegrationsManager } from "../../components/presentational/AccIntegrationsManager";
import { ChangeDisplayName } from "../../components/presentational/ChangeDisplayName";
import { ChangeProfilePicutre } from "../../components/presentational/ChangeProfilePicutre";
import { DeleteAccount } from "../../components/presentational/DeleteAccount";
import { PasswordManager } from "../../components/presentational/PasswordManager";
import { SnackbarManager } from "../../components/presentational/SnackbarManager";
import { useAuth } from "../../contexts/authContext/AuthContext";

const AccountSettingsViewCss = {
  box: () =>
    css({
      height: "100%",
      padding: "1.25rem 7rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    }),
  title: () =>
    css({
      textAlign: "center"
    }),
  optionsContainer: () =>
    css({
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    }),
  restOptionsContainer: () =>
    css({
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "1.5rem"
    })
};

export const AccountSettingsView = () => {
  const auth = useAuth();

  return (
    <Box css={AccountSettingsViewCss.box}>
      <Typography variant="h1" css={AccountSettingsViewCss.title}>
        Account Settings
      </Typography>
      <Box css={AccountSettingsViewCss.optionsContainer}>
        <ChangeProfilePicutre photoURL={auth.currentUser?.photoURL || accImg} />
        <Box css={AccountSettingsViewCss.restOptionsContainer}>
          <AccSettingContainer title="Change display name">
            <ChangeDisplayName />
          </AccSettingContainer>

          <PasswordManager />

          <AccSettingContainer title="Integrate account">
            <AccIntegrationsManager />
          </AccSettingContainer>

          <AccSettingContainer title="Delete account" isBorderBottom={false}>
            <DeleteAccount />
          </AccSettingContainer>
        </Box>
      </Box>
      <SnackbarManager />
    </Box>
  );
};

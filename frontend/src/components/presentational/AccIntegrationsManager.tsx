import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import FacebookIcon from "../../assets/images/png/facebookIcon.png";
import GoogleIcon from "../../assets/images/png/googleIcon.png";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { doLinkWithGoogle } from "../../services/fireBase/auth";
import { CommonButton } from "./Button";

export const AccIntegrationsManager = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const isGoogleConnected = auth.currentUser?.providerData[0].providerId === "google.com";

  const handleLinkWithGoogle = async () => {
    try {
      const userCredential = await doLinkWithGoogle();
      const updatedProviderData = userCredential.providerData;
      auth.updateUserState({ providerData: updatedProviderData });

      dispatch(
        showSnackbar({ message: "Account successfully linked with Google", alertType: "success" })
      );
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "Failed to set up password",
          alertType: "error"
        })
      );
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "3rem" }}>
        <Box component="img" src={GoogleIcon} sx={{ width: "2rem", height: "2rem" }} />
        <CommonButton
          text={isGoogleConnected ? "Connected" : "Connect"}
          size="large"
          disabled={isGoogleConnected}
          onClick={handleLinkWithGoogle}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "3rem" }}>
        <Box component="img" src={FacebookIcon} sx={{ width: "2rem", height: "2rem" }} />
        <CommonButton text="Connect" size="large" />
      </Box>
    </>
  );
};

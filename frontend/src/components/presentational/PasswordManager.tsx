import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { doChangePassword, doReauthenticate } from "../../services/fireBase/auth";
import { AccSettingContainer } from "../containers/AccSettingContainer";
import { CommonButton } from "./Button";
import { PasswordField } from "./PasswordField";

export const PasswordManager = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const isGoogleConnected = auth.currentUser?.providerData[0].providerId === "google.com";
  const isGoogleAndPasswordConntected =
    auth.currentUser?.providerData[0].providerId === "google.com" &&
    auth.currentUser?.providerData[1]?.providerId === "password";

  const handleChangePassword = async (currPassword: string, newPassword: string) => {
    try {
      if (!auth.currentUser) {
        dispatch(
          showSnackbar({
            message: "No user logged in",
            alertType: "error"
          })
        );
        throw new Error("No user logged in");
      }
      await doReauthenticate(currPassword);
      await doChangePassword(newPassword);
      dispatch(showSnackbar({ message: "Password successfully changed", alertType: "success" }));
      setCurrPassword("");
      setNewPassword("");
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "Failed to change password",
          alertType: "error"
        })
      );

      throw new Error("Failed to upload password");
    }
  };

  const handleSetUpPassword = async (newPassword: string) => {
    try {
      if (!auth.currentUser) {
        dispatch(
          showSnackbar({
            message: "No user logged in",
            alertType: "error"
          })
        );
        throw new Error("No user logged in");
      }
      await doReauthenticate();
      await doChangePassword(newPassword);

      auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      const updatedProviderData = updatedUser?.providerData;

      auth.updateUserState({
        providerData: updatedProviderData
      });
      dispatch(showSnackbar({ message: "Password successfully set up", alertType: "success" }));
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "Failed to set up password",
          alertType: "error"
        })
      );
      throw new Error("Failed to upload password");
    }
  };

  return isGoogleAndPasswordConntected || !isGoogleConnected ? (
    <AccSettingContainer title="Change password">
      <PasswordField
        placeHolder="Current Password"
        password={currPassword}
        setPassword={setCurrPassword}
      />
      <PasswordField password={newPassword} setPassword={setNewPassword} />
      <CommonButton
        text="Change"
        size="large"
        onClick={() => handleChangePassword(currPassword, newPassword)}
      />
    </AccSettingContainer>
  ) : isGoogleConnected ? (
    <AccSettingContainer title="Set up your new password">
      <PasswordField password={newPassword} setPassword={setNewPassword} />
      <CommonButton text="Set up" size="large" onClick={() => handleSetUpPassword(newPassword)} />
    </AccSettingContainer>
  ) : null;
};

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { doDeleteAccount, doReauthenticate } from "../../services/fireBase/auth";
import { BaseFormDialog } from "./BaseDialog";
import { CommonButton } from "./Button";

export const DeleteAccount = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState("");

  const inputs = [
    {
      placeholder: "Password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      label: "Password",
      type: "password"
    }
  ];

  const isGoogleConnected = auth.currentUser?.providerData[0].providerId === "google.com";
  const isGoogleAndPasswordConntected =
    auth.currentUser?.providerData[0].providerId === "google.com" &&
    auth.currentUser?.providerData[1]?.providerId === "password";

  const handleSubmitDeleteAccount = async (password?: string) => {
    try {
      await doReauthenticate(password);
      await doDeleteAccount();

      setOpenDialog(false);
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "Failed to set up password",
          alertType: "error"
        })
      );
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <CommonButton
        text="Delete"
        size="large"
        color="error"
        onClick={
          isGoogleAndPasswordConntected || isGoogleConnected
            ? () => handleSubmitDeleteAccount()
            : () => setOpenDialog(true)
        }
      />
      {openDialog ? (
        <BaseFormDialog
          open={openDialog}
          dialogText="To delete your account confirm it with your password"
          title="Reauthentication"
          inputs={inputs}
          onClose={handleCloseDialog}
          onSubmit={() => handleSubmitDeleteAccount(password)}
        />
      ) : null}
    </>
  );
};

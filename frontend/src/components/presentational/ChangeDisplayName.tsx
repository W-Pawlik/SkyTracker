import { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { CommonButton } from "../../components/presentational/Button";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { doChangeDisplayName } from "../../services/fireBase/auth";

export const ChangeDisplayName = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [newDisplayName, setNewDisplayName] = useState<string>("");

  const handleChangeDisplayName = async () => {
    try {
      if (auth.currentUser?.displayName === newDisplayName) {
        dispatch(
          showSnackbar({
            message: "You are already using this name",
            alertType: "error"
          })
        );
        throw new Error("You are already using this name");
      }

      if (newDisplayName.length > 15) {
        dispatch(
          showSnackbar({
            message: "New display name is too long. It has to be shorter than 15 chars",
            alertType: "error"
          })
        );
        throw new Error("New display name is too long. It has to be shorter than 15 chars");
      }

      await doChangeDisplayName(newDisplayName);
      auth.updateUserState({ displayName: newDisplayName });
      dispatch(
        showSnackbar({ message: "Display name successfully changed", alertType: "success" })
      );

      setNewDisplayName("");
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "Failed to change display name",
          alertType: "error"
        })
      );
    }
  };

  return (
    <>
      <TextField
        variant="filled"
        placeholder={`Display name`}
        fullWidth
        className="MuiTextField-secondary"
        value={newDisplayName}
        onChange={(e) => setNewDisplayName(e.target.value)}
      />
      <CommonButton text="Change" size="large" onClick={handleChangeDisplayName} />
    </>
  );
};

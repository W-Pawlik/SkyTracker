import { useState } from "react";
import { css, Theme, useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import accImg from "../../assets/images/webp/profilePic.webp";
import { CommonButton } from "../../components/presentational/Button";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { showSnackbar } from "../../redux/slices/snackbarSlice";
import { doChangeProfilePicture } from "../../services/fireBase/auth";

interface IChangeProfilePicutre {
  photoURL: string;
}

const ChangeProfilePicutreCss = {
  profilePictureContainer: (theme: Theme) =>
    css({
      display: "flex",
      gap: "2rem",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
      paddingBottom: "1rem"
    }),
  profPicTextCont: () =>
    css({
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "start"
    }),
  buttonsContainer: () =>
    css({
      display: "flex",
      gap: "2rem",
      height: "50%"
    }),
  profPicContLCont: () =>
    css({
      display: "flex",
      gap: "1.5rem",
      alignItems: "center"
    })
};

export const ChangeProfilePicutre = ({ photoURL }: IChangeProfilePicutre) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [newPhotoURL, setNewPhotoURL] = useState<string>(
    "https://media.gettyimages.com/id/523761634/photo/cute-panda-bear-climbing-in-tree.jpg?b=1&s=1024x1024&w=gi&k=20&c=TpzAmF5caEMPXaMVldk1VvkZa0qXQjNaKjiAEX8sY-g="
  );
  const handleChangeProfilePicture = async () => {
    try {
      if (auth.currentUser?.photoURL === newPhotoURL) {
        dispatch(showSnackbar({ message: "You are already using this photo", alertType: "error" }));
        throw new Error("You are already using this photo");
      }

      await doChangeProfilePicture(newPhotoURL);
      auth.updateUserState({ photoURL: newPhotoURL });
      dispatch(
        showSnackbar({ message: "Profile picture successfully updated", alertType: "success" })
      );
      setNewPhotoURL("");
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "Failed to update profile picture",
          alertType: "error"
        })
      );
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      await doChangeProfilePicture(accImg);
      auth.updateUserState({ photoURL: accImg });
      dispatch(
        showSnackbar({ message: "Profile picture successfully deleted", alertType: "success" })
      );
    } catch (error: any) {
      dispatch(
        showSnackbar({
          message: error.message || "Failed to delete profile picture",
          alertType: "error"
        })
      );
    }
  };

  return (
    <Box css={ChangeProfilePicutreCss.profilePictureContainer(useTheme())}>
      <Box css={ChangeProfilePicutreCss.profPicContLCont}>
        <Box
          component="img"
          src={photoURL || accImg}
          sx={{ width: "5rem", height: "5rem", borderRadius: "50%" }}
        />
        <Box css={ChangeProfilePicutreCss.profPicTextCont}>
          <Typography variant="h3">Profile picture</Typography>
          <Typography variant="body2">PNG, JPEG under 15MB</Typography>
        </Box>
      </Box>
      <Box css={ChangeProfilePicutreCss.buttonsContainer}>
        <CommonButton text="Upload" size="large" onClick={handleChangeProfilePicture} />
        <CommonButton
          text="Delete"
          size="large"
          color="error"
          onClick={handleDeleteProfilePicture}
        />
      </Box>
    </Box>
  );
};

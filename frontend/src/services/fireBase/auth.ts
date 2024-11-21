import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    await sendEmailVerification(user, {
      url: `${window.location.origin}/app`
    });

    doSignOut();

    return {
      success: true,
      message: "Account created. Please verify your email to complete registration."
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // eslint-disable-next-line unicorn/no-negated-condition
    if (!user.emailVerified) {
      doSignOut();
      throw new Error("Please verify your email before logging in.");
    } else {
      return userCredential;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const userCredential = result.user;
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const doSignOut = () => auth.signOut();

export const doDeleteAccount = async () => {
  if (auth.currentUser) {
    try {
      await auth.currentUser.delete();
      return { success: true, message: "Account deleted successfully" };
    } catch (error: any) {
      const error_ =
        error.code === "auth/requires-recent-login"
          ? new Error(
              "You need to reauthenticate before deleting your account. Please log in again."
            )
          : new Error(error.message);
      throw error_;
    }
  } else {
    throw new Error("No user is currently logged in");
  }
};

export const doPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "If an account with this email exists, a reset email has been sent."
    };
  } catch (error: any) {
    let errorMessage = "There was an error.";

    switch (error.code) {
      case "auth/invalid-email": {
        errorMessage = "Invalid email format.";
        break;
      }
      case "auth/user-not-found": {
        errorMessage = "If an account with this email exists, a reset email has been sent.";
        break;
      }
      case "auth/network-request-failed": {
        errorMessage = "There was a network error. Please try again.";
        break;
      }
      default: {
        errorMessage = "An error occurred. Please try again.";
        break;
      }
    }

    return { success: false, message: errorMessage };
  }
};

export const doChangePassword = async (newPassword: string) => {
  if (!auth.currentUser) {
    return;
  }

  try {
    await updatePassword(auth.currentUser, newPassword);
    console.log("Password updated succ");
  } catch {
    throw new Error("Failed to update password");
  }
};

export const doReauthenticate = async (password?: string) => {
  if (!auth.currentUser) {
    throw new Error("No user is currently logged in.");
  }

  const providerData = auth.currentUser.providerData[0];

  try {
    if (providerData.providerId === "google.com") {
      const googleProvider = new GoogleAuthProvider();
      await reauthenticateWithPopup(auth.currentUser, googleProvider);
      console.log("Reauthenticated with Google");
    } else if (providerData.providerId === "password") {
      if (!password) {
        throw new Error("Password is required for email reauthentication.");
      }
      const credential = EmailAuthProvider.credential(auth.currentUser.email!, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
      console.log("Reauthenticated with email/password");
    } else {
      throw new Error("Unsupported authentication provider.");
    }
  } catch (error: any) {
    throw new Error("Reauthentication failed: " + error.message);
  }
};

export const doLinkWithGoogle = async () => {
  if (auth.currentUser) {
    try {
      const provider = new GoogleAuthProvider();
      const result = await linkWithPopup(auth.currentUser, provider);
      return result.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  } else {
    throw new Error("No user is currently logged in");
  }
};

export const updateUserProfile = async (
  updates: Partial<{ displayName: string; photoURL: string }>
) => {
  if (!auth.currentUser) {
    throw new Error("No user is currently logged in");
  }

  try {
    await updateProfile(auth.currentUser, updates);
    return updates;
  } catch (error: any) {
    console.error("Error updating user profile:", error.message);
    throw new Error("Failed to update user profile.");
  }
};

export const doChangeDisplayName = async (newDisplayName: string) =>
  await updateUserProfile({ displayName: newDisplayName });

export const doChangeProfilePicture = async (newPhotoURL: string) =>
  await updateUserProfile({ photoURL: newPhotoURL });

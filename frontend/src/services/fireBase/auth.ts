import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup
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

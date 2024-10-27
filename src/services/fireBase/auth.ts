import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  User
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await doSendEmailVerification();

    await waitForEmailVerification(userCredential.user);

    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
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

export const doSendEmailVerification = () =>
  auth.currentUser
    ? sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/app`
      })
    : Promise.reject(new Error("No authenticated user found"));

// eslint-disable-next-line require-await
const waitForEmailVerification = async (user: User) =>
  new Promise<void>((resolve) => {
    const checkVerification = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(checkVerification);
        resolve();
      }
    }, 3000);
  });

export const doSignOut = () => auth.signOut();

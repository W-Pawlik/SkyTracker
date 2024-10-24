import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

// eslint-disable-next-line require-await
export const doCreateUserWithEmailAndPassword = async (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const doSignInWithEmailAndPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const doSignOut = () => auth.signOut();

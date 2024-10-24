import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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

export const doSignOut = () => auth.signOut();

import { User } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createUserInFirestore = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      throw new Error("User acutally exists in database");
    } else {
      await setDoc(userRef, {
        favAirplanes: []
      });
    }
  } catch (error: any) {
    throw new Error("Error creating user in Firestore:", error);
  }
};

export const getUserFromFirestore = async (uid: string): Promise<any> => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    return userDoc.exists() ? userDoc.data() : null;
  } catch (error: any) {
    throw new Error("Error fetching user from Firestore:", error);
  }
};

export const deleteUserFromFirestore = async (uid: string) => {
  try {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
  } catch (error: any) {
    throw new Error("Error deleting Firestore document:", error);
  }
};

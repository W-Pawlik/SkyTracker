import { User } from "firebase/auth";
import { arrayUnion, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Airplane } from "../../../types/Airplane";
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

export const addAirplaneToFavList = async (uid: string, airplane: Airplane) => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      favAirplanes: arrayUnion(airplane)
    });
  } catch (error: any) {
    throw new Error("Couldn't add airplane to the fav list: ", error);
  }
};

export const getFavoritesFromFirestore = async (uid: string): Promise<Airplane[]> => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data()?.favAirplanes || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const addFavoriteAirplane = async (uid: string, airplane: Airplane) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      favAirplanes: arrayUnion(airplane)
    });
  } catch (error) {
    console.error("Error adding favorite airplane:", error);
    throw error;
  }
};

export const removeFavoriteAirplane = async (uid: string, icao: string) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const currentFavorites: Airplane[] = userDoc.data()?.favAirplanes || [];
      const updatedFavorites = currentFavorites.filter((airplane) => airplane.icao24 !== icao);

      await updateDoc(userRef, {
        favAirplanes: updatedFavorites
      });
    }
  } catch (error) {
    console.error("Error removing favorite airplane:", error);
    throw error;
  }
};

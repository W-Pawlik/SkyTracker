/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../services/fireBase/firebaseConfig";
import { AuthContextType } from "../../types/authContext";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used in the AuthProvider");
  }
  return authContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  function initializeUser(user: User | null) {
    if (user) {
      setCurrentUser({ ...user });

      const isEmail = user.providerData.some((provider) => provider.providerId === "password");
      setIsEmailUser(isEmail);

      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      );
      setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
      setIsEmailVerified(user.emailVerified);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setIsEmailVerified(false);
    }
    setLoading(false);
  }

  const updateUserState = (updatedUser: Partial<User>) => {
    setCurrentUser((prevUser) => (prevUser ? { ...prevUser, ...updatedUser } : null));
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    isEmailVerified,
    updateUserState
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

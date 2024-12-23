import { User } from "firebase/auth";

export interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  isEmailVerified: boolean;
  updateUserState: (updatedUser: Partial<User>) => void;
}

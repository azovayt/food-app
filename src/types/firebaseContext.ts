// src/types/firebaseContext.ts
import { createContext } from "react";
import { User } from "firebase/auth";
import { UserData } from "./user";

interface FirebaseContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  fetchUserData: (
    uid: string,
    email: string | null
  ) => Promise<UserData | null>;
  updateUserData: (uid: string, data: Partial<UserData>) => Promise<boolean>;
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

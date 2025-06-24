// src/services/auth/logout.ts
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const Logout = async (): Promise<void> => {
  await signOut(auth);
};

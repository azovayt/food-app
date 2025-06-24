// src/services/auth/login.ts
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const Login = async (
  email: string,
  password: string
): Promise<User | null> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

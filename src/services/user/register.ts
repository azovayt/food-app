// src/services/user/register.ts
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { createUserProfile } from "./profile";
import { serverTimestamp, Timestamp } from "firebase/firestore";

export const Register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  username: string,
  phoneNumber: string,
  birthDate: string
): Promise<User | null> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await createUserProfile(userCredential.user.uid, {
    email,
    firstName: firstName || "",
    lastName: lastName || "",
    username: username || "",
    birthDate: Timestamp.fromDate(new Date(birthDate)),
    lastLoginAt: serverTimestamp() as Timestamp,
    createdAt: serverTimestamp() as Timestamp,
    phoneNumber: phoneNumber || "",
    profileImageUrl: "https://picsum.photos/200/300?random=1",
    addresses: [],
  });

  return userCredential.user;
};

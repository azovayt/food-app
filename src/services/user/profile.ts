// src/services/user/profile.ts
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserData } from "../../types/user";

export const createUserProfile = async (
  uid: string,
  data: Partial<UserData>
) => {
  await setDoc(doc(db, "users", uid), data);
};

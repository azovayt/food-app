import { Timestamp } from "firebase/firestore";

// Kullanıcı ana verisi
export interface UserData {
  birthDate: Timestamp;
  createdAt: Timestamp;
  email: string;
  firstName: string;
  gender: string;
  lastLoginAt: Timestamp;
  lastName: string;
  phoneNumber: string;
  profileImageUrl: string;
  username: string;
  addresses: Address[];
}

// Kullanıcı adresleri
export interface Address {
  addressId: string;
  addressDescription: string;
  apartmentName: string;
  apartmentNumber: string;
  city: string;
  district: string;
  floor: string;
  isDefault: boolean;
  neighborhood: string;
  street: string;
  title: string;
  latitude: number;
  longitude: number;
  createdAt: Timestamp;
}

// Kullanıcı favorileri
export interface Favorite {
  id: string;
  restaurantId: string;
  createdAt: Timestamp;
}

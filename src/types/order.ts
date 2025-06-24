// src/types/order.ts
import { Timestamp } from "firebase/firestore";
import { Address } from "./user";

export interface OrderItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: Timestamp;
  deliveryAddress: Address;
  note?: string;
}

export type OrderStatus =
  | "hazırlanıyor"
  | "yolda"
  | "teslim edildi"
  | "iptal"
  | "beklemede";

// src/types/restaurant.ts
export interface Restaurant {
  id: string;
  name: string;
  address: string;
  categories: string[];
  coverImageUrl: string;
  deliveryFee: number;
  deliveryTime: string;
  description: string;
  isOpen: boolean;
  logoUrl: string;
  minOrderAmount: number;
  operatingHours: { [day: string]: string };
  rating: number;
  ratingCount: number;
}

// src/components/features/orders/OrderList.tsx
import React from "react";
import { ScrollView, Text } from "react-native";
import OrderCard from "./OrderCard";
import { useRestaurants } from "../../../hooks/useRestaurants";

// Props arayüzü: tip güvenliği için
interface OrderListProps {
  orders: any[]; // Sipariş dizisi
}

// Sipariş listesi bileşeni (arrow function)
const OrderList = ({ orders }: OrderListProps) => {
  const { restaurants } = useRestaurants(); // Restoran verilerini al

  return (
    // Kaydırılabilir sipariş listesi
    <ScrollView className="p-4">
      {orders.length === 0 ? (
        // Sipariş yoksa bilgilendirme
        <Text className="text-gray-400 text-center">Hiç siparişiniz yok.</Text>
      ) : (
        // Siparişleri OrderCard ile listele
        orders.map((order) => (
          <OrderCard
            key={order.id} // Benzersiz anahtar
            order={order} // Sipariş verisi
            restaurant={restaurants.find((r) => r.id === order.restaurantId)} // İlgili restoran
          />
        ))
      )}
    </ScrollView>
  );
};

export default OrderList;

// src/components/features/orders/OrderCard.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import OrderItems from "./OrderItems";

// Sipariş durumlarına göre renk tanımları
const statusColors: Record<string, string> = {
  hazırlanıyor: "bg-orange-400",
  yolda: "bg-blue-500",
  "teslim edildi": "bg-green-500",
  iptal: "bg-red-500",
  beklemede: "bg-zinc-400",
};

// Props arayüzü: tip güvenliği için
interface OrderCardProps {
  order: any; // Sipariş verisi
  restaurant: any; // Restoran verisi
}

// Sipariş kartı bileşeni (arrow function)
const OrderCard = ({ order, restaurant }: OrderCardProps) => {
  return (
    // Sipariş kartı: gölgeli ve kenarlıklı
    <View className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-lg">
      {/* Restoran adı ve görseli */}
      <View className="flex-row items-center mb-3">
        {restaurant?.coverImageUrl ? (
          <Image
            source={{ uri: restaurant.coverImageUrl }} // Restoran resmi
            className="w-12 h-12 rounded-lg mr-3 bg-gray-200"
            resizeMode="cover"
          />
        ) : null}
        <View className="flex-1">
          <Text className="font-NunitoBold text-lg text-orange-500">
            {restaurant?.name || "Restoran"} {/* Restoran adı */}
          </Text>
          <Text className="text-xs text-zinc-500 mt-0.5">
            {order?.createdAt?.toDate
              ? order.createdAt.toDate().toLocaleString("tr-TR", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }) // Sipariş tarihi
              : ""}
          </Text>
        </View>
        {/* Sipariş durumu */}
        <View
          className={`px-3 py-1 rounded-xl ml-2 min-w-[80px] items-center ${
            statusColors[order?.status] || "bg-zinc-200"
          }`}
        >
          <Text className="text-xs font-bold text-white capitalize">
            {order?.status || "Bilinmiyor"} {/* Durum metni */}
          </Text>
        </View>
      </View>

      {/* Ürünler */}
      <OrderItems items={order?.items} />

      {/* Toplam fiyat ve adres */}
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-orange-500 text-base">
          Toplam: {order?.totalPrice || 0}₺ {/* Toplam fiyat */}
        </Text>
        {order?.address?.title ? (
          <Text
            className="text-xs text-zinc-600 max-w-[60%] text-right"
            numberOfLines={1} // Tek satır
          >
            {order.address.title} - {order.address.district}/
            {order.address.city} {/* Adres bilgisi */}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default OrderCard;

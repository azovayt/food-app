// src/components/features/orders/OrderItems.tsx
import React from "react";
import { ScrollView, View, Text, Image } from "react-native";

// Props arayüzü: tip güvenliği için
interface OrderItemsProps {
  items: any[]; // Sipariş ürünleri dizisi
}

// Sipariş ürünleri bileşeni (arrow function)
const OrderItems = ({ items }: OrderItemsProps) => {
  return (
    <>
      {Array.isArray(items) && items.length > 0 ? (
        // Yatay kaydırılabilir ürün listesi
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Kaydırma çubuğunu gizle
          className="mt-2 mb-2"
        >
          {items.map((item, idx) => (
            // Ürün kartı: gölgeli ve yuvarlak köşeli
            <View
              key={item?.foodId || idx} // Benzersiz anahtar
              className="w-20 mr-2 bg-zinc-100 rounded-xl items-center shadow-xs p-1.5"
            >
              {item?.imageUrl ? (
                // Ürün resmi
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-10 h-10 rounded-lg bg-zinc-200 mb-1"
                  resizeMode="cover"
                />
              ) : (
                // Resim yoksa yer tutucu
                <View className="w-10 h-10 rounded-lg bg-zinc-200 mb-1 items-center justify-center">
                  <Text className="text-[10px] text-zinc-400">Görsel yok</Text>
                </View>
              )}
              {/* Ürün adı */}
              <Text
                className="text-[11px] font-semibold text-zinc-800 text-center mb-0.5"
                numberOfLines={1} // Tek satır
              >
                {item?.name || "Ürün"}
              </Text>
              {/* Adet ve fiyat */}
              <Text className="text-[10px] text-zinc-500">
                x{item?.quantity || 0} {item?.price || 0}₺
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        // Ürün yoksa bilgilendirme
        <Text className="text-xs text-zinc-400 mt-2 mb-2">
          Ürün bilgisi yok.
        </Text>
      )}
    </>
  );
};

export default OrderItems;

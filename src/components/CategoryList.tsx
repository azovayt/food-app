// src/components/CategoryList.tsx
import React from "react";
import { ScrollView, TouchableOpacity, Text, Image, View } from "react-native";
import { Category } from "../types/category";

// Props arayüzü: tip güvenliği için
interface Props {
  categories: Category[]; // Kategori dizisi
  onCategoryPress: (category: Category) => void; // Kategori tıklama olayı
}

// Yatay kaydırılabilir kategori listesi bileşeni
export default function CategoryList({ categories, onCategoryPress }: Props) {
  // Kategorileri ikili gruplara böl (ızgara düzeni için)
  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += 2) {
    groupedCategories.push(categories.slice(i, i + 2));
  }

  return (
    // Yatay kaydırma için ScrollView
    <ScrollView
      horizontal // Yatay kaydırma
      showsHorizontalScrollIndicator={false} // Kaydırma çubuğunu gizle
      contentContainerStyle={{ paddingHorizontal: 4 }} // Yatay boşluk
    >
      {/* Grupları sütunlar halinde işle */}
      {groupedCategories.map((group, groupIndex) => (
        <View key={groupIndex} className="flex-col">
          {/* Gruptaki kategorileri göster */}
          {group.map((item) => (
            <TouchableOpacity
              key={item.id} // Benzersiz anahtar
              onPress={() => onCategoryPress(item)} // Kategori tıklama
              className="w-24 m-1 p-2 rounded-lg bg-white border border-gray-200 shadow-lg items-center" // Kategori kartı stili
            >
              <Image
                source={{ uri: item.imageUrl }} // Kategori resmi
                className="w-20 h-20 rounded-lg mb-2" // Resim stili
              />
              <Text
                className="text-center text-sm font-NunitoLight" // Metin stili
                numberOfLines={1} // Tek satır
                ellipsizeMode="tail" // Uzun metin için kesme
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
          {/* Tek kategori varsa hizalamayı koru */}
          {group.length === 1 && <View className="w-28 m-1 p-2" />}
        </View>
      ))}
    </ScrollView>
  );
}

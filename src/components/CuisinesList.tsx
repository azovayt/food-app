// src/components/CuisinesList.tsx
import React from "react";
import { FlatList, TouchableOpacity, Text, Image } from "react-native";
import { Category } from "../types/category";

// Bileşen prop'ları için tip tanımı
interface Props {
  categories: Category[]; // Kategori listesi
  onCategoryPress: (category: Category) => void; // Kategoriye tıklandığında çağrılacak fonksiyon
}

// Kategori listesini görüntüleyen bileşen
const CuisinesList = ({ categories, onCategoryPress }: Props) => {
  // Her bir kategori öğesini render eden fonksiyon
  const renderItem = ({ item }: { item: Category }) => (
    // Kategoriye tıklandığında onCategoryPress fonksiyonunu çağıran dokunulabilir bileşen
    <TouchableOpacity
      className="flex-1 m-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg items-center"
      onPress={() => onCategoryPress(item)}
      style={{ maxWidth: "23%" }} // Her öğe ekran genişliğinin %23'ünü kaplar
    >
      {/* Kategori resmini gösteren bileşen */}
      <Image
        source={{ uri: item.imageUrl }}
        className="w-20 h-20 rounded-lg mb-2"
      />
      {/* Kategori adını gösteren metin */}
      <Text className="text-center text-xs text-black font-NunitoBold">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Kategori listesini 4 sütunlu bir ızgara olarak gösteren FlatList
  return (
    <FlatList
      data={categories} // Görüntülenecek kategori verileri
      renderItem={renderItem} // Her öğeyi render eden fonksiyon
      keyExtractor={(item) => item.id.toString()} // Her öğe için benzersiz anahtar
      numColumns={4} // 4 sütunlu ızgara düzeni
      contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 4 }} // Liste içeriği için iç boşluk
      showsVerticalScrollIndicator={false} // Dikey kaydırma çubuğunu gizle
    />
  );
};

export default CuisinesList;

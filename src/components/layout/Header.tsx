// src/components/layout/Header.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Props arayüzü: tip güvenliği için
interface CustomHeaderProps {
  title: string; // Başlık metni
  showBackButton?: boolean; // Geri butonu göster/gizle
  rightContent?: React.ReactNode; // Sağ taraf içeriği
  titleClassName?: string; // Başlık için özel stil (kullanılmıyor)
}

// Özelleştirilebilir başlık bileşeni
const CustomHeader = ({
  title,
  showBackButton = false,
  rightContent,
}: CustomHeaderProps) => {
  const navigation = useNavigation(); // Navigasyon işlemleri için kanca

  return (
    // Başlık çubuğu: gölgeli ve kenarlıklı
    <View className="bg-white shadow-md w-full border-b border-gray-300">
      <View className="flex-row items-center justify-between h-[50px]">
        {/* Sol: Geri butonu */}
        <View className="w-1/4">
          {showBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()} // Geri navigasyon
              className="ml-4"
            >
              <Ionicons name="arrow-back" size={24} color="black" />
              {/* Geri simgesi */}
            </TouchableOpacity>
          )}
        </View>
        {/* Orta: Başlık */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl font-NunitoBold text-black">{title}</Text>
          {/* Başlık metni */}
        </View>
        {/* Sağ: Özel içerik */}
        <View className="w-1/4 items-end">{rightContent}</View>
      </View>
    </View>
  );
};

export default CustomHeader;

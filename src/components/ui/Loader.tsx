import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

interface LoaderProps {
  text?: string;
}

export default function Loader({ text = "Yükleniyor..." }: LoaderProps) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#f97316" />
      <Text className="text-gray-400 mt-2">{text}</Text>
    </View>
  );
}

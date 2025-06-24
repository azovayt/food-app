import React from "react";
import { View, Text } from "react-native";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500">{message}</Text>
    </View>
  );
}

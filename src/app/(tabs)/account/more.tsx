// src/app/(tabs)/account/more.tsx
import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../../components/layout/Header";

const MoreScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <Header title="Daha Fazla" showBackButton={true} rightContent={false} />
      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-bold mb-2 text-indigo-700">
          Daha Fazla
        </Text>
        <Text className="text-base text-gray-500">
          Henüz Daha Fazla bulunmamaktadır.
        </Text>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;

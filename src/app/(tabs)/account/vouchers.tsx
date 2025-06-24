// src/app/(tabs)/account/vouchers.tsx
import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../../components/layout/Header";

const VouchersScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <Header title="Kuponlarım" showBackButton={true} rightContent={false} />
      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-bold mb-2 text-indigo-700">
          Kuponlarım
        </Text>
        <Text className="text-base text-gray-500">
          Henüz Kuponlarım bulunmamaktadır.
        </Text>
      </ScrollView>
    </View>
  );
};

export default VouchersScreen;

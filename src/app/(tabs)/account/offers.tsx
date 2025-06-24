// src/app/(tabs)/account/offers.tsx
import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../../components/layout/Header";

const OffersScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <Header title="Kampanyalar" showBackButton={true} rightContent={false} />
      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-bold mb-2 text-indigo-700">
          Kampanyalar
        </Text>
        <Text className="text-base text-gray-500">
          Henüz Kampanyalar bulunmamaktadır.
        </Text>
      </ScrollView>
    </View>
  );
};

export default OffersScreen;

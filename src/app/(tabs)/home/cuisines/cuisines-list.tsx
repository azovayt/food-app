// src/app/(tabs)/home/cuisines-details.tsx
import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useRestaurants } from "../../../../hooks/useRestaurants";
import RestaurantList from "../../../../components/features/restaurants/RestaurantList";
import { Restaurant } from "../../../../types/restaurant";
import Header from "../../../../components/layout/Header";

const CuisinesListScreen = () => {
  const { categoryName } = useLocalSearchParams<{ categoryName: string }>();

  const { restaurants, loading, error } = useRestaurants(
    categoryName || undefined
  );

  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push({
      pathname: "/(tabs)/home/cuisines/[cuisinesId]",
      params: { restaurantName: restaurant.name, restaurantId: restaurant.id },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Header title={categoryName} showBackButton={true} rightContent={false} />
      <View className="flex-1">
        {categoryName && (
          <Text className="text-base font-NunitoBold text-black px-4 py-2">
            {categoryName} Restoranları
          </Text>
        )}
        <RestaurantList
          restaurants={restaurants}
          loading={loading}
          error={error}
          onRestaurantPress={handleRestaurantPress}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default CuisinesListScreen;

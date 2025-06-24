// src/app/(tabs)/account/favorites.tsx
import { Text, View } from "react-native";
import React from "react";
import Header from "../../../components/layout/Header";
import { useFirebaseContext } from "../../../context/FirebaseAuthProvider";
import RestaurantList from "../../../components/features/restaurants/RestaurantList";
import { useFavoriteRestaurants } from "../../../hooks/useFavoriteRestaurants";
import { router } from "expo-router";
import { Restaurant } from "../../../types/restaurant";

const FavoritesScreen = () => {
  const { user } = useFirebaseContext();
  const { restaurants, loading } = useFavoriteRestaurants(user?.uid);

  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push({
      pathname: "/(tabs)/home/restaurant-details",
      params: { restaurantName: restaurant.name, restaurantId: restaurant.id },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Favoriler" showBackButton={true} rightContent={false} />
      <View className="flex-1 mt-2">
        <RestaurantList
          restaurants={restaurants}
          loading={loading}
          error={null}
          onRestaurantPress={handleRestaurantPress}
          scrollEnabled={false}
        />
        {!loading && restaurants.length === 0 && (
          <Text className="text-base text-gray-500">
            Henüz favori restoranınız bulunmamaktadır.
          </Text>
        )}
      </View>
    </View>
  );
};

export default FavoritesScreen;

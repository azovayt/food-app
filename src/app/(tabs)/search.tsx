// src/app/(tabs)/search.tsx
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import { useRestaurants } from "../../hooks/useRestaurants";
import RestaurantList from "../../components/features/restaurants/RestaurantList";
import { Restaurant } from "../../types/restaurant";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const { restaurants, loading, error } = useRestaurants();

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push({
      pathname: "/(tabs)/home/restaurant-details",
      params: { restaurantName: restaurant.name, restaurantId: restaurant.id },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Ara" showBackButton={false} rightContent={false} />
      <View className="px-4 pt-4">
        <View className="flex-row items-center border border-gray-200 rounded-lg bg-gray-100 px-2">
          <TextInput
            className="flex-1 px-2 py-2 text-base bg-gray-100"
            placeholder="Restoran ara..."
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={22} color="#a3a3a3" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="flex-1 pt-2">
        {searchText.trim().length > 0 ? (
          <RestaurantList
            restaurants={filteredRestaurants}
            loading={loading}
            error={error}
            onRestaurantPress={handleRestaurantPress}
          />
        ) : (
          <Text className="text-center text-gray-400 mt-10">
            Aramak için yukarıya yazınız.
          </Text>
        )}
      </View>
    </View>
  );
};

export default SearchScreen;

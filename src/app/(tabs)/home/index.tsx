// src/app/(tabs)/home/index.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../../components/layout/Header";
import CategoryList from "../../../components/CategoryList";
import { useCategories } from "../../../hooks/useCategories";
import { useRestaurants } from "../../../hooks/useRestaurants";
import RestaurantList from "../../../components/features/restaurants/RestaurantList";
import { Category } from "../../../types/category";
import { Restaurant } from "../../../types/restaurant";
import { useFavorites } from "../../../hooks/useFavorites";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = () => {
  const { categories } = useCategories();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { restaurants, loading, error } = useRestaurants(undefined);

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: "/(tabs)/home/cuisines/cuisines-list",
      params: { categoryName: category.name },
    });
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push({
      pathname: "/(tabs)/home/restaurant-details",
      params: { restaurantName: restaurant.name, restaurantId: restaurant.id },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Anasayfa" showBackButton={false} rightContent={false} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="flex-col">
          <View className="flex-row justify-between p-2">
            <Text className="text-base font-NunitoBold text-black">
              Mutfaklar
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/home/cuisines/cuisines")}
              className="flex-row items-center justify-center"
            >
              <Text className="text-base font-NunitoBold text-blue-700">
                Tümü
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#1d4ed8" />
            </TouchableOpacity>
          </View>
          <CategoryList
            categories={categories}
            onCategoryPress={handleCategoryPress}
          />
        </View>

        <View className="flex-1">
          <View className="p-2">
            <Text className="text-base font-NunitoBold text-black">
              Restoranlar
            </Text>
          </View>
          <RestaurantList
            restaurants={restaurants}
            loading={loading}
            error={error}
            onRestaurantPress={handleRestaurantPress}
            scrollEnabled={false} // FlatList kontrolünü dış ScrollView'a bırakıyor
            favoriteRestaurantIds={favorites.map((f) => f.restaurantId)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

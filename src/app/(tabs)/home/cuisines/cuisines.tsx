// src/app/(tabs)/home/cuisines.tsx
import { View } from "react-native";
import React from "react";
import CuisinesList from "../../../../components/CuisinesList";
import { useCategories } from "../../../../hooks/useCategories";
import { Category } from "../../../../types/category";
import Header from "../../../../components/layout/Header";
import { router } from "expo-router";

const CuisinesScreen = () => {
  const { categories } = useCategories();

  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: "/(tabs)/home/cuisines/cuisines-list",
      params: { categoryName: category.name },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Mutfaklar" showBackButton={true} rightContent={false} />
      <CuisinesList
        categories={categories}
        onCategoryPress={handleCategoryPress}
      />
    </View>
  );
};

export default CuisinesScreen;

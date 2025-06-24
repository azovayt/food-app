import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Header from "../../../components/layout/Header";
import { useRestaurantDetails } from "../../../hooks/useRestaurantDetails";
import { useMenuItems } from "../../../hooks/useMenuItems";
import { Ionicons, Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { useCart } from "../../../context/CartContext";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import Loader from "../../../components/ui/Loader";

const RestaurantDetailsScreen = () => {
  const { restaurantId, restaurantName } = useLocalSearchParams<{
    restaurantId: string;
    restaurantName: string;
  }>();
  const { restaurant, loading, error } = useRestaurantDetails(
    restaurantId || ""
  );
  const [isHoursOpen, setIsHoursOpen] = useState(false);

  const {
    menuItems,
    loading: menuLoading,
    error: menuError,
  } = useMenuItems(restaurantId || "");

  const { addToCart, restaurantId: cartRestaurantId, clearCart } = useCart();

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [category: string]: typeof menuItems });

  const handleAddToCart = (item: any) => {
    if (cartRestaurantId && cartRestaurantId !== restaurantId) {
      Alert.alert(
        "Sepet Uyarısı",
        "Sepetinizde başka bir restorana ait ürün var. Devam ederseniz sepetiniz temizlenecek.",
        [
          { text: "İptal", style: "cancel" },
          {
            text: "Devam Et",
            onPress: () => {
              clearCart?.();
              addToCart(
                {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  imageUrl: item.imageUrl,
                },
                restaurantId || ""
              );
              router.push("/(tabs)/cart");
            },
          },
        ]
      );
      return;
    }

    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
      },
      restaurantId || ""
    );
    router.push("/(tabs)/cart");
  };

  if (loading) {
    return <Loader text="Yükleniyor..." />;
  }

  if (error || !restaurant) {
    return <ErrorMessage message={error ?? "Restaurant not found"} />;
  }

  return (
    <View className="flex-1 bg-white">
      <Header
        title={restaurantName}
        showBackButton={true}
        rightContent={
          <TouchableOpacity className="mr-4">
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Kapak Görseli */}
        <View className="relative">
          <Image
            source={{
              uri: restaurant.coverImageUrl,
            }}
            className="w-full h-52 object-cover"
          />
        </View>

        {/* Restoran Bilgi Kartı (Toplu Kart) */}
        <View className="mx-4 -mt-8 bg-white rounded-2xl shadow-lg p-5 mb-4 z-10 border border-gray-200">
          <View className="flex-row items-center mb-3">
            <Image
              source={{
                uri: restaurant.logoUrl,
              }}
              className="w-16 h-16 rounded-full mr-3 border-2 border-gray-200"
            />
            <View className="flex-1">
              <Text
                className="text-lg font-NunitoBold text-black"
                numberOfLines={2}
              >
                {restaurant.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={18} color="#FBBF24" />
                <Text className="text-sm font-NunitoBold text-black ml-1">
                  {restaurant.rating || 0} ({restaurant.ratingCount || 0})
                </Text>
              </View>
            </View>
          </View>
          <Text className="text-sm text-black font-NunitoRegular mb-2">
            {restaurant.description || "Açıklama mevcut değil"}
          </Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={18} color="#6B7280" />
            <Text className="text-sm text-black font-NunitoRegular ml-2 flex-1">
              {restaurant.address}
            </Text>
          </View>
          {/* Teslimat Bilgileri */}
          <View className="flex-row items-center space-x-4 mt-2">
            <View className="flex-row items-center mr-2">
              <Ionicons name="timer" size={14} color="#6B7280" />
              <Text className="text-xs text-black font-NunitoRegular ml-1">
                {restaurant.deliveryTime} dk
              </Text>
            </View>
            <View className="flex-row items-center mr-2">
              <Fontisto name="motorcycle" size={14} color="#6B7280" />
              <Text className="text-xs text-gray-700 font-NunitoRegular ml-1">
                {restaurant.deliveryFee?.toFixed()} TL
              </Text>
            </View>
            <View className="flex-row items-center">
              <FontAwesome5 name="money-check" size={14} color="#6B7280" />
              <Text className="text-xs text-gray-700 font-NunitoRegular ml-1">
                min {restaurant.minOrderAmount?.toFixed()} TL
              </Text>
            </View>
          </View>
        </View>

        {/* Çalışma Saatleri Dropdown */}
        <View className="mx-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 mb-4">
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={() => setIsHoursOpen(!isHoursOpen)}
          >
            <Text className="text-base font-NunitoBold text-gray-800">
              Çalışma Saatleri
            </Text>
            <Ionicons
              name={isHoursOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
          {isHoursOpen && (
            <View className="mt-3">
              {Object.entries(restaurant.operatingHours || {}).map(
                ([day, hours]) => (
                  <View key={day} className="flex-row justify-between mb-1">
                    <Text className="text-sm text-gray-700 font-NunitoRegular">
                      {day}
                    </Text>
                    <Text className="text-sm text-gray-700 font-NunitoRegular">
                      {hours}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}
        </View>

        {/* Menü Alanı */}
        <View className="bg-white p-4 border-t border-gray-200">
          <Text className="text-xl font-NunitoBold text-gray-800 mb-3">
            Ürünler
          </Text>
          {menuLoading ? (
            <ActivityIndicator size="small" color="#FF5733" />
          ) : menuError ? (
            <Text className="text-red-500">{menuError}</Text>
          ) : menuItems.length === 0 ? (
            <Text className="text-gray-400">
              Bu restoranda ürün bulunmuyor.
            </Text>
          ) : (
            Object.entries(groupedMenuItems).map(([category, items]) => (
              <View key={category} className="mb-5">
                <Text className="text-lg font-NunitoBold text-black mb-2">
                  {category}
                </Text>
                {items.map((item) => (
                  <View
                    key={item.id}
                    className="flex-row items-center mb-3 bg-white rounded-lg p-3 shadow-lg border border-gray-200"
                  >
                    <Image
                      source={{ uri: item.imageUrl }}
                      className="w-16 h-16 rounded-lg mr-3"
                    />
                    <View className="flex-1">
                      <Text className="text-base font-NunitoBold text-black">
                        {item.name}
                      </Text>
                      <Text className="text-xs text-gray-600">
                        {item.description}
                      </Text>
                    </View>
                    <Text className="text-base font-NunitoRegular text-green-600 ml-2">
                      {item.price} TL
                    </Text>
                    <TouchableOpacity
                      className="ml-3 bg-blue-500 rounded-lg"
                      onPress={() => handleAddToCart(item)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name="add" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantDetailsScreen;

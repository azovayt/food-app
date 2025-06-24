// src/components/features/restaurants/RestaurantList.tsx
import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import { Restaurant } from "../../../types/restaurant";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFirebaseContext } from "../../../context/FirebaseAuthProvider";
import { db } from "../../../services/firebaseConfig";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

// Props arayüzü: tip güvenliği için
interface Props {
  restaurants: Restaurant[]; // Restoran dizisi
  loading: boolean; // Yükleme durumu
  error: string | null; // Hata mesajı
  onRestaurantPress: (restaurant: Restaurant) => void; // Restoran tıklama olayı
  scrollEnabled?: boolean; // Kaydırma etkinliği
  favoriteRestaurantIds?: string[]; // Favori restoran ID'leri
}

// Restoran listesi bileşeni (arrow function)
const RestaurantList = ({
  restaurants,
  loading,
  error,
  onRestaurantPress,
  scrollEnabled = true,
  favoriteRestaurantIds = [],
}: Props) => {
  const { user } = useFirebaseContext(); // Kullanıcı bilgisi

  // Favori ekleme/çıkarma işlemi
  const handleToggleFavorite = async (restaurantId: string) => {
    if (!user) return;
    const favRef = doc(db, "users", user.uid, "favorites", restaurantId);
    const isFavorite = favoriteRestaurantIds.includes(restaurantId);

    try {
      if (isFavorite) {
        await deleteDoc(favRef); // Favoriden kaldır
      } else {
        await setDoc(favRef, {
          restaurantId,
          createdAt: new Date(),
        }); // Favoriye ekle
      }
    } catch (e) {
      console.log("Favori ekleme/çıkarma hatası:", e);
    }
  };

  // Yükleme, hata veya boş liste durumları
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Hata: {error}</Text>;
  if (restaurants.length === 0) return <Text>Restoran bulunamadı.</Text>;

  return (
    // Restoranları listelemek için FlatList
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item.id} // Benzersiz anahtar
      contentContainerStyle={{ paddingBottom: 12 }} // Alt boşluk
      scrollEnabled={scrollEnabled} // Kaydırma kontrolü
      renderItem={({ item }) => {
        const isFavorite = favoriteRestaurantIds.includes(item.id);
        return (
          // Restoran kartı: gölgeli ve kenarlıklı
          <View className="bg-white rounded-lg border border-gray-200 mb-2 mx-3 flex-row items-center shadow-lg relative">
            <TouchableOpacity
              onPress={() => onRestaurantPress(item)} // Restoran tıklama
              className="flex-1 flex-row items-center"
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.coverImageUrl }} // Restoran resmi
                className="w-24 h-24 rounded-lg ml-2" // Resim stili
              />
              <View className="flex-1 p-2">
                <Text className="font-NunitoBold text-lg text-black mb-1">
                  {item.name} {/* Restoran adı */}
                </Text>
                <Text className="font-NunitoLight text-black text-sm mb-1">
                  {item.address} {/* Adres */}
                </Text>
                <Text className="font-NunitoLight text-black text-sm mb-1 flex-row items-center">
                  <Fontisto name="motorcycle" size={14} color="black" />{" "}
                  {item.deliveryTime}dk • Min {item.minOrderAmount} TL{" "}
                  {/* Teslimat bilgisi */}
                </Text>
                <Text className="font-NunitoLight text-xs text-yellow-600 flex-row items-center">
                  <Ionicons name="star" size={12} color="orange" />{" "}
                  {item.rating} ({item.ratingCount}) {/* Puanlama */}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Favori butonu */}
            <TouchableOpacity
              onPress={() => handleToggleFavorite(item.id)} // Favori değiştir
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }} // Tıklama alanı
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                zIndex: 10,
              }}
            >
              <MaterialCommunityIcons
                name={isFavorite ? "heart" : "heart-outline"} // Favori simgesi
                size={28}
                color={isFavorite ? "red" : "gray"}
              />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default RestaurantList;

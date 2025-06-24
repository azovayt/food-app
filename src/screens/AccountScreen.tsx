// src/screens/AccountScreen.tsx
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useFirebaseContext } from "../context/FirebaseAuthProvider";
import { useLogout } from "../hooks/useLogout";
import Header from "../components/layout/Header";
import Ionicons from "@expo/vector-icons/Ionicons";

const AccountScreen = () => {
  const router = useRouter();
  const { user, userData, loading } = useFirebaseContext();
  const { handleLogout, loading: logoutLoading } = useLogout();

  const onLogout = async () => {
    try {
      await handleLogout();
      router.replace("/(tabs)/account/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="mt-2 text-gray-500 text-base font-medium">
          Oturum kontrol ediliyor...
        </Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="Hesabım" showBackButton={false} rightContent={false} />
      <View className="flex-1 px-4 pt-4 pb-2 bg-gray-50">
        <View className="items-center mb-6">
          {userData?.profileImageUrl ? (
            <Image
              source={{ uri: userData.profileImageUrl }}
              className="w-20 h-20 rounded-full mb-3 border-2 border-indigo-400 bg-gray-200"
            />
          ) : (
            <View className="w-20 h-20 rounded-full mb-3 bg-gray-200 flex items-center justify-center">
              <Ionicons name="person" size={40} color="#6b7280" />
            </View>
          )}
          <Text className="text-xl font-NunitoBold text-gray-900 mb-1">
            {userData?.firstName} {userData?.lastName}
          </Text>
          <Text className="text-base text-indigo-600 font-NunitoBold">
            @{userData?.username || "Kullanıcı"}
          </Text>
        </View>

        <View className="flex-1">
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              className="w-[30%] bg-white rounded-lg p-2 mb-4 shadow-lg border border-gray-300"
              onPress={() => router.push("/(tabs)/account/account-details")}
            >
              <Ionicons
                name="person-outline"
                size={28}
                color="#1D4ED8"
                style={{ alignSelf: "center" }}
              />
              <Text className="text-center text-lg font-NunitoBold text-indigo-700 mt-2">
                Hesabım
              </Text>
              <Text className="text-center text-sm font-NunitoLight text-gray-500">
                Profil bilgilerimi görüntüle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[30%] bg-white rounded-lg p-2 mb-4 shadow-lg border border-gray-300"
              onPress={() => router.push("/(tabs)/account/favorites")}
            >
              <Ionicons
                name="heart-outline"
                size={28}
                color="#1D4ED8"
                style={{ alignSelf: "center" }}
              />
              <Text className="text-center text-lg font-NunitoBold text-indigo-700 mt-2">
                Favoriler
              </Text>
              <Text className="text-center text-sm font-NunitoLight text-gray-500">
                Favori ürünlerimi gör
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[30%] bg-white rounded-lg p-2 mb-4 shadow-lg border border-gray-300"
              onPress={() => router.push("/(tabs)/account/address/address")}
            >
              <Ionicons
                name="location-outline"
                size={28}
                color="#1D4ED8"
                style={{ alignSelf: "center" }}
              />
              <Text className="text-center text-lg font-NunitoBold text-indigo-700 mt-2">
                Adreslerim
              </Text>
              <Text className="text-center text-sm font-NunitoLight text-gray-500">
                Kayıtlı adreslerimi yönet
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[30%] bg-white rounded-lg p-2 mb-4 shadow-lg border border-gray-300"
              onPress={() => router.push("/(tabs)/account/offers")}
            >
              <Ionicons
                name="gift-outline"
                size={28}
                color="#1D4ED8"
                style={{ alignSelf: "center" }}
              />
              <Text className="text-center text-lg font-NunitoBold text-indigo-700 mt-2">
                Kampanyalar
              </Text>
              <Text className="text-center text-sm font-NunitoLight text-gray-500">
                Sana özel kampanyaları gör
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[30%] bg-white rounded-lg p-2 mb-4 shadow-lg border border-gray-300"
              onPress={() => router.push("/(tabs)/account/vouchers")}
            >
              <Ionicons
                name="ticket-outline"
                size={28}
                color="#1D4ED8"
                style={{ alignSelf: "center" }}
              />
              <Text className="text-center text-lg font-NunitoBold text-indigo-700 mt-2">
                Kuponlarım
              </Text>
              <Text className="text-center text-sm text-gray-500 font-NunitoLight">
                Sana özel kuponları gör
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[30%] bg-white rounded-lg p-2 mb-4 shadow-lg border border-gray-300"
              onPress={() => router.push("/(tabs)/account/more")}
            >
              <Ionicons
                name="grid-outline"
                size={28}
                color="#1D4ED8"
                style={{ alignSelf: "center" }}
              />
              <Text className="text-center text-lg font-NunitoBold text-indigo-700 mt-2">
                Daha Fazla
              </Text>
              <Text className="text-center text-sm font-NunitoLight text-gray-500">
                Daha fazla bilgi edin
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-center mb-2">
          <TouchableOpacity
            onPress={onLogout}
            className="w-full bg-red-400 mt-2 mb-1 py-3 rounded-lg shadow-lg active:opacity-95"
            accessibilityLabel="Çıkış yap butonu"
            activeOpacity={0.85}
            disabled={logoutLoading}
          >
            <Text className="text-white text-center font-NunitoBold text-base">
              {logoutLoading ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AccountScreen;

// src/app/(tabs)/account/AccountDetails.tsx
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useFirebaseContext } from "../../../context/FirebaseAuthProvider";
import Header from "../../../components/layout/Header";
import Entypo from "@expo/vector-icons/Entypo";
import Loader from "../../../components/ui/Loader";

const AccountDetailsScreen = () => {
  const { user, userData, loading, updateUserData } = useFirebaseContext();

  if (loading) {
    return <Loader text="Oturum kontrol ediliyor..." />;
  }

  if (!user) {
    return null;
  }

  const handleEdit = async (field: keyof typeof userData, value: string) => {
    if (!userData) return;
    await updateUserData({ [field]: value });
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Hesab Detayları"
        showBackButton={true}
        rightContent={false}
      />
      <ScrollView className="flex-1 bg-white p-4">
        {userData && (
          <View className="w-full flex-col space-y-3">
            <View className="flex-row items-center justify-between bg-white rounded-lg p-4 shadow-lg mb-4 border border-gray-300">
              <View>
                <Text className="text-black font-NunitoLight text-lg mb-2">
                  Ad
                </Text>
                <Text className="text-black font-NunitoBold text-xl">
                  {userData.firstName || "-"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Ad düzenle tıklandı")}
              >
                <Entypo name="pencil" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between bg-white rounded-xl p-4 shadow mb-4 border border-gray-200">
              <View>
                <Text className="text-black font-NunitoLight text-lg mb-2">
                  Soyad
                </Text>
                <Text className="text-black font-NunitoBold text-xl">
                  {userData.lastName || "-"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Soyad düzenle tıklandı")}
              >
                <Entypo name="pencil" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between bg-white rounded-xl p-4 shadow mb-4 border border-gray-200">
              <View>
                <Text className="text-black font-NunitoLight text-lg mb-2">
                  Kullanıcı Adı
                </Text>
                <Text className="text-black font-NunitoBold text-xl">
                  @{userData.username || "-"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Kullanıcı adı düzenle tıklandı")}
              >
                <Entypo name="pencil" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between bg-white rounded-xl p-4 shadow mb-4 border border-gray-200">
              <View>
                <Text className="text-black font-NunitoLight text-lg mb-2">
                  Telefon
                </Text>
                <Text className="text-black font-NunitoBold text-xl">
                  {userData.phoneNumber || "-"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Telefon düzenle tıklandı")}
              >
                <Entypo name="pencil" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between bg-white rounded-xl p-4 shadow mb-4 border border-gray-200">
              <View>
                <Text className="text-black font-NunitoLight text-lg mb-2">
                  Doğum Tarihi
                </Text>
                <Text className="text-black font-NunitoBold text-xl">
                  {userData.birthDate?.toDate().toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }) || "-"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Doğum tarihi düzenle tıklandı")}
              >
                <Entypo name="pencil" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AccountDetailsScreen;

// src/app/(tabs)/account/address/add.tsx
import React from "react";
import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import Header from "../../../../components/layout/Header";
import { useAddressContext } from "../../../../context/AddressContext";
import AddAddressForm from "../../../../components/features/address/AddAddressForm";
import { Address } from "../../../../types/user";

// Yeni adres ekleme ekranı bileşeni
const AddAddressScreen = () => {
  // Adres ekleme ve yükleme durumu için AddressContext'i kullan
  const { addAddress, loading } = useAddressContext();
  // Navigasyon için router'ı başlat
  const router = useRouter();

  // Yeni adres ekleme işlemini gerçekleştir
  const handleAdd = async (data: Omit<Address, "addressId" | "createdAt">) => {
    try {
      // Yeni adresi ekle
      await addAddress(data);
      // Başarı mesajı göster
      Alert.alert("Başarılı", "Adres eklendi!");
      // Önceki ekrana geri dön
      router.back();
    } catch (e) {
      // Hata durumunda hata mesajı göster
      Alert.alert("Hata", "Adres eklenemedi!");
    }
  };

  // Adres ekleme formunu render et
  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Adres Ekle" showBackButton={true} rightContent={false} />
      <AddAddressForm onSubmit={handleAdd} loading={loading} />
    </View>
  );
};

export default AddAddressScreen;

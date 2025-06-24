// src/app/(tabs)/account/address/address.tsx
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { useAddressContext } from "../../../../context/AddressContext";
import Header from "../../../../components/layout/Header";
import AddressList from "../../../../components/features/address/AddressList";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// Kullanıcının adreslerini görüntüleme ve yönetme ekranı bileşeni
const AddressScreen = () => {
  // Adres verileri, varsayılan adres ayarları ve adresleri çekmek için AddressContext'i kullan
  const { addresses, setDefaultAddress, defaultAddress, fetchAddresses } =
    useAddressContext();
  // Seçili adresin ID'sini tutmak için state
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  // Güncellenen adresin ID'sini tutmak için state (yükleme durumu için)
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Bileşen yüklendiğinde adresleri getir
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Varsayılan adres değiştiğinde seçili adresi güncelle
  useEffect(() => {
    setSelectedAddressId(defaultAddress ? defaultAddress.addressId : null);
  }, [defaultAddress]);

  // Adres seçimi işlemini gerçekleştir
  const handleSelectAddress = async (addressId: string) => {
    // Aynı adres zaten seçiliyse işlemi sonlandır
    if (selectedAddressId === addressId) return;
    // Güncellenen adres ID'sini ayarla
    setUpdatingId(addressId);
    // Seçili adres ID'sini güncelle
    setSelectedAddressId(addressId);
    try {
      // Varsayılan adresi değiştir
      await setDefaultAddress(addressId);
    } catch (e) {
      // Hata durumunda hata mesajı göster
      Alert.alert("Hata", "Varsayılan adres değiştirilemedi!");
    }
    // Güncelleme durumunu sıfırla
    setUpdatingId(null);
  };

  // Adres listesi ve yeni adres ekleme butonunu render et
  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Adreslerim" showBackButton={true} rightContent={false} />
      <AddressList
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        updatingId={updatingId}
        onSelectAddress={handleSelectAddress}
      />
      <View className="absolute left-0 right-0 bottom-0 px-4 pb-2">
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white rounded-lg py-2 border border-gray-300"
          onPress={() => router.push("/account/address/add")}
        >
          <Ionicons name="add" size={24} color="#1D4ED8" />
          <Text className="text-black font-NunitoBold text-sm ml-2">
            Yeni Adres Ekle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressScreen;

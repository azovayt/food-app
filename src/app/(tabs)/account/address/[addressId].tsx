// src/app/(tabs)/account/address/[addressId].tsx
import React, { useEffect, useState } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "../../../../components/layout/Header";
import { useAddressContext } from "../../../../context/AddressContext";
import EditAddressForm from "../../../../components/features/address/EditAddressForm";
import { Address } from "../../../../types/user";

// Adres düzenleme ekranı bileşeni
const EditAddressScreen = () => {
  // URL parametrelerinden adres ID'sini al
  const { addressId } = useLocalSearchParams();
  // Adres verilerine ve metodlara erişmek için AddressContext'i kullan
  const { addresses, updateAddress, loading, fetchAddresses } =
    useAddressContext();
  // Navigasyon için router'ı başlat
  const router = useRouter();

  // Düzenlenen adresi tutmak için state
  const [address, setAddress] = useState<Address | null>(null);
  // Kaydetme durumunu izlemek için state
  const [saving, setSaving] = useState(false);

  // Bileşen yüklendiğinde tüm adresleri getir
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Adresler veya adres ID'si değiştiğinde adresi güncelle
  useEffect(() => {
    if (addresses && addressId) {
      const found = addresses.find((a) => a.addressId === addressId);
      setAddress(found || null);
    }
  }, [addresses, addressId]);

  // Adres güncelleme işlemini gerçekleştir
  const handleEdit = async (data: Omit<Address, "addressId" | "createdAt">) => {
    try {
      // Kaydetme durumunu başlat
      setSaving(true);
      // Adres ID'si yoksa işlemi sonlandır
      if (!addressId) return;
      // Adresi yeni verilerle güncelle
      await updateAddress(addressId as string, data);
      // Adres listesini yenile
      await fetchAddresses();
      // Kaydetme durumunu sıfırla
      setSaving(false);
      // Başarı mesajı göster
      Alert.alert("Başarılı", "Adres güncellendi!");
      // Önceki ekrana geri dön
      router.back();
    } catch (e) {
      // Hata durumunda kaydetme durumunu sıfırla
      setSaving(false);
      // Hata mesajı göster
      Alert.alert("Hata", "Adres güncellenemedi!");
    }
  };

  // Adres henüz yüklenmediyse yükleme göstergesi göster
  if (!address)
    return <ActivityIndicator className="mt-10" size="large" color="blue" />;
  // Kaydetme işlemi devam ediyorsa kaydetme göstergesi göster
  if (saving)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  // Adres düzenleme formunu render et
  return (
    <View className="flex-1 bg-gray-50">
      <Header
        title="Adresi Düzenle"
        showBackButton={true}
        rightContent={false}
      />
      <EditAddressForm
        initialAddress={address}
        onSubmit={handleEdit}
        loading={loading}
      />
    </View>
  );
};

export default EditAddressScreen;

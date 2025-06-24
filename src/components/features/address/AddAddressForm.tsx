// src/components/features/address/AddAddressForm.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Address } from "../../../types/user";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  loading?: boolean;
  onSubmit: (data: Omit<Address, "addressId" | "createdAt">) => Promise<void>;
};

const EMPTY_FORM: Omit<Address, "addressId" | "createdAt"> = {
  addressDescription: "",
  apartmentName: "",
  apartmentNumber: "",
  city: "",
  district: "",
  floor: "",
  isDefault: false,
  neighborhood: "",
  street: "",
  title: "",
  latitude: 0,
  longitude: 0,
};

const AddAddressForm = (props: Props) => {
  const { loading = false, onSubmit } = props;
  const [form, setForm] =
    useState<Omit<Address, "addressId" | "createdAt">>(EMPTY_FORM);
  const [locLoading, setLocLoading] = useState(false);

  useEffect(() => {
    // Konum alma örneği - gerçek uygulamada burada location isteği yapılabilir
    setLocLoading(true);
    setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        latitude: 41.0082,
        longitude: 28.9784,
      }));
      setLocLoading(false);
    }, 1000);
  }, []);

  const handleChange = (key: keyof typeof EMPTY_FORM, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.street || !form.district || !form.city) {
      Alert.alert("Uyarı", "Lütfen zorunlu alanları doldurun!");
      return;
    }
    await onSubmit(form);
  };

  const inputClass =
    "bg-white border border-gray-200 focus:border-blue-400 rounded-xl px-4 py-3 mb-2 text-base text-gray-900";
  const labelClass = "mb-1 ml-1 text-gray-500 font-semibold text-sm";

  return (
    <View className="bg-white p-4">
      <View className="flex-row items-center mb-4">
        <Ionicons name="add-circle-outline" size={24} color="#059669" />
        <Text className="text-xl font-extrabold text-emerald-700 ml-2">
          Yeni Adres Ekle
        </Text>
        {locLoading && (
          <ActivityIndicator
            size="small"
            color="#059669"
            style={{ marginLeft: 8 }}
          />
        )}
      </View>

      <View className="mb-2">
        <Text className={labelClass}>Başlık</Text>
        <TextInput
          placeholder="Örn: Ev, İş, Aile"
          value={form.title}
          onChangeText={(t) => handleChange("title", t)}
          className={inputClass}
        />
      </View>
      <View className="mb-2">
        <Text className={labelClass}>Sokak</Text>
        <TextInput
          placeholder="Sokak adı"
          value={form.street}
          onChangeText={(t) => handleChange("street", t)}
          className={inputClass}
        />
      </View>
      <View className="mb-2">
        <Text className={labelClass}>Mahalle</Text>
        <TextInput
          placeholder="Mahalle adı"
          value={form.neighborhood}
          onChangeText={(t) => handleChange("neighborhood", t)}
          className={inputClass}
        />
      </View>
      <View className="mb-2 flex-row space-x-2">
        <View className="flex-1">
          <Text className={labelClass}>İlçe</Text>
          <TextInput
            placeholder="İlçe"
            value={form.district}
            onChangeText={(t) => handleChange("district", t)}
            className={inputClass}
          />
        </View>
        <View className="flex-1">
          <Text className={labelClass}>Şehir</Text>
          <TextInput
            placeholder="Şehir"
            value={form.city}
            onChangeText={(t) => handleChange("city", t)}
            className={inputClass}
          />
        </View>
      </View>
      <View className="mb-2 flex-row space-x-2">
        <View className="flex-1">
          <Text className={labelClass}>Apartman Adı</Text>
          <TextInput
            placeholder="Apartman"
            value={form.apartmentName}
            onChangeText={(t) => handleChange("apartmentName", t)}
            className={inputClass}
          />
        </View>
        <View className="flex-1">
          <Text className={labelClass}>Daire No</Text>
          <TextInput
            placeholder="Daire"
            value={form.apartmentNumber}
            onChangeText={(t) => handleChange("apartmentNumber", t)}
            className={inputClass}
          />
        </View>
        <View className="flex-1">
          <Text className={labelClass}>Kat</Text>
          <TextInput
            placeholder="Kat"
            value={form.floor}
            onChangeText={(t) => handleChange("floor", t)}
            className={inputClass}
          />
        </View>
      </View>
      <View className="mb-2">
        <Text className={labelClass}>Adres Tarifi</Text>
        <TextInput
          placeholder="Kapı önü, yön vs."
          value={form.addressDescription}
          onChangeText={(t) => handleChange("addressDescription", t)}
          className={inputClass}
          multiline
        />
      </View>
      <TouchableOpacity
        className="bg-emerald-600 rounded-2xl py-3 mt-6 items-center shadow-md"
        onPress={handleSubmit}
        disabled={loading || locLoading}
      >
        {loading || locLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-extrabold text-lg tracking-wide">
            Ekle
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddAddressForm;

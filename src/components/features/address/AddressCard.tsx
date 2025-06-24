// components/features/addresses/AddressCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddressMap from "./AddressMap";
import { Address } from "../../../types/user";
import { router } from "expo-router";

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  isUpdating: boolean;
  onSelect: () => void;
}

const AddressCard = ({
  address,
  isSelected,
  isUpdating,
  onSelect,
}: AddressCardProps) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onSelect}
    className={`
      mb-4 rounded-lg border shadow-lg flex-row bg-white
      ${isSelected ? "border-gray-300" : "border-gray-200"}
      p-3 items-start
    `}
  >
    <View className="pt-1 mr-3">
      <Ionicons
        name={isSelected ? "radio-button-on" : "radio-button-off"}
        size={16}
        color={isSelected ? "#1D4ED8" : "#a1a1aa"}
      />
      {isUpdating && (
        <ActivityIndicator
          size="small"
          color="#1D4ED8"
          style={{ marginTop: 4 }}
        />
      )}
    </View>
    <View className="flex-1">
      <View className="flex-row items-center">
        <Text className="text-base font-bold text-indigo-800 mr-2">
          {address.title}
        </Text>
        {isSelected && (
          <Text className="text-xs text-blue-700 font-semibold">
            (Varsayılan)
          </Text>
        )}
      </View>
      <Text className="text-xs text-black font-NuniRegular">
        {address.street} Sk. {address.neighborhood} Mah. {address.district} /{" "}
        {address.city}
      </Text>
      <Text className="text-xs text-black font-NuniRegular">
        {address.apartmentName && `Apartman Adı: ${address.apartmentName} `}
        {address.apartmentNumber && `Daire: ${address.apartmentNumber} `}
        {address.floor && `Kat: ${address.floor}`}
      </Text>
      <Text className="text-xs text-black font-NuniRegular">
        Adres Tarifi: {address.addressDescription}
      </Text>
      <AddressMap
        latitude={address.latitude.toString()}
        longitude={address.longitude.toString()}
        title={address.title}
      />
      <TouchableOpacity
        className="mt-2 bg-blue-700 rounded-lg py-2 items-center justify-center flex-row"
        onPress={() => router.push(`/account/address/${address.addressId}`)}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text className="text-white font-NunitoBold text-sm">Düzenle</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default AddressCard;

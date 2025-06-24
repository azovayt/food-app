// components/features/addresses/AddressList.tsx
import React from "react";
import { ScrollView, Text } from "react-native";
import AddressCard from "./AddressCard";
import { Address } from "../../../types/user";

interface AddressListProps {
  addresses: Address[];
  selectedAddressId: string | null;
  updatingId: string | null;
  onSelectAddress: (addressId: string) => void;
}

const AddressList = ({
  addresses,
  selectedAddressId,
  updatingId,
  onSelectAddress,
}: AddressListProps) => (
  <ScrollView className="flex-1 mb-20 p-4">
    {addresses.length > 0 ? (
      addresses.map((address) => (
        <AddressCard
          key={address.addressId}
          address={address}
          isSelected={selectedAddressId === address.addressId}
          isUpdating={updatingId === address.addressId}
          onSelect={() => onSelectAddress(address.addressId)}
        />
      ))
    ) : (
      <Text className="text-base mb-4 text-gray-500">
        Kayıtlı adres bulunamadı.
      </Text>
    )}
  </ScrollView>
);

export default AddressList;

// components/features/addresses/AddressMap.tsx
import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface AddressMapProps {
  latitude?: string;
  longitude?: string;
  title: string;
}

const AddressMap = ({ latitude, longitude, title }: AddressMapProps) => (
  <>
    {latitude && longitude ? (
      <View className="w-full mt-2 mb-2 rounded-xl overflow-hidden">
        <MapView
          style={{ width: "100%", height: 110 }}
          initialRegion={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
            title={title}
          />
        </MapView>
      </View>
    ) : (
      <Text className="text-xs text-gray-400 mt-2">
        Harita konumu eklenmemiş.
      </Text>
    )}
  </>
);

export default AddressMap;

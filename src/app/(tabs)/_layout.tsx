// src/app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1D4ED8",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: { height: 55, backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Keşfet",
          tabBarLabel: ({ focused }) => (
            <Text
              className={`
                text-[11px]
                  ${
                    focused
                      ? "text-blue-700 font-NunitoBold"
                      : "text-gray-600 font-NunitoRegular"
                  } 
                `}
            >
              Keşfet
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-sharp" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Arama",
          tabBarLabel: ({ focused }) => (
            <Text
              className={`
                text-[11px]
                  ${
                    focused
                      ? "text-blue-700 font-NunitoBold"
                      : "text-gray-600 font-NunitoRegular"
                  } 
                `}
            >
              Arama
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name={"search-sharp"} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Sepet",
          tabBarLabel: ({ focused }) => (
            <Text
              className={`
                text-[11px]
                  ${
                    focused
                      ? "text-blue-700 font-NunitoBold"
                      : "text-gray-600 font-NunitoRegular"
                  } 
                `}
            >
              Sepet
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name={"cart-sharp"} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Siparişlerim",
          tabBarLabel: ({ focused }) => (
            <Text
              className={`
                text-[11px]
                  ${
                    focused
                      ? "text-blue-700 font-NunitoBold"
                      : "text-gray-600 font-NunitoRegular"
                  } 
                `}
            >
              Siparişlerim
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name={"fast-food-sharp"} size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Hesabım",
          tabBarLabel: ({ focused }) => (
            <Text
              className={`
                text-[11px]
                  ${
                    focused
                      ? "text-blue-700 font-NunitoBold"
                      : "text-gray-600 font-NunitoRegular"
                  } 
                `}
            >
              Hesabım
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name={"person-sharp"} size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

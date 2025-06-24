// src/app/(tabs)/home/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cuisines/cuisines-list" />
      <Stack.Screen name="cuisines/cuisines" />
      <Stack.Screen name="restaurant-details" />
    </Stack>
  );
};

export default HomeLayout;

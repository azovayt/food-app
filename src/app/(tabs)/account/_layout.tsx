// src/app/(tabs)/account/_layout.tsx
import { router, Stack } from "expo-router";
import { useFirebaseContext } from "../../../context/FirebaseAuthProvider";
import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";

export default function AccountLayout() {
  const { user, loading } = useFirebaseContext();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(tabs)/account/auth/login");
    } else if (!loading && user) {
      router.replace("/(tabs)/account");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="account-details" />
      <Stack.Screen name="favorites" />
      <Stack.Screen name="address/address" />
      <Stack.Screen name="address/add" />
      <Stack.Screen name="address/[addressId]" />
      <Stack.Screen name="offers" />
      <Stack.Screen name="vouchers" />
      <Stack.Screen name="more" />
    </Stack>
  );
}

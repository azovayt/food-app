// src/app/_layout.tsx
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../../global.css";
import { FirebaseAuthProvider } from "../context/FirebaseAuthProvider";
import { CartProvider } from "../context/CartContext";
import { AddressProvider } from "../context/AddressContext";

// SplashScreen'i otomatik gizleme
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("../../assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Black": require("../../assets/fonts/Nunito-Black.ttf"),
  });

  // Splash ekranı 2 saniye sonra veya fontlar yüklendiğinde gizle
  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("Splash ekran gizlenirken hata:", error);
      }
    };

    // Fontlar yüklendiyse veya 2 saniye geçtiyse splash ekranı gizle
    if (fontsLoaded) {
      hideSplashScreen();
    } else {
      const timer = setTimeout(() => hideSplashScreen(), 2000);
      return () => clearTimeout(timer); // Temizlik
    }
  }, [fontsLoaded]);

  if (fontError) {
    console.error("Font yükleme hatası:", fontError);
  }

  // Fontlar yüklenmediyse null döndür
  if (!fontsLoaded) {
    return null;
  }

  return (
    <FirebaseAuthProvider>
      <CartProvider>
        <AddressProvider>
          <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="auto" />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaView>
        </AddressProvider>
      </CartProvider>
    </FirebaseAuthProvider>
  );
};

export default RootLayout;

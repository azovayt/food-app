// src/app/(tabs)/cart.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/layout/Header";
import { useCart } from "../../context/CartContext";
import { useFirebaseContext } from "../../context/FirebaseAuthProvider";
import { useAddressContext } from "../../context/AddressContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const CartScreen = () => {
  const { cartItems, restaurantId, clearCart } = useCart();
  const { user, userData, loading: userLoading } = useFirebaseContext();
  const {
    defaultAddress,
    loading: addressLoading,
    error: addressError,
  } = useAddressContext();

  const [orderLoading, setOrderLoading] = React.useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCompleteOrder = async () => {
    if (!user) {
      Alert.alert("Giriş gerekli", "Sipariş için giriş yapmalısınız.");
      return;
    }
    if (!userData?.firstName || !userData?.lastName || !userData?.phoneNumber) {
      Alert.alert(
        "Profil eksik",
        "Profilinizde isim, soyisim ve telefon olmalı."
      );
      return;
    }
    if (!defaultAddress) {
      Alert.alert("Adres eksik", "Varsayılan adresiniz yok.");
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert("Sepet boş", "Sepete ürün ekleyin.");
      return;
    }
    if (!restaurantId) {
      Alert.alert("Restoran eksik", "Bir restoran seçimi yapılmamış.");
      return;
    }

    setOrderLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        restaurantId,
        items: cartItems.map((item) => ({
          foodId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl ?? "",
        })),
        totalPrice,
        status: "hazırlanıyor",
        createdAt: serverTimestamp(),
        fullName: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phoneNumber,
        email: userData.email || user.email,
        address: {
          ...defaultAddress,
        },
      });
      clearCart();
      Alert.alert("Sipariş alındı!", "Siparişiniz başarıyla kaydedildi.");
    } catch (e: any) {
      Alert.alert("Hata", e?.message || "Sipariş kaydedilemedi.");
    } finally {
      setOrderLoading(false);
    }
  };

  if (userLoading || addressLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-gray-400 mt-2">Yükleniyor...</Text>
      </View>
    );
  }

  if (addressError) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-red-500 text-base">{addressError}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="Sepet" showBackButton={false} rightContent={false} />
      <ScrollView className="p-4">
        {cartItems.length === 0 ? (
          <Text className="text-gray-400">Sepetiniz boş.</Text>
        ) : (
          cartItems.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center mb-3"
            >
              <Text className="flex-1">
                {item.name} x{item.quantity}
              </Text>
              <Text>{item.price * item.quantity}₺</Text>
            </View>
          ))
        )}

        {defaultAddress && (
          <View className="my-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Text className="font-NunitoBold mb-1 text-indigo-800">
              Teslimat Adresi
            </Text>
            <Text className="text-gray-700">
              {defaultAddress.title}, {defaultAddress.street},{" "}
              {defaultAddress.neighborhood}, {defaultAddress.district} /{" "}
              {defaultAddress.city}
            </Text>
            <Text className="text-gray-500">
              {defaultAddress.addressDescription}
            </Text>
          </View>
        )}
        <Text className="font-NunitoBold mt-2 mb-4">Toplam: {totalPrice}₺</Text>
        <TouchableOpacity
          className="bg-green-500 rounded-xl p-3 mb-2"
          onPress={handleCompleteOrder}
          disabled={orderLoading}
        >
          <Text className="text-white text-center font-NunitoBold text-base">
            {orderLoading ? "Gönderiliyor..." : "Siparişi Tamamla"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 rounded-xl p-3"
          onPress={clearCart}
        >
          <Text className="text-white text-center font-NunitoBold text-base">
            Sepeti Temizle
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

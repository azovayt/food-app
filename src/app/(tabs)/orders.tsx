// src/app/(tabs)/orders.tsx
import React from "react";
import { View } from "react-native";
import Header from "../../components/layout/Header";
import Loader from "../../components/ui/Loader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import OrderList from "../../components/features/orders/OrderList";
import { useOrders } from "../../hooks/useOrders";
import { useRestaurants } from "../../hooks/useRestaurants";

const OrdersScreen = () => {
  const { orders, loading: ordersLoading, error } = useOrders();
  const { loading: restaurantsLoading } = useRestaurants();

  if (ordersLoading || restaurantsLoading) {
    return <Loader text="Siparişler yükleniyor..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Siparişlerim"
        showBackButton={false}
        rightContent={false}
      />
      <OrderList orders={orders} />
    </View>
  );
};

export default OrdersScreen;

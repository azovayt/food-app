// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Sepet öğesi için tip tanımı
export interface CartItem {
  id: string; // Öğe ID'si
  name: string; // Öğe adı
  price: number; // Öğe fiyatı
  imageUrl?: string; // Öğe resmi (opsiyonel)
  quantity: number; // Öğe miktarı
}

// Sepet bağlamı için tip tanımı
interface CartContextType {
  cartItems: CartItem[]; // Sepetteki öğeler
  restaurantId: string | null; // Sepetin bağlı olduğu restoran ID'si
  addToCart: (item: Omit<CartItem, "quantity">, restaurantId: string) => void; // Sepete öğe ekleme fonksiyonu
  clearCart: () => void; // Sepeti temizleme fonksiyonu
}

// Sepet bağlamını oluşturuyoruz (undefined varsayılan değer)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Sepet bağlamına erişmek için özel bir hook
export const useCart = () => {
  const ctx = useContext(CartContext);
  // Bağlamın kullanılabilmesi için CartProvider içinde olunmasını zorunlu kılıyoruz
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

// Sepet bağlamını sağlayan bileşen
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Sepet öğelerini saklamak için state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // Sepetin bağlı olduğu restoran ID'sini saklamak için state
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  // Sepete öğe ekleyen fonksiyon
  const addToCart = (item: Omit<CartItem, "quantity">, resId: string) => {
    // Eğer sepet başka bir restorana aitse, sepeti sıfırla ve yeni restoranı ayarla
    if (restaurantId && restaurantId !== resId) {
      setCartItems([{ ...item, quantity: 1 }]);
      setRestaurantId(resId);
      return;
    }
    // Yeni restoran ID'sini ayarla
    setRestaurantId(resId);
    // Mevcut sepete öğe ekle veya miktarı artır
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        // Eğer öğe zaten sepetteyse, miktarını artır
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Yeni öğeyi sepete ekle (miktar 1 olarak)
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Sepeti ve restoran ID'sini temizleyen fonksiyon
  const clearCart = () => {
    setCartItems([]); // Sepet öğelerini sıfırla
    setRestaurantId(null); // Restoran ID'sini sıfırla
  };

  // Sepet bağlamını sağlayıcı ile sar ve çocuk bileşenleri render et
  return (
    <CartContext.Provider
      value={{ cartItems, restaurantId, addToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

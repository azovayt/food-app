// src/hooks/useOrders.ts
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../services/firebaseConfig";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import type { Order } from "../types/order";

// Kullanıcının siparişlerini çeken özel bir hook tanımlıyoruz
export function useOrders() {
  // Sipariş listesini saklamak için state (Order tipinde dizi)
  const [orders, setOrders] = useState<Order[]>([]);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(true);
  // Hata mesajını saklamak için state (hata yoksa null)
  const [error, setError] = useState<string | null>(null);

  // Siparişleri Firebase'den çeken useEffect hook'u
  useEffect(() => {
    // Asenkron sipariş verisi çekme fonksiyonu
    const fetchOrders = async () => {
      // Yükleme durumunu başlat ve hata state'ini sıfırla
      setLoading(true);
      setError(null);
      try {
        // Firebase Authentication'dan mevcut kullanıcıyı al
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const currentUserId = currentUser?.uid;
        // Kullanıcı giriş yapmamışsa hata ayarla ve işlemi sonlandır
        if (!currentUserId) {
          setOrders([]);
          setLoading(false);
          setError("Kullanıcı giriş yapmamış.");
          return;
        }

        let q;
        try {
          // Kullanıcının siparişlerini, oluşturulma tarihine göre azalan sırayla çeken Firestore sorgusu
          q = query(
            collection(db, "orders"),
            where("userId", "==", currentUserId),
            orderBy("createdAt", "desc")
          );
          // Sorguyu çalıştır ve sonuçları al
          const querySnapshot = await getDocs(q);
          // Gelen belgeleri Order tipine dönüştür
          const orderList: Order[] = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Belge ID'sini ekle
            ...doc.data(), // Diğer verileri yay
          })) as Order[];
          // Sipariş listesini state'e kaydet
          setOrders(orderList);
        } catch (err: any) {
          // Eğer Firestore index hatası varsa (örneğin, orderBy için index eksikse)
          if (
            typeof err?.message === "string" &&
            err.message.includes("index")
          ) {
            // orderBy olmadan tekrar sorgu yap
            q = query(
              collection(db, "orders"),
              where("userId", "==", currentUserId)
            );
            // Sorguyu çalıştır ve sonuçları al
            const querySnapshot = await getDocs(q);
            // Gelen belgeleri Order tipine dönüştür
            const orderList: Order[] = querySnapshot.docs.map((doc) => ({
              id: doc.id, // Belge ID'sini ekle
              ...doc.data(), // Diğer verileri yay
            })) as Order[];
            // Sipariş listesini state'e kaydet
            setOrders(orderList);
          } else {
            // Diğer hatalarda sipariş listesini sıfırla ve hata mesajı ayarla
            setOrders([]);
            setError("Siparişler alınırken hata oluştu.");
          }
        }
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat
        setLoading(false);
      }
    };

    // Sipariş verilerini çek
    fetchOrders();
  }, []); // Bağımlılık dizisi boş, sadece component mount olduğunda çalışır

  // Hook'un döndürdüğü değerler: sipariş listesi, yükleme durumu ve hata
  return { orders, loading, error };
}

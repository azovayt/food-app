// src/hooks/useMenuItems.ts
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { MenuItem } from "../types/menuItem";

// Belirli bir restoranın menü öğelerini çeken özel bir hook tanımlıyoruz
export function useMenuItems(restaurantId: string) {
  // Menü öğelerini saklamak için state (MenuItem tipinde dizi)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(true);
  // Hata mesajını saklamak için state (hata yoksa null)
  const [error, setError] = useState<string | null>(null);

  // Menü öğelerini Firebase'den çeken useEffect hook'u
  useEffect(() => {
    // Restoran ID'si yoksa işlemi sonlandır
    if (!restaurantId) return;

    // Asenkron menü öğesi çekme fonksiyonu
    const fetchMenuItems = async () => {
      try {
        // Firestore'da restorana ait menuItems alt koleksiyonuna referans oluştur
        const menuRef = collection(
          db,
          "restaurants",
          restaurantId,
          "menuItems"
        );
        // Koleksiyondaki belgeleri al
        const snapshot = await getDocs(menuRef);
        // Gelen belgeleri MenuItem tipine dönüştür
        const items = snapshot.docs.map((doc) => ({
          id: doc.id, // Belge ID'sini ekle
          ...(doc.data() as Omit<MenuItem, "id">), // Diğer verileri yay
        }));
        // Menü öğelerini state'e kaydet
        setMenuItems(items);
      } catch (err) {
        // Hata durumunda hata mesajını state'e kaydet
        setError("Menü yüklenemedi.");
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat
        setLoading(false);
      }
    };

    // Menü öğelerini çek
    fetchMenuItems();
  }, [restaurantId]); // restaurantId değiştiğinde useEffect yeniden çalışır

  // Hook'un döndürdüğü değerler: menü öğeleri, yükleme durumu ve hata
  return { menuItems, loading, error };
}

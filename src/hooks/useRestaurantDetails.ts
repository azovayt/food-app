// src/hooks/useRestaurantDetails.ts
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { Restaurant } from "../types/restaurant";

// Belirli bir restoranının detaylarını çeken özel bir hook tanımlıyoruz
export function useRestaurantDetails(restaurantId: string) {
  // Restoran verisini saklamak için state (null veya Restaurant tipi)
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(true);
  // Hata mesajını saklamak için state (hata yoksa null)
  const [error, setError] = useState<string | null>(null);

  // Restoran detaylarını Firebase'den çeken useEffect hook'u
  useEffect(() => {
    // Asenkron restoran verisi çekme fonksiyonu
    const fetchRestaurant = async () => {
      // Restoran ID'si yoksa hata ayarla ve işlemi sonlandır
      if (!restaurantId) {
        setError("Restoran ID eksik");
        setLoading(false);
        return;
      }

      try {
        // Firestore'da restoran belgesine referans oluştur
        const docRef = doc(db, "restaurants", restaurantId);
        // Belgeyi Firestore'dan al
        const docSnap = await getDoc(docRef);

        // Eğer belge varsa
        if (docSnap.exists()) {
          // Belge verisini Restaurant tipine dönüştür ve state'e kaydet
          setRestaurant({ id: docSnap.id, ...docSnap.data() } as Restaurant);
        } else {
          // Belge yoksa hata mesajı ayarla
          setError("Restoran bulunamadı");
        }
      } catch (err) {
        // Hata durumunda hata mesajını state'e kaydet
        setError((err as Error).message);
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat
        setLoading(false);
      }
    };

    // Restoran verisini çek
    fetchRestaurant();
  }, [restaurantId]); // restaurantId değiştiğinde useEffect yeniden çalışır

  // Hook'un döndürdüğü değerler: restoran verisi, yükleme durumu ve hata
  return { restaurant, loading, error };
}

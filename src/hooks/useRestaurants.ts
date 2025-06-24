// src/hooks/useRestaurants.ts
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { Restaurant } from "../types/restaurant";

// Restoran verilerini çekmek için özel bir hook tanımlıyoruz
export function useRestaurants(filterCategory?: string) {
  // Restoran listesini saklamak için state (Restaurant tipinde dizi)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(true);
  // Hata mesajını saklamak için state (hata yoksa null)
  const [error, setError] = useState<string | null>(null);

  // Restoran verilerini Firebase'den çeken useEffect hook'u
  useEffect(() => {
    // Asenkron restoran verisi çekme fonksiyonu
    const fetchRestaurants = async () => {
      try {
        // Sorgu için temel referans
        let q;
        // Eğer bir kategori filtresi varsa
        if (filterCategory) {
          // Restoranları kategoriye göre filtreleyen Firestore sorgusu
          q = query(
            collection(db, "restaurants"),
            where("categories", "array-contains", filterCategory)
          );
        } else {
          // Tüm restoranları çeken Firestore sorgusu
          q = collection(db, "restaurants");
        }

        // Firestore'dan sorguyu çalıştır ve sonuçları al
        const snapshot = await getDocs(q);
        // Gelen belgeleri Restaurant tipine dönüştür
        const data: Restaurant[] = snapshot.docs.map((doc) => ({
          id: doc.id, // Belge ID'sini ekle
          ...(doc.data() as Omit<Restaurant, "id">), // Diğer verileri yay
        }));
        // Restoran verilerini state'e kaydet
        setRestaurants(data);
      } catch (err) {
        // Hata durumunda hata mesajını state'e kaydet
        setError((err as Error).message);
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat
        setLoading(false);
      }
    };
    // Restoran verilerini çek
    fetchRestaurants();
  }, [filterCategory]); // filterCategory değiştiğinde useEffect yeniden çalışır

  // Hook'un döndürdüğü değerler: restoran listesi, yükleme durumu ve hata
  return { restaurants, loading, error };
}

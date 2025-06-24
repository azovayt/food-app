// src/hooks/useFavoriteRestaurants.ts
import { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { Favorite } from "../types/user";
import type { Restaurant } from "../types/restaurant";

// Kullanıcının favori restoranlarını çeken özel bir hook tanımlıyoruz
export function useFavoriteRestaurants(userId?: string) {
  // Favori restoran listesini saklamak için state (Restaurant tipinde dizi)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(true);

  // Favori restoranları Firebase'den çeken useEffect hook'u
  useEffect(() => {
    // Kullanıcı ID'si yoksa restoran listesini sıfırla ve işlemi sonlandır
    if (!userId) {
      setRestaurants([]);
      setLoading(false);
      return;
    }
    // Yükleme durumunu başlat
    setLoading(true);
    // Favori restoran ID'lerini ve ilgili restoranları çeken asenkron fonksiyon
    const fetchFavoritesAndRestaurants = async () => {
      // 1. Kullanıcının favori restoran ID'lerini çek
      const favRef = collection(db, "users", userId, "favorites");
      const favSnap = await getDocs(favRef);
      // Gelen belgeleri Favorite tipine dönüştür
      const favs = favSnap.docs.map((doc) => ({
        id: doc.id, // Belge ID'sini ekle
        ...doc.data(), // Diğer verileri yay
      })) as Favorite[];

      // 2. Favori restoran ID'lerini al ve geçersiz ID'leri filtrele
      const favoriteIds = favs.map((f) => f.restaurantId).filter(Boolean);
      let favRestaurants: Restaurant[] = [];
      // Eğer favori ID'ler varsa
      if (favoriteIds.length > 0) {
        // Firestore'un 'in' sorgusu 10 ID ile sınırlı, bu yüzden ID'leri 10'luk gruplara böl
        const chunks = Array.from(
          { length: Math.ceil(favoriteIds.length / 10) },
          (_, i) => favoriteIds.slice(i * 10, i * 10 + 10)
        );
        let all: Restaurant[] = [];
        // Her bir grup için restoranları çek
        for (const chunk of chunks) {
          // Restoran ID'lerine göre Firestore sorgusu oluştur
          const q = query(
            collection(db, "restaurants"),
            where("__name__", "in", chunk)
          );
          // Sorguyu çalıştır ve sonuçları al
          const snap = await getDocs(q);
          // Gelen belgeleri Restaurant tipine dönüştür ve listeye ekle
          all.push(
            ...snap.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as Restaurant)
            )
          );
        }
        favRestaurants = all;
      }
      // Favori restoranları state'e kaydet
      setRestaurants(favRestaurants);
      // Yükleme durumunu kapat
      setLoading(false);
    };
    // Favori restoranları çek
    fetchFavoritesAndRestaurants();
  }, [userId]); // userId değiştiğinde useEffect yeniden çalışır

  // Hook'un döndürdüğü değerler: favori restoran listesi ve yükleme durumu
  return { restaurants, loading };
}

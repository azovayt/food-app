// src/hooks/useFavorites.ts
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../services/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import type { Favorite } from "../types/user";

// Kullanıcının favorilerini çeken özel bir hook tanımlıyoruz
export function useFavorites() {
  // Favori listesini saklamak için state (Favorite tipinde dizi)
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(true);

  // Favorileri Firebase'den çeken ve gerçek zamanlı güncelleyen useEffect hook'u
  useEffect(() => {
    // Firebase Authentication'dan mevcut kullanıcıyı al
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    // Kullanıcı giriş yapmamışsa favori listesini sıfırla ve işlemi sonlandır
    if (!userId) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    // Kullanıcının favoriler alt koleksiyonuna referans oluştur
    const favRef = collection(db, "users", userId, "favorites");
    // Gerçek zamanlı dinleme için Firestore snapshot listener'ı başlat
    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      // Gelen belgeleri Favorite tipine dönüştür ve state'e kaydet
      setFavorites(
        snapshot.docs.map((doc) => ({
          id: doc.id, // Belge ID'sini ekle
          ...doc.data(), // Diğer verileri yay
        })) as Favorite[]
      );
      // Yükleme durumunu kapat
      setLoading(false);
    });
    // Component unmount olduğunda snapshot listener'ı temizle
    return unsubscribe;
  }, []); // Bağımlılık dizisi boş, sadece component mount olduğunda çalışır

  // Hook'un döndürdüğü değerler: favori listesi ve yükleme durumu
  return { favorites, loading };
}

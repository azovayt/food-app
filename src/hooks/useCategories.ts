// src/hooks/useCategories.ts
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { Category } from "../types/category";

// Kategori verilerini çeken özel bir hook tanımlıyoruz
export function useCategories() {
  // Kategori listesini saklamak için state (Category tipinde dizi)
  const [categories, setCategories] = useState<Category[]>([]);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(true);
  // Hata mesajını saklamak için state (hata yoksa null)
  const [error, setError] = useState<string | null>(null);

  // Kategorileri Firebase'den çeken useEffect hook'u
  useEffect(() => {
    // Asenkron kategori verisi çekme fonksiyonu
    const fetchCategories = async () => {
      try {
        // Kategorileri "order" alanına göre artan sırayla çeken Firestore sorgusu
        const q = query(collection(db, "categories"), orderBy("order", "asc"));
        // Sorguyu çalıştır ve sonuçları al
        const snapshot = await getDocs(q);
        // Gelen belgeleri Category tipine dönüştür
        const data: Category[] = snapshot.docs.map((doc) => ({
          id: doc.id, // Belge ID'sini ekle
          ...(doc.data() as Omit<Category, "id">), // Diğer verileri yay
        }));
        // Kategori verilerini state'e kaydet
        setCategories(data);
      } catch (err) {
        // Hata durumunda hata mesajını state'e kaydet
        setError((err as Error).message);
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat
        setLoading(false);
      }
    };
    // Kategori verilerini çek
    fetchCategories();
  }, []); // Bağımlılık dizisi boş, sadece component mount olduğunda çalışır

  // Hook'un döndürdüğü değerler: kategori listesi, yükleme durumu ve hata
  return { categories, loading, error };
}

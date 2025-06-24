// src/hooks/useLogout.ts
import { useState, useCallback } from "react";
import { Logout } from "../services/auth/logout";
import { Alert } from "react-native";

// Kullanıcı çıkış işlemi için özel bir hook tanımlıyoruz
export const useLogout = () => {
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(false);

  // Çıkış işlemini gerçekleştiren asenkron fonksiyon
  const handleLogout = useCallback(async () => {
    // Yükleme durumunu başlat
    setLoading(true);
    try {
      // Logout servisini çağırarak kullanıcı çıkışını yap
      await Logout();
      // Başarılı çıkışta kullanıcıya mesaj göster
      Alert.alert("Başarılı", "Çıkış yapıldı!");
    } catch (error: any) {
      // Hata durumunda hata mesajını kullanıcıya göster
      Alert.alert("Çıkış Hatası", error.message || "Bilinmeyen hata");
    } finally {
      // İşlem tamamlandığında yükleme durumunu kapat
      setLoading(false);
    }
  }, []); // Bağımlılık dizisi boş, fonksiyon sadece bir kez oluşturulur

  // Hook'un döndürdüğü değerler: çıkış fonksiyonu ve yükleme durumu
  return { handleLogout, loading };
};

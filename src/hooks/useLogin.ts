// src/hooks/useLogin.ts
import { useState, useCallback } from "react";
import { Login } from "../services/auth/login";
import { Alert } from "react-native";
import { User } from "firebase/auth";

// Kullanıcı giriş işlemi için özel bir hook tanımlıyoruz
export const useLogin = () => {
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(false);

  // Giriş işlemini gerçekleştiren asenkron fonksiyon
  const handleLogin = useCallback(
    async (email: string, password: string): Promise<User | null> => {
      // E-posta veya şifre boşsa hata mesajı göster
      if (!email || !password) {
        Alert.alert("Hata", "E-posta ve şifre alanları doldurulmalı.");
        return null;
      }
      // Yükleme durumunu başlat
      setLoading(true);
      try {
        // Login servisini çağırarak kullanıcı girişini yap
        const user = await Login(email, password);
        // Başarılı girişte kullanıcıyı döndür
        return user;
      } catch (error: any) {
        // Hata mesajını belirlemek için varsayılan mesaj
        let message = "Bir hata oluştu. Lütfen tekrar deneyin.";
        // Firebase hata kodlarına göre özel mesajlar
        switch (error.code) {
          case "auth/invalid-email":
            message = "Geçersiz e-posta adresi.";
            break;
          case "auth/user-not-found":
            message = "Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.";
            break;
          case "auth/wrong-password":
            message = "Şifre yanlış.";
            break;
          case "auth/too-many-requests":
            message =
              "Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.";
            break;
        }
        // Hata mesajını kullanıcıya göster
        Alert.alert("Giriş Hatası", message);
        return null;
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat
        setLoading(false);
      }
    },
    [] // Bağımlılık dizisi boş, fonksiyon sadece bir kez oluşturulur
  );

  // Hook'un döndürdüğü değerler: giriş fonksiyonu ve yükleme durumu
  return { handleLogin, loading };
};

// src/hooks/useRegister.ts
import { useState, useCallback, useRef, useEffect } from "react";
import { Register } from "../services/user/register";
import { Alert } from "react-native";
import { User } from "firebase/auth";

// Kayıt parametreleri için tip tanımı
type RegisterParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  birthDate: string;
};

// Kullanıcı kaydı için özel bir hook tanımlıyoruz
export const useRegister = () => {
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(false);
  // Component'in mount durumunu takip etmek için ref (memory leak önlemek için)
  const isMounted = useRef(true);

  // Component mount/unmount durumunu yöneten useEffect
  useEffect(() => {
    // Component mount edildiğinde isMounted true olur
    isMounted.current = true;
    // Component unmount edildiğinde isMounted false olur
    return () => {
      isMounted.current = false;
    };
  }, []); // Bağımlılık dizisi boş, sadece bir kez çalışır

  // Kullanıcı kaydını gerçekleştiren asenkron fonksiyon
  const handleRegister = useCallback(
    async (params: RegisterParams): Promise<User | null> => {
      // Parametreleri destructuring ile al
      const {
        email,
        password,
        firstName,
        lastName,
        username,
        phoneNumber,
        birthDate,
      } = params;
      // Tüm alanların dolu olup olmadığını kontrol et
      if (
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !username ||
        !phoneNumber ||
        !birthDate
      ) {
        // Eksik alan varsa hata mesajı göster
        Alert.alert("Hata", "Tüm alanlar doldurulmalı.");
        return null;
      }
      // Yükleme durumunu başlat (eğer component mount ise)
      if (isMounted.current) setLoading(true);
      try {
        // Register servisini çağırarak kullanıcı kaydını yap
        const user = await Register(
          email,
          password,
          firstName,
          lastName,
          username,
          phoneNumber,
          birthDate
        );
        // Kayıt başarılıysa kullanıcıya başarı mesajı göster
        if (isMounted.current) {
          Alert.alert("Başarılı", "Kayıt işlemi başarılı, giriş yapıldı!");
        }
        // Kayıt olan kullanıcıyı döndür
        return user;
      } catch (error: any) {
        // Hata mesajını belirlemek için varsayılan mesaj
        let message = "Bir hata oluştu. Lütfen tekrar deneyin.";
        // Firebase hata kodlarına göre özel mesajlar
        switch (error.code) {
          case "auth/email-already-in-use":
            message = "Bu e-posta adresi zaten kullanımda.";
            break;
          case "auth/invalid-email":
            message = "Geçersiz e-posta adresi.";
            break;
          case "auth/weak-password":
            message = "Şifre çok zayıf. Daha güçlü bir şifre belirleyin.";
            break;
        }
        // Hata mesajını göster (eğer component mount ise)
        if (isMounted.current) {
          Alert.alert("Kayıt Hatası", message);
        }
        return null;
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat (eğer component mount ise)
        if (isMounted.current) setLoading(false);
      }
    },
    [] // Bağımlılık dizisi boş, fonksiyon sadece bir kez oluşturulur
  );

  // Hook'un döndürdüğü değerler: kayıt fonksiyonu ve yükleme durumu
  return { handleRegister, loading };
};

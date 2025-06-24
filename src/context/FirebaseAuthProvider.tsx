// src/context/firebaseAuthProvider.tsx
import React, { useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useUser } from "../hooks/useUser";
import { FirebaseContext } from "../types/firebaseContext";

// Firebase kimlik doğrulama bağlamını kullanıyoruz (tip güvenli)
export const FirebaseAuthProvider = ({
  children,
}: {
  children: React.ReactNode; // Alt bileşenleri temsil eden prop
}) => {
  // Kullanıcı verilerini yönetmek için useUser hook'unu kullanıyoruz
  const userService = useUser();
  // Mevcut Firebase kullanıcısını saklamak için state (User tipi veya null)
  const [user, setUser] = useState<User | null>(null);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState(true);

  // Firebase kimlik doğrulama durumunu izleyen useEffect hook'u
  useEffect(() => {
    // Yükleme durumunu başlat
    setLoading(true);
    // Firebase Authentication'daki kullanıcı değişikliklerini dinle
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Mevcut kullanıcıyı state'e kaydet
      setUser(currentUser);
      // Eğer kullanıcı varsa, kullanıcı verilerini çek
      if (currentUser) {
        await userService.fetchUserData(currentUser.uid, currentUser.email);
      }
      // Yükleme durumunu kapat
      setLoading(false);
    });
    // Component unmount olduğunda dinleyiciyi temizle
    return unsubscribe;
  }, [userService.fetchUserData]); // fetchUserData bağımlılığı eklendi

  // Firebase bağlamını sağlayıcı ile sar ve çocuk bileşenleri render et
  return (
    <FirebaseContext.Provider
      value={{
        user, // Mevcut kullanıcı
        ...userService, // useUser hook'undan gelen fonksiyonlar ve veriler
        loading: loading || userService.loading, // Genel yükleme durumu (her iki yükleme durumunun birleşimi)
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// Firebase bağlamına erişmek için özel bir hook
export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error(
      "useFirebaseContext must be used within a FirebaseAuthProvider"
    );
  }
  return context;
};

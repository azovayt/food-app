// src/hooks/useUser.ts
import { useState, useCallback } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { UserData } from "../types/user";
import { Alert } from "react-native";

// Kullanıcı verilerini yönetmek için özel bir hook tanımlıyoruz
export const useUser = () => {
  // Kullanıcı verilerini saklamak için state (null veya UserData tipi)
  const [userData, setUserData] = useState<UserData | null>(null);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState<boolean>(false);

  // Kullanıcı verilerini Firebase'den çeken asenkron fonksiyon
  const fetchUserData = useCallback(
    async (uid: string, email: string | null): Promise<UserData | null> => {
      // Yükleme durumunu başlat
      setLoading(true);
      try {
        // Firestore'da kullanıcı belgesine referans oluştur (users koleksiyonu, uid ile)
        const userDocRef = doc(db, "users", uid);
        // Kullanıcı belgesini Firestore'dan al
        const userDoc = await getDoc(userDocRef);

        // Eğer kullanıcı belgesi varsa
        if (userDoc.exists()) {
          // Belgedeki veriyi UserData tipine dönüştür ve state'e kaydet
          const data = userDoc.data() as UserData;
          setUserData(data);
          return data;
        } else if (email) {
          // Eğer kullanıcı belgesi yoksa ve email sağlanmışsa, email ile sorgula
          const q = query(collection(db, "users"), where("email", "==", email));
          const querySnapshot = await getDocs(q);
          // Eğer sorgu sonucu boş değilse
          if (!querySnapshot.empty) {
            // İlk eşleşen belgenin verisini al ve state'e kaydet
            const data = querySnapshot.docs[0].data() as UserData;
            setUserData(data);
            return data;
          }
        }
        // Kullanıcı bulunamazsa hata mesajı göster
        Alert.alert("Hata", "Kullanıcı bulunamadı.");
        setUserData(null);
        return null;
      } catch (error: any) {
        // Hata durumunda kullanıcıya hata mesajı göster
        Alert.alert(
          "Hata",
          `Kullanıcı verileri alınamadı: ${error.message || "Bilinmeyen hata"}`
        );
        setUserData(null);
        return null;
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat
        setLoading(false);
      }
    },
    [] // Bağımlılık dizisi boş, fonksiyon sadece bir kez oluşturulur
  );

  // Kullanıcı verisini güncelleyen asenkron fonksiyon
  const updateUserData = useCallback(
    async (uid: string, data: Partial<UserData>) => {
      // Yükleme durumunu başlat
      setLoading(true);
      try {
        // Firestore'da kullanıcı belgesine referans oluştur
        const userDocRef = doc(db, "users", uid);
        // Belgeyi verilen veriyle güncelle
        await updateDoc(userDocRef, data);
        // Güncellenmiş veriyi tekrar çekmek için fetchUserData'yı çağır
        await fetchUserData(uid, data.email ?? null);
        // Başarılı güncelleme mesajı göster
        Alert.alert("Başarılı", "Kullanıcı bilgileri güncellendi!");
        return true;
      } catch (error: any) {
        // Hata durumunda hata mesajı göster
        Alert.alert("Güncelleme Hatası", error.message || "Bilinmeyen hata");
        return false;
      } finally {
        // İşlem tamamlandığında yükleme durumunu kapat
        setLoading(false);
      }
    },
    [fetchUserData] // fetchUserData bağımlılığı, bu fonksiyon değiştiğinde yeniden oluşturulur
  );

  // Hook'un döndürdüğü değerler: kullanıcı verisi, yükleme durumu ve fonksiyonlar
  return { userData, loading, fetchUserData, updateUserData };
};

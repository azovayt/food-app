// src/hooks/useAddresses.ts
import { useState, useCallback } from "react";
import { db } from "../services/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { Address } from "../types/user";
import { Timestamp } from "firebase/firestore";

// Adres formu için Address tipinden addressId ve createdAt hariç veri tipi
type AddressFormData = Omit<Address, "addressId" | "createdAt">;

// Kullanıcının adreslerini yönetmek için özel bir hook tanımlıyoruz
export const useAddresses = (userId: string) => {
  // Adres listesini saklamak için state (Address tipinde dizi)
  const [addresses, setAddresses] = useState<Address[]>([]);
  // Yükleme durumunu takip etmek için state (işlem devam ederken true)
  const [loading, setLoading] = useState<boolean>(false);
  // Hata mesajını saklamak için state (hata yoksa null)
  const [error, setError] = useState<string | null>(null);

  // Kullanıcının adreslerini Firebase'den çeken asenkron fonksiyon
  const fetchAddresses = useCallback(async () => {
    // Kullanıcı ID'si yoksa hata ayarla ve boş dizi döndür
    if (!userId) {
      setError("Kullanıcı ID'si eksik.");
      setLoading(false);
      return [];
    }
    // Yükleme durumunu başlat ve hata state'ini sıfırla
    setLoading(true);
    setError(null);
    try {
      // Kullanıcının adresler alt koleksiyonundan belgeleri al
      const snapshot = await getDocs(
        collection(db, "users", userId, "addresses")
      );
      // Gelen belgeleri Address tipine dönüştür
      const adr = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          addressId: d.id, // Belge ID'sini addressId olarak ekle
          ...data, // Diğer verileri yay
          createdAt:
            data.createdAt instanceof Timestamp // createdAt'nin Timestamp olduğundan emin ol
              ? data.createdAt
              : Timestamp.now(), // Eğer değilse mevcut zamanı kullan
        } as Address;
      });
      // Adresleri state'e kaydet
      setAddresses(adr);
      return adr;
    } catch (e: any) {
      // Hata durumunda hata mesajını state'e kaydet ve boş dizi döndür
      setError(`Adresler alınamadı: ${e.message || "Bilinmeyen hata"}`);
      setAddresses([]);
      return [];
    } finally {
      // İşlem tamamlandığında yükleme durumunu kapat
      setLoading(false);
    }
  }, [userId]); // userId değiştiğinde fonksiyon yeniden oluşturulur

  // Yeni adres ekleyen asenkron fonksiyon
  const addAddress = async (address: AddressFormData) => {
    // Kullanıcı ID'si yoksa hata ayarla
    if (!userId) {
      setError("Kullanıcı ID'si eksik.");
      return;
    }
    // Yükleme durumunu başlat ve hata state'ini sıfırla
    setLoading(true);
    setError(null);
    try {
      // Yeni adresi kullanıcının adresler alt koleksiyonuna ekle
      await addDoc(collection(db, "users", userId, "addresses"), {
        ...address, // Adres verilerini yay
        isDefault: !!address.isDefault, // isDefault değerini boolean yap
        createdAt: serverTimestamp(), // Sunucu zaman damgasını ekle
      });
      // Güncel adres listesini çek
      await fetchAddresses();
    } catch (e: any) {
      // Hata durumunda hata mesajını state'e kaydet
      setError(`Adres eklenemedi: ${e.message || "Bilinmeyen hata"}`);
    } finally {
      // İşlem tamamlandığında yükleme durumunu kapat
      setLoading(false);
    }
  };

  // Adresi güncelleyen asenkron fonksiyon
  const updateAddress = async (addressId: string, data: Partial<Address>) => {
    // Kullanıcı ID'si yoksa hata ayarla
    if (!userId) {
      setError("Kullanıcı ID'si eksik.");
      return;
    }
    // Yükleme durumunu başlat ve hata state'ini sıfırla
    setLoading(true);
    setError(null);
    try {
      // Belirtilen adres belgesini güncelle
      await updateDoc(doc(db, "users", userId, "addresses", addressId), data);
      // Güncel adres listesini çek
      await fetchAddresses();
    } catch (e: any) {
      // Hata durumunda hata mesajını state'e kaydet
      setError(`Adres güncellenemedi: ${e.message || "Bilinmeyen hata"}`);
    } finally {
      // İşlem tamamlandığında yükleme durumunu kapat
      setLoading(false);
    }
  };

  // Adresi silen asenkron fonksiyon
  const deleteAddress = async (addressId: string) => {
    // Kullanıcı ID'si yoksa hata ayarla
    if (!userId) {
      setError("Kullanıcı ID'si eksik.");
      return;
    }
    // Yükleme durumunu başlat ve hata state'ini sıfırla
    setLoading(true);
    setError(null);
    try {
      // Belirtilen adres belgesini sil
      await deleteDoc(doc(db, "users", userId, "addresses", addressId));
      // Güncel adres listesini çek
      await fetchAddresses();
    } catch (e: any) {
      // Hata durumunda hata mesajını state'e kaydet
      setError(`Adres silinemedi: ${e.message || "Bilinmeyen hata"}`);
    } finally {
      // İşlem tamamlandığında yükleme durumunu kapat
      setLoading(false);
    }
  };

  // Varsayılan adresi ayarlayan asenkron fonksiyon
  const setDefaultAddress = async (addressId: string) => {
    // Kullanıcı ID'si yoksa hata ayarla
    if (!userId) {
      setError("Kullanıcı ID'si eksik.");
      return;
    }
    // Yükleme durumunu başlat ve hata state'ini sıfırla
    setLoading(true);
    setError(null);
    try {
      // Tüm adresleri al
      const snapshot = await getDocs(
        collection(db, "users", userId, "addresses")
      );
      // Tüm adreslerin isDefault alanını güncelle: seçilen adres true, diğerleri false
      const ops = snapshot.docs.map((d) =>
        updateDoc(doc(db, "users", userId, "addresses", d.id), {
          isDefault: d.id === addressId ? true : false,
        })
      );
      // Tüm güncelleme işlemlerini paralel olarak tamamla
      await Promise.all(ops);
      // Güncel adres listesini çek
      await fetchAddresses();
    } catch (e: any) {
      // Hata durumunda hata mesajını state'e kaydet
      setError(
        `Varsayılan adres ayarlanamadı: ${e.message || "Bilinmeyen hata"}`
      );
    } finally {
      // İşlem tamamlandığında yükleme durumunu kapat
      setLoading(false);
    }
  };

  // Hook'un döndürdüğü değerler: adres listesi, yükleme durumu, hata ve fonksiyonlar
  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
};

// src/context/AddressContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useFirebaseContext } from "./FirebaseAuthProvider";
import { useAddresses } from "../hooks/useAddresses";
import { Address } from "../types/user";

// Adres bağlamı için tip tanımı
interface AddressContextType {
  addresses: Address[]; // Kullanıcının adres listesi
  loading: boolean; // Yükleme durumu
  error: string | null; // Hata mesajı
  defaultAddress: Address | null; // Varsayılan adres
  fetchAddresses: () => void; // Adresleri çeken fonksiyon
  addAddress: ReturnType<typeof useAddresses>["addAddress"]; // Adres ekleme fonksiyonu
  updateAddress: ReturnType<typeof useAddresses>["updateAddress"]; // Adres güncelleme fonksiyonu
  deleteAddress: ReturnType<typeof useAddresses>["deleteAddress"]; // Adres silme fonksiyonu
  setDefaultAddress: ReturnType<typeof useAddresses>["setDefaultAddress"]; // Varsayılan adres ayarlama fonksiyonu
}

// Adres bağlamını oluşturuyoruz (undefined varsayılan değer)
const AddressContext = createContext<AddressContextType | undefined>(undefined);

// Adres bağlamını sağlayan bileşen
export const AddressProvider = ({ children }: { children: ReactNode }) => {
  // Firebase bağlamından mevcut kullanıcıyı al
  const { user } = useFirebaseContext();
  // Kullanıcının adreslerini yönetmek için useAddresses hook'unu kullan
  const {
    addresses,
    loading,
    error,
    fetchAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddresses(user?.uid ?? "");
  // Varsayılan adresi saklamak için state
  const [defaultAddress, setDefaultAddressState] = useState<Address | null>(
    null
  );

  // Kullanıcı ID'si değiştiğinde adresleri çek
  useEffect(() => {
    fetchAddresses();
  }, [user?.uid, fetchAddresses]); // fetchAddresses bağımlılığı eklendi

  // Adresler değiştiğinde varsayılan adresi güncelle
  useEffect(() => {
    // isDefault === true olan adresi bul, yoksa null ayarla
    setDefaultAddressState(addresses.find((a) => a.isDefault === true) ?? null);
  }, [addresses]);

  // Adres bağlamını sağlayıcı ile sar ve çocuk bileşenleri render et
  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        error,
        defaultAddress,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

// Adres bağlamına erişmek için özel bir hook
export const useAddressContext = () => {
  const ctx = useContext(AddressContext);
  // Bağlamın kullanılabilmesi için AddressProvider içinde olunmasını zorunlu kılıyoruz
  if (!ctx)
    throw new Error("useAddressContext must be used within AddressProvider");
  return ctx;
};

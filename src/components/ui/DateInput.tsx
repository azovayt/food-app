import { Ref } from "react";
import { TextInput } from "react-native";

type DateInputProps = {
  value: string;
  onChange: (v: string) => void;
  inputRef?: Ref<TextInput>;
  onSubmitEditing?: () => void;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  className?: string;
  autoFocus?: boolean;
  autoCorrect?: boolean;
};

export const formatDateInput = (text: string) => {
  let raw = text.replace(/\D/g, "");
  if (raw.length > 8) raw = raw.slice(0, 8);
  if (raw.length >= 7)
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  if (raw.length >= 5) return `${raw.slice(0, 4)}-${raw.slice(4, 6)}`;
  return raw;
};

export const DateInput = ({
  value,
  onChange,
  inputRef,
  onSubmitEditing,
  returnKeyType = "next",
  className = "",
  autoFocus = false,
  autoCorrect = false,
}: DateInputProps) => (
  <TextInput
    ref={inputRef}
    className={`px-4 py-3 rounded-lg bg-gray-100 text-base ${className}`}
    placeholder="Doğum Tarihi (Yıl-Ay-Gün)"
    value={value}
    onChangeText={(text) => onChange(formatDateInput(text))}
    keyboardType="number-pad"
    placeholderTextColor="#a1a1aa"
    accessibilityLabel="Doğum tarihi giriş alanı"
    onSubmitEditing={onSubmitEditing}
    returnKeyType={returnKeyType}
    autoFocus={autoFocus}
    autoCorrect={autoCorrect}
  />
);

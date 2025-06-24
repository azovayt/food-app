import { Ref } from "react";
import { View, Text, TextInput } from "react-native";

type PhoneInputProps = {
  value: string;
  onChange: (v: string) => void;
  inputRef?: Ref<TextInput>;
  onSubmitEditing?: () => void;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  className?: string;
  autoFocus?: boolean;
  autoCorrect?: boolean;
};

export const formatPhoneInput = (text: string) => {
  let raw = text.replace(/\D/g, "");
  if (raw.startsWith("0")) raw = raw.slice(1);
  if (raw.length > 10) raw = raw.slice(0, 10);
  if (raw.length > 6)
    return `${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6, 10)}`;
  if (raw.length > 3)
    return `${raw.slice(0, 3)} ${raw.slice(3, 6)}${
      raw.length > 3 ? " " : ""
    }${raw.slice(6, 10)}`;
  return raw;
};

export const PhoneInput = ({
  value,
  onChange,
  inputRef,
  onSubmitEditing,
  returnKeyType = "next",
  className = "",
  autoFocus = false,
  autoCorrect = false,
}: PhoneInputProps) => (
  <View className="relative flex-1">
    <Text className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-500 z-10">
      +90
    </Text>
    <TextInput
      ref={inputRef}
      style={{ paddingLeft: 44 }}
      className={`px-4 py-3 rounded-lg bg-gray-100 text-base ${className}`}
      placeholder="Telefon Numarası"
      value={formatPhoneInput(value)}
      onChangeText={onChange}
      keyboardType="number-pad"
      placeholderTextColor="#a1a1aa"
      accessibilityLabel="Telefon numarası giriş alanı"
      maxLength={13}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      autoFocus={autoFocus}
      autoCorrect={autoCorrect}
    />
  </View>
);

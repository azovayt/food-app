import { Ref } from "react";
import { TextInput } from "react-native";

type TextInputFieldProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  accessibilityLabel?: string;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  inputRef?: Ref<TextInput>;
  onSubmitEditing?: () => void;
  className?: string;
  autoFocus?: boolean;
  autoCorrect?: boolean;
};

export const TextInputField = ({
  value,
  onChange,
  placeholder,
  autoCapitalize = "none",
  secureTextEntry = false,
  keyboardType = "default",
  accessibilityLabel,
  returnKeyType = "next",
  inputRef,
  onSubmitEditing,
  className = "",
  autoFocus = false,
  autoCorrect = false,
}: TextInputFieldProps) => (
  <TextInput
    ref={inputRef}
    className={`px-4 py-3 rounded-lg bg-gray-100 text-base ${className}`}
    placeholder={placeholder}
    value={value}
    onChangeText={onChange}
    autoCapitalize={autoCapitalize}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    placeholderTextColor="#a1a1aa"
    accessibilityLabel={accessibilityLabel}
    returnKeyType={returnKeyType}
    onSubmitEditing={onSubmitEditing}
    autoFocus={autoFocus}
    autoCorrect={autoCorrect}
  />
);

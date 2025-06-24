// src/screens/RegisterScreen.tsx
import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRegister } from "../hooks/useRegister";
import { router } from "expo-router";
import { PhoneInput } from "../components/ui/PhoneInput";
import { DateInput } from "../components/ui/DateInput";
import { TextInputField } from "../components/ui/TextInputField";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const firstNameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const usernameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const birthDateInputRef = useRef<TextInput>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { handleRegister, loading } = useRegister();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignUp = async () => {
    const rawPhoneNumber = phoneNumber.replace(/\D/g, "");
    const result = await handleRegister({
      email,
      password,
      firstName,
      lastName,
      username,
      phoneNumber: rawPhoneNumber,
      birthDate,
    });
    if (result) {
      router.replace("/(tabs)/account");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="w-11/12 max-w-sm mx-4"
        >
          <View className="bg-white p-6 rounded-xl shadow-xl">
            <Text className="text-2xl font-regular text-center text-gray-900 mb-8">
              Kayıt Ol
            </Text>

            <View className="mb-4">
              <View className="flex-row space-x-2 mb-4">
                <View className="flex-1 flex-row items-center">
                  <Ionicons name="person-outline" size={16} color="#a1a1aa" />
                  <TextInputField
                    placeholder="Ad"
                    value={firstName}
                    onChange={setFirstName}
                    autoCapitalize="words"
                    returnKeyType="next"
                    inputRef={firstNameInputRef}
                    onSubmitEditing={() => lastNameInputRef.current?.focus()}
                    className="flex-1 ml-2 text-base text-gray-800"
                    autoFocus={true}
                    autoCorrect={false}
                  />
                </View>
                <View className="flex-1 flex-row items-center">
                  <TextInputField
                    placeholder="Soyad"
                    value={lastName}
                    onChange={setLastName}
                    autoCapitalize="words"
                    returnKeyType="next"
                    inputRef={lastNameInputRef}
                    onSubmitEditing={() => usernameInputRef.current?.focus()}
                    className="flex-1 ml-2 text-base text-gray-800"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <Ionicons name="at-outline" size={16} color="#a1a1aa" />
                <TextInputField
                  placeholder="Kullanıcı Adı"
                  value={username}
                  onChange={setUsername}
                  returnKeyType="next"
                  inputRef={usernameInputRef}
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  className="flex-1 ml-2 text-base text-gray-800"
                  autoCorrect={false}
                />
              </View>

              <View className="flex-row items-center mb-4">
                <Ionicons name="mail-outline" size={16} color="#a1a1aa" />
                <TextInputField
                  placeholder="E-posta"
                  value={email}
                  onChange={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  inputRef={emailInputRef}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  className="flex-1 ml-2 text-base text-gray-800"
                  autoCorrect={false}
                />
              </View>

              <View className="flex-row items-center mb-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color="#a1a1aa"
                />
                <View className="flex-1 flex-row items-center relative">
                  <TextInputField
                    placeholder="Şifre"
                    value={password}
                    onChange={setPassword}
                    secureTextEntry={!showPassword}
                    returnKeyType="next"
                    inputRef={passwordInputRef}
                    onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
                    className="flex-1 ml-2 text-base text-gray-800"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={16}
                      color="#a1a1aa"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <Ionicons name="call-outline" size={16} color="#a1a1aa" />
                <PhoneInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  inputRef={phoneNumberInputRef}
                  onSubmitEditing={() => birthDateInputRef.current?.focus()}
                  className="flex-1 ml-2 text-base text-gray-800"
                  autoCorrect={false}
                />
              </View>

              <View className="flex-row items-center mb-4">
                <Ionicons name="calendar-outline" size={16} color="#a1a1aa" />
                <DateInput
                  value={birthDate}
                  onChange={setBirthDate}
                  inputRef={birthDateInputRef}
                  returnKeyType="done"
                  className="flex-1 ml-2 text-base text-gray-800"
                  autoCorrect={false}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSignUp}
              className="bg-blue-700 py-3 rounded-lg"
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-regular text-base">
                  Kayıt Ol
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} className="mt-4">
              <Text className="text-center text-blue-600 text-sm font-regular">
                Hesabın var mı? <Text className="underline">Giriş Yap</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

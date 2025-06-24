// src/screens/LoginScreen.tsx
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
import { useLogin } from "../hooks/useLogin";
import { router } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { handleLogin, loading } = useLogin();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignIn = async () => {
    await handleLogin(email, password);
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
              Giriş Yap
            </Text>
            <View className="mb-4">
              <View className="flex-row items-center mb-4">
                <Ionicons name="mail-outline" size={16} color="#a1a1aa" />
                <TextInput
                  className="flex-1 ml-2 px-4 py-3 rounded-lg bg-gray-100 text-base text-gray-800"
                  placeholder="E-posta"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#a1a1aa"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  autoFocus={true}
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
                  <TextInput
                    ref={passwordInputRef}
                    className="flex-1 ml-2 px-4 py-3 rounded-lg bg-gray-100 text-base text-gray-800"
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#a1a1aa"
                    returnKeyType="done"
                    onSubmitEditing={handleSignIn}
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
            </View>
            <TouchableOpacity
              onPress={handleSignIn}
              className="bg-blue-700 py-3 rounded-lg"
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-regular text-base">
                  Giriş Yap
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/account/auth/register")}
              className="mt-4"
            >
              <Text className="text-center text-blue-600 text-sm font-regular">
                Hesabın yok mu? <Text className="underline">Kayıt Ol</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

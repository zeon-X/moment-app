import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { Button } from "../../components/ui/button";
import { FormTextInput } from "../../components/ui/form-text-input";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const loginFormValidate = () => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email.trim()))
      newErrors.email = "Invalid email address.";

    if (!formData.password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    if (!loginFormValidate()) return;
    // Login logic here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ThemedView className="flex-1 justify-center items-center px-6">
        <Image
          source={require("@assets/images/icon-logo.png")}
          style={{ width: 64, height: 64, marginBottom: 6 }}
          resizeMode="contain"
        />
        <ThemedText type="title" style={{ marginBottom: 16 }}>
          Welcome Back
        </ThemedText>

        <View className="w-full max-w-md gap-4">
          <FormTextInput
            label="Email"
            placeholder="Email"
            value={formData.email}
            onChangeText={(v) => handleChange("email", v)}
            autoCapitalize="none"
            keyboardType="email-address"
            error={errors.email}
          />

          <FormTextInput
            label="Password"
            placeholder="Password"
            value={formData.password}
            onChangeText={(v) => handleChange("password", v)}
            secureTextEntry
            error={errors.password}
          />

          <Button
            title="Login"
            variant="primary"
            className="mt-2 rounded-md py-3"
            onPress={handleLogin}
          />

          <View className="flex-row justify-center items-center gap-1 mt-1">
            <ThemedText className="text-[12px]">
              Don’t have an account?
            </ThemedText>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <ThemedText className="text-[12px] font-semibold text-orange-600">
                Register
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

export default Login;

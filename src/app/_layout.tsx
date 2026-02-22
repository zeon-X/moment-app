import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "nativewind";
import "react-native-reanimated";
import "./global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../context/auth-context";
import SplashScreenController from "./splash";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StatusBar style="auto" />
          <AuthSplashController />
          <RootNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default RootLayout;

const AuthSplashController = () => {
  const { loading } = useAuth();
  return <SplashScreenController isLoading={loading} />;
};

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
};

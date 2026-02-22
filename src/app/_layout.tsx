import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "nativewind";
import "react-native-reanimated";
import "./global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { getFromSecureStore } from "@/utils/useSecureStorage";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreenController } from "./splash";

const RootLayout = () => {
  const colorScheme = useColorScheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getFromSecureStore("token").then((token) => {
      setIsAuthenticated(!!token);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <SplashScreenController isLoading={false} />
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getFromSecureStore("token").then((token) => {
      setIsAuthenticated(!!token);
    });
  }, []);

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

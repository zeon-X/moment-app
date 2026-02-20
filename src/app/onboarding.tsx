import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const Onboarding = () => {
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  return (
    <ThemedView className="flex-1 ">
      {/* Cover Image */}
      <Image
        source={require("@assets/images/onboarding-cover.png")}
        style={{
          width: "100%",
          height: height * 0.57,
          resizeMode: "cover",
          marginBottom: 24,
          borderRadius: 12,
        }}
      />
      <View className="flex-1 items-center justify-between px-6 pb-10">
        <View className="justify-center items-center gap-4">
          {/* Logo */}
          <Image
            source={require("@assets/images/text-logo.png")}
            style={{
              width: 180,
              height: 40,
              resizeMode: "contain",
            }}
            accessibilityLabel="Moment logo"
          />
          {/* Subtitle */}
          <ThemedText className="">
            Share every moments with your friends
          </ThemedText>
        </View>

        {/* Buttons */}
        <View className="w-full mt-2">
          <TouchableOpacity
            className="bg-[#f04c00df] w-full py-4 rounded-xl mb-4 shadow-lg"
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.85}
          >
            <Text className="text-white text-center text-lg font-semibold tracking-wide">
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-200 w-full py-4 rounded-xl "
            onPress={() => router.push("/(auth)")}
            activeOpacity={0.85}
          >
            <Text className="text-gray-700 text-center text-lg font-semibold tracking-wide">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        {/* Extra: Divider and tagline */}
        <View className="w-full items-center mt-8">
          <View className="w-1/2 h-0.5 bg-gray-200 mb-2" />
          <ThemedText style={{ fontSize: 12 }}>
            Connect. Share. Celebrate.
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

export default Onboarding;

import { ThemedScrollView } from "@/components/themed-scrollview";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePostTabScreen = () => {
  return (
    <SafeAreaView
      edges={{ bottom: "off", top: "additive" }}
      style={{ flex: 1 }}
    >
      <ThemedScrollView className="flex-1"></ThemedScrollView>
    </SafeAreaView>
  );
};

export default CreatePostTabScreen;

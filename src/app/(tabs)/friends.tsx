import { ThemedScrollView } from "@/components/themed-scrollview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendTabScreen() {
  return (
    <SafeAreaView
      edges={{ bottom: "off", top: "additive" }}
      style={{ flex: 1 }}
    >
      <ThemedScrollView className="flex-1"></ThemedScrollView>
    </SafeAreaView>
  );
}

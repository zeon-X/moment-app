import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function CreatePostModal() {
  const router = useRouter();
  return (
    <ThemedView className="flex-1 items-center justify-center bg-white dark:bg-black">
      <ThemedText type="title">Create Post</ThemedText>
      <Button
        title="Close"
        variant="outline"
        onPress={() => router.back()}
        className="mt-8 w-32"
      />
    </ThemedView>
  );
}

import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MAX_CHAR_COUNT = 280;

const CreatePostTabScreen = () => {
  const [postText, setPostText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (postText.trim().length === 0) return;

    setIsPosting(true);
    // Simulate API call
    setTimeout(() => {
      setPostText("");
      setIsPosting(false);
      // You can add a success toast or notification here
    }, 1000);
  };

  const charCount = postText.length;
  const isNearLimit = charCount > MAX_CHAR_COUNT * 0.8;
  const isOverLimit = charCount > MAX_CHAR_COUNT;
  const canPost = postText.trim().length > 0 && !isOverLimit;

  return (
    <SafeAreaView
      edges={{ bottom: "off", top: "additive" }}
      style={{ flex: 1 }}
    >
      <ThemedScrollView className="flex-1">
        <ThemedView className="flex-1 px-4 py-6">
          {/* Header */}
          <ThemedText type="title" className="mb-6">
            Create Post
          </ThemedText>

          {/* User Info Section */}
          <View className="flex-row items-center gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <View className="w-12 h-12 rounded-full bg-orange-500 justify-center items-center">
              <ThemedText type="defaultSemiBold">U</ThemedText>
            </View>
            <View className="flex-1">
              <ThemedText type="defaultSemiBold">Your Name</ThemedText>
              <ThemedText type="small">@username</ThemedText>
            </View>
          </View>

          {/* Text Input */}
          <View className="mb-6">
            <TextInput
              placeholder="What's on your mind?"
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              value={postText}
              onChangeText={setPostText}
              maxLength={MAX_CHAR_COUNT}
              className="bg-gray-100 dark:bg-gray-800 text-base text-gray-900 dark:text-white p-4 rounded-lg min-h-32"
              textAlignVertical="top"
            />

            {/* Character Counter */}
            <View className="flex-row justify-end items-center mt-3">
              <Text
                className={`text-sm font-medium ${
                  isOverLimit
                    ? "text-red-500"
                    : isNearLimit
                      ? "text-orange-500"
                      : "text-gray-500"
                }`}
              >
                {charCount} / {MAX_CHAR_COUNT}
              </Text>
              {isOverLimit && (
                <Text className="text-xs text-red-500">
                  Character limit exceeded
                </Text>
              )}
            </View>
          </View>

          {/* Post Button */}
          <View className="">
            <Button
              title={isPosting ? "Posting..." : "Post"}
              variant={canPost ? "primary" : "secondary"}
              onPress={handlePost}
              disabled={!canPost || isPosting}
            />
          </View>

          {/* Info Text */}
          <ThemedText type="small" className="text-center text-gray-500 mt-6">
            Your post will be visible to your community
          </ThemedText>
        </ThemedView>
      </ThemedScrollView>
    </SafeAreaView>
  );
};

export default CreatePostTabScreen;

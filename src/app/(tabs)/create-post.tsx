import { ScreenLayout } from "@/components/screen-layout";
import { ThemedText } from "@/components/themed-text";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

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
    <ScreenLayout
      title="Create Post"
      scrollViewClassName="flex-1"
      contentClassName="flex-1 px-4 py-6"
    >
      {/* User Info Section */}
      <View className="flex-row items-center gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <Avatar name="Your Name" size="md" />
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
          numberOfLines={10}
          value={postText}
          onChangeText={setPostText}
          maxLength={MAX_CHAR_COUNT}
          className="bg-gray-100 dark:bg-gray-800 text-base text-gray-900 dark:text-white p-4 rounded-lg min-h-48"
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
    </ScreenLayout>
  );
};

export default CreatePostTabScreen;

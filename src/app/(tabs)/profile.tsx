import { ScreenLayout } from "@/components/screen-layout";
import { ThemedText } from "@/components/themed-text";
import { Avatar } from "@/components/ui/avatar";
import { type Comment } from "@/components/ui/comments-list";
import { PostCard, type Post } from "@/components/ui/post-card";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

type UserProfile = {
  name: string;
  age: number;
  email: string;
  username: string;
  posts: number;
  comments: number;
  likes: number;
};

const SAMPLE_USER: UserProfile = {
  name: "John Developer",
  age: 27,
  email: "john.dev@example.com",
  username: "john_dev",
  posts: 48,
  comments: 156,
  likes: 892,
};

const SAMPLE_USER_POSTS: Post[] = [
  {
    id: "p1",
    author: "John Developer",
    username: "john_dev",
    content: "Just built an amazing feature using React Native! 🚀",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    likes: 45,
    comments: [
      {
        id: "c1",
        author: "Sarah Johnson",
        username: "sarah_j",
        content: "That looks awesome!",
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      },
    ],
    liked: true,
  },
  {
    id: "p2",
    author: "John Developer",
    username: "john_dev",
    content: "Coffee and coding - my favorite combination ☕💻",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 32,
    comments: [],
    liked: false,
  },
];

const ProfileTabScreen = () => {
  const [user] = useState<UserProfile>(SAMPLE_USER);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>(SAMPLE_USER_POSTS);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            setIsLoggingOut(true);
            // Simulate logout
            setTimeout(() => {
              setIsLoggingOut(false);
              // In a real app, this would navigate to auth screen
              console.log("Logged out");
            }, 500);
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };

  const handleLike = (postId: string) => {
    setUserPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const handleToggleComments = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const handleAddComment = (postId: string, comment: Comment) => {
    setUserPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post,
      ),
    );
  };

  return (
    <ScreenLayout
      title="Profile"
      headerRight={
        <TouchableOpacity
          onPress={handleLogout}
          disabled={isLoggingOut}
          className="bg-orange-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white text-sm font-semibold">
            {isLoggingOut ? "..." : "Logout"}
          </Text>
        </TouchableOpacity>
      }
      contentClassName="px-4 py-6"
      scrollViewClassName="flex-1"
    >
      {/* Avatar */}
      <View className="items-center mb-4">
        <Avatar name={user.name} size="lg" />
      </View>

      {/* Name */}
      <View className="items-center mb-4">
        <ThemedText type="defaultSemiBold" className="text-xl">
          {user.name}
        </ThemedText>
      </View>

      {/* Username & Email */}
      <View className="items-center mb-6 gap-1">
        <ThemedText type="small" className="text-gray-500">
          @{user.username}
        </ThemedText>
        <ThemedText type="small" className="text-gray-500">
          {user.email}
        </ThemedText>
      </View>

      {/* Stats Section */}
      <View className="flex-row gap-3 mb-8">
        {/* Posts */}
        <View className="flex-1 items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ThemedText type="defaultSemiBold" className="text-xl">
            {user.posts}
          </ThemedText>
          <ThemedText type="xs" className="text-gray-500 mt-1">
            Posts
          </ThemedText>
        </View>

        {/* Comments */}
        <View className="flex-1 items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ThemedText type="defaultSemiBold" className="text-xl">
            {user.comments}
          </ThemedText>
          <ThemedText type="xs" className="text-gray-500 mt-1">
            Comments
          </ThemedText>
        </View>

        {/* Likes */}
        <View className="flex-1 items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ThemedText type="defaultSemiBold" className="text-xl">
            {user.likes}
          </ThemedText>
          <ThemedText type="xs" className="text-gray-500 mt-1">
            Likes
          </ThemedText>
        </View>
      </View>

      {/* My Posts Section */}
      <View className="mb-6">
        <ThemedText type="defaultSemiBold" className="text-lg mb-4">
          My Posts
        </ThemedText>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isExpanded={expandedPostId === post.id}
              onLike={handleLike}
              onToggleComments={handleToggleComments}
              onAddComment={handleAddComment}
            />
          ))
        ) : (
          <ThemedText
            type="small"
            className="text-gray-500 text-center py-4"
          >
            No posts yet
          </ThemedText>
        )}
      </View>
    </ScreenLayout>
  );
};

export default ProfileTabScreen;

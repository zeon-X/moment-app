import { ScreenLayout } from "@/components/screen-layout";
import { ThemedText } from "@/components/themed-text";
import { NotificationCard } from "@/components/ui/notification-card";
import { Notification } from "@/types/notification";
import React, { useState } from "react";
import { View } from "react-native";

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "like",
    user: { name: "Sarah Johnson", username: "sarah_j" },
    postPreview:
      "Just finished an amazing hike! The views were absolutely stunning.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
  },
  {
    id: "n2",
    type: "comment",
    user: { name: "Alex Chen", username: "alex_chen" },
    postPreview: "Coffee and coding - my favorite combination ☕💻",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
  },
  {
    id: "n3",
    type: "like",
    user: { name: "Emma Williams", username: "emma_w" },
    postPreview: "Love this new design pattern I discovered today!",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    read: true,
  },
  {
    id: "n4",
    type: "comment",
    user: { name: "Michael Brown", username: "m_brown" },
    postPreview: "Weekend project: building a weather app with React Native 🚀",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
  },
  {
    id: "n5",
    type: "like",
    user: { name: "Jessica Lee", username: "jess_lee" },
    postPreview: "First deployment to production - feeling accomplished! 🎉",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
  },
  {
    id: "n6",
    type: "comment",
    user: { name: "David Kim", username: "d_kim" },
    postPreview: "Just learned about TypeScript generics - mind blown 🤯",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: "n7",
    type: "like",
    user: { name: "Rachel Green", username: "r_green" },
    postPreview: "Debugging JavaScript at 2 AM like a pro 💪",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
  },
];

const NotificationTabScreen = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(SAMPLE_NOTIFICATIONS);

  const handleRefresh = async () => {
    // TODO: Fetch new notifications from API
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationPress = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
    );
  };

  return (
    <ScreenLayout
      title="Notifications"
      headerRight={
        unreadCount > 0 && (
          <View className="bg-orange-500 rounded-full px-3 py-1">
            <ThemedText type="xs" className="text-white font-semibold">
              {unreadCount}
            </ThemedText>
          </View>
        )
      }
      contentClassName="px-4 py-4 pb-8"
      onRefresh={handleRefresh}
    >
      {/* Notifications List */}
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onPress={() => handleNotificationPress(notification.id)}
          />
        ))
      ) : (
        <View className="items-center justify-center py-12">
          <ThemedText type="small" className="text-gray-500">
            No notifications yet
          </ThemedText>
        </View>
      )}
    </ScreenLayout>
  );
};

export default NotificationTabScreen;

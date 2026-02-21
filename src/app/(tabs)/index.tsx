import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { type Comment } from "@/components/ui/comments-list";
import { PostCard, type Post } from "@/components/ui/post-card";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    username: "sarah_j",
    content:
      "Just finished an amazing hike! The views were absolutely stunning. Nothing beats getting out in nature on a beautiful day. 🏔️✨",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 234,
    comments: [
      {
        id: "c1",
        author: "Alex Chen",
        username: "alex_chen",
        content: "That looks amazing! Which trail was this?",
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      },
      {
        id: "c2",
        author: "Emma Williams",
        username: "emma_w",
        content: "Love the photography! 📸",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
    liked: false,
  },
  {
    id: "2",
    author: "Alex Chen",
    username: "alex_chen",
    content:
      "Launched my new project today! So excited to share what I've been working on for the past few months. Check it out and let me know what you think!",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 567,
    comments: [
      {
        id: "c3",
        author: "Jessica Lee",
        username: "jess_lee",
        content: "Congratulations! This is awesome 🎉",
        createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
      },
    ],
    liked: true,
  },
  {
    id: "3",
    author: "Emma Williams",
    username: "emma_w",
    content:
      "Coffee tastes better when you're surrounded by good friends. Grateful for these moments. ☕❤️",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 189,
    comments: [],
    liked: false,
  },
  {
    id: "4",
    author: "Michael Brown",
    username: "m_brown",
    content:
      "Weekend plans: catch up on reading that book everyone's been recommending. Any suggestions for what I should read next?",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 98,
    comments: [
      {
        id: "c4",
        author: "David Patel",
        username: "david_p",
        content: "You should read 'Atomic Habits' - game changer!",
        createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
      },
    ],
    liked: false,
  },
  {
    id: "5",
    author: "Jessica Lee",
    username: "jess_lee",
    content:
      "Trying a new recipe today - homemade pasta from scratch! Wish me luck 🍝 Who else loves cooking?",
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    likes: 445,
    comments: [
      {
        id: "c5",
        author: "Sarah Johnson",
        username: "sarah_j",
        content: "Please share the recipe! Looks delicious",
        createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000),
      },
    ],
    liked: false,
  },
  {
    id: "6",
    author: "David Patel",
    username: "david_p",
    content:
      "Sometimes the best ideas come when you're not looking for them. Just had one of those moments! excited to work on this",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    likes: 267,
    comments: [],
    liked: false,
  },
];

export default function HomeScreen() {
  const [filterText, setFilterText] = useState("");
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const filteredPosts = posts.filter((post) =>
    filterText.trim() === ""
      ? true
      : post.username.toLowerCase().includes(filterText.toLowerCase()) ||
        post.author.toLowerCase().includes(filterText.toLowerCase()),
  );

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      }),
    );
  };

  const handleAddComment = (postId: string, comment: Comment) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    );
  };

  const handleToggleComments = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <SafeAreaView
      edges={{ bottom: "off", top: "additive" }}
      style={{ flex: 1 }}
    >
      <ThemedScrollView className="flex-1 px-4 py-4">
        {/* Header */}
        <ThemedText type="title" className="text-2xl mb-4">
          Feed
        </ThemedText>

        {/* Filter Input */}
        <TextInput
          placeholder="Filter by username or name..."
          placeholderTextColor="#999"
          value={filterText}
          onChangeText={setFilterText}
          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-lg mb-6 border border-gray-200 dark:border-gray-700"
        />

        {/* Posts List */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
          <ThemedView className="flex-1 items-center justify-center py-12">
            <ThemedText className="text-gray-500 text-center">
              {`No posts found for "${filterText}"`}
            </ThemedText>
          </ThemedView>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && !filterText && (
          <ThemedView className="flex-1 items-center justify-center py-12">
            <ThemedText className="text-gray-500 text-center">
              No posts yet. Follow users to see their posts!
            </ThemedText>
          </ThemedView>
        )}
      </ThemedScrollView>
    </SafeAreaView>
  );
}

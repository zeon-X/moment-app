import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { MemberCard, type CommunityMember } from "@/components/ui/member-card";
import { SafeAreaView } from "react-native-safe-area-context";

const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "sarah_j",
    age: 28,
    posts: 45,
  },
  {
    id: "2",
    name: "Alex Chen",
    username: "alex_chen",
    age: 25,
    posts: 72,
  },
  {
    id: "3",
    name: "Emma Williams",
    username: "emma_w",
    age: 31,
    posts: 38,
  },
  {
    id: "4",
    name: "Michael Brown",
    username: "m_brown",
    age: 26,
    posts: 61,
  },
  {
    id: "5",
    name: "Jessica Lee",
    username: "jess_lee",
    age: 29,
    posts: 89,
  },
  {
    id: "6",
    name: "David Patel",
    username: "david_p",
    age: 27,
    posts: 52,
  },
  {
    id: "7",
    name: "Olivia Martinez",
    username: "olivia_m",
    age: 24,
    posts: 67,
  },
  {
    id: "8",
    name: "James Wilson",
    username: "james_w",
    age: 30,
    posts: 41,
  },
  {
    id: "9",
    name: "Sofia Garcia",
    username: "sofia_g",
    age: 26,
    posts: 93,
  },
  {
    id: "10",
    name: "Daniel Kim",
    username: "daniel_k",
    age: 28,
    posts: 55,
  },
];

export default function CommunityTabScreen() {
  return (
    <SafeAreaView
      edges={{ bottom: "off", top: "additive" }}
      style={{ flex: 1 }}
    >
      <ThemedScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <ThemedText type="title" className="text-2xl mb-2">
          Community
        </ThemedText>
        <ThemedText className="text-gray-500 mb-6">
          {COMMUNITY_MEMBERS.length} members
        </ThemedText>

        {/* Member List */}
        {COMMUNITY_MEMBERS.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </ThemedScrollView>
    </SafeAreaView>
  );
}

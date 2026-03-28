import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  id: number;
  title: string;
  soal: string;
  waktu: string;
  poin: string;
  badge: string;
  isDone?: boolean;
  onPress: (id: number) => void; // 🔥 langsung di type
};

function formatBadge(badge: string) {
  if (!badge) return "";

  switch (badge.toLowerCase()) {
    case "hots":
      return "🔥 HOTS";
    case "easy":
      return "🟢 EASY";
    case "medium":
      return "🟡 MEDIUM";
    case "hard":
      return "🔴 HARD";
    default:
      return badge;
  }
}

function getBadgeColor(badge: string) {
  switch (badge?.toLowerCase()) {
    case "hots":
      return "#DC2626";
    case "easy":
      return "#16A34A";
    case "medium":
      return "#F59E0B";
    case "hard":
      return "#7C3AED";
    default:
      return "#6B7280";
  }
}

export default function SoalSectionItem({
  id,
  title,
  soal,
  waktu,
  poin,
  badge,
  isDone = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(id)}>
      <Ionicons
        name="checkmark-circle"
        size={20}
        color={isDone ? "#22C55E" : "#D1D5DB"}
        style={{ marginRight: 10 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.meta}>
          <Text style={styles.metaText}>{soal}</Text>
          <Text style={styles.metaText}>⏱ {waktu}</Text>
          <Text style={styles.metaText}>⭐ {poin}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: getBadgeColor(badge) }]}>
          <Text style={styles.badgeText}>{formatBadge(badge)}</Text>
        </View>

        {/* 🔥 OPTIONAL: label selesai */}
        {isDone && <Text style={styles.doneText}>Sudah dikerjakan</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontWeight: "600",
    marginBottom: 4,
  },

  meta: {
    flexDirection: "row",
    gap: 12,
  },

  metaText: {
    fontSize: 12,
    color: "#6B7280",
  },

  badge: {
    alignSelf: "flex-start",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  doneText: {
    fontSize: 12,
    color: "#22C55E",
    marginTop: 4,
    fontWeight: "500",
  },
});

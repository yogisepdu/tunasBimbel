import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  soal: string;
  waktu: string;
  poin: string;
  badge: string;
};

export default function SoalSectionItem({
  title,
  soal,
  waktu,
  poin,
  badge,
}: Props) {
  return (
    <View style={styles.item}>
      <Ionicons
        name="checkmark-circle"
        size={18}
        color="#D1D5DB"
        style={{ marginRight: 10 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.meta}>
          <Text style={styles.metaText}>{soal}</Text>
          <Text style={styles.metaText}>⏱ {waktu}</Text>
          <Text style={styles.metaText}>⭐ {poin}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
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
    backgroundColor: "#DC2626",
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
});

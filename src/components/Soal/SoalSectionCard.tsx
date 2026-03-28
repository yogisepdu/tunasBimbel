import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SoalSectionItem from "./SoalSectionItem";

type Item = {
  id: number;
  title: string;
  soal: string;
  waktu: string;
  poin: string;
  badge: string;
  is_done?: boolean; // ✅ tambah ini
};

type Props = {
  title: string;
  items: Item[];

  totalSoal?: number;
  date?: string;
  icon?: string;
  color?: string;

  onSelect: (id: number) => void;
};

export default function SoalSectionCard({
  title,
  items,
  totalSoal,
  date,
  icon,
  color,
  onSelect,
}: Props) {
  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={[styles.icon, { backgroundColor: color || "#6366F1" }]}>
          <Ionicons name={(icon as any) || "pencil"} size={20} color="#fff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {date && <Text style={styles.date}>{date}</Text>}
        </View>

        {totalSoal !== undefined && (
          <Text style={styles.total}>{totalSoal} Soal</Text>
        )}
      </View>

      {/* ITEMS */}
      {items
        .sort((a, b) => Number(a.is_done) - Number(b.is_done)) // 🔥 belum dikerjakan di atas
        .map((item) => (
          <SoalSectionItem
            key={item.id}
            {...item}
            isDone={item.is_done}
            onPress={onSelect}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 16,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111",
  },

  date: {
    fontSize: 12,
    color: "#6B7280",
  },

  total: {
    fontSize: 12,
    color: "#6B7280",
  },
});

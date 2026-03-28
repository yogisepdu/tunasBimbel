import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EbookType } from "../../types/EbookType";

type Props = {
  item: EbookType;
  onPress?: () => void;
};

export default function EbookListItem({ item, onPress }: Props) {
  const isSoal = item.type === "soal";

  // 🔥 AUTO HANDLE ICON & COLOR
  const iconName = isSoal ? "create" : (item.icon ?? "leaf-outline");

  const bgColor = isSoal ? "#22C55E" : (item.color ?? "#F59E0B");

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* ICON */}
      <View style={[styles.icon, { backgroundColor: bgColor }]}>
        <Ionicons name={iconName as any} size={20} color="#fff" />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        {/* 🔥 FIX: mapel kamu namanya beda */}
        <Text style={styles.subject}>{item.mapel ?? item.subject}</Text>

        {/* 🔥 kalau belum ada tanggal dari API */}
        <Text style={styles.date}>
          {item.date ?? "Senin, 18 Februari 2026"}
        </Text>
      </View>

      {/* RIGHT TEXT */}
      <Text style={styles.duration}>
        {isSoal ? `${item.duration ?? 0} Soal` : (item.duration ?? "-")}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  icon: {
    width: 48, // 🔥 lebih besar
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subject: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
  duration: {
    fontSize: 14,
    color: "#6B7280",
  },
});
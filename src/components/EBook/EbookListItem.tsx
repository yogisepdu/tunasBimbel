import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EbookType } from "../../data/ebookData";

type Props = {
  item: EbookType;
  onPress?: () => void;
};

export default function EbookListItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.icon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={20} color="#fff" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <Text style={styles.duration}>{item.duration}</Text>
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
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subject: {
    fontSize: 14,
    color: "#6B7280",
  },
  date: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
  duration: {
    fontSize: 12,
    color: "#6B7280",
  },
});

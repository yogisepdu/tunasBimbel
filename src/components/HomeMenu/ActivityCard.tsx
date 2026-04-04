import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ActivityCard({ title, subtitle, type, status }) {
  const getIcon = () => {
    switch (type) {
      case "quiz":
        return "play-circle";
      case "materi":
        return "document-text";
      case "event":
        return "calendar";
      default:
        return "ellipse";
    }
  };

  const getStatusStyle = () => {
    switch (status) {
      case "BELUM":
        return styles.statusRed;
      case "LANJUT":
        return styles.statusBlue;
      case "IKUTI":
        return styles.statusGray;
      default:
        return styles.statusGray;
    }
  };

  return (
    <View style={styles.card}>
      {/* ICON */}
      <View style={styles.icon}>
        <Ionicons name={getIcon()} size={20} color="#2563EB" />
      </View>

      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* STATUS */}
      <View style={[styles.status, getStatusStyle()]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 3,
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  statusRed: {
    backgroundColor: "#FEE2E2",
  },

  statusBlue: {
    backgroundColor: "#DBEAFE",
  },

  statusGray: {
    backgroundColor: "#E5E7EB",
  },
});

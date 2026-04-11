import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ActivityCard({ title, progress, type, status }: any) {
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
      case "SELESAI":
        return styles.statusGreen;
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

        {/* 🔥 FIX: gunakan progress langsung */}
        <Text style={styles.subtitle}>Progress: {progress}%</Text>

        {/* 🔥 BONUS: progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
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

  /* 🔥 Progress Bar */
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
  },

  progressFill: {
    height: 6,
    backgroundColor: "#2563EB",
    borderRadius: 10,
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

  statusGreen: {
    backgroundColor: "#DCFCE7",
  },

  statusGray: {
    backgroundColor: "#E5E7EB",
  },
});

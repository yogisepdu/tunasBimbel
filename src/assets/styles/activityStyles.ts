import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ================= ROOT ================= */
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  /* ================= HEADER ================= */
  segmentWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },

  segmentActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  segmentTextActive: {
    marginLeft: 6,
    fontSize: 13,
    color: "#1E3A8A",
    fontWeight: "600",
  },

  /* ================= CARD ================= */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  /* 🔥 ICON MODERN */
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerText: {
    flex: 1,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  meta: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },

  title: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    marginTop: 10,
    fontSize: 13,
    color: "#374151",
    lineHeight: 19,
  },

  /* ================= BADGE ================= */
  badge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
});

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
  },

  /* ===== Segmented Header ===== */

  segmentWrapper: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 18,
    padding: 6,
    marginTop: 40,
    marginBottom: 28,
  },

  segmentActive: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderRadius: 14,
    elevation: 2,
  },

  segmentTextActive: {
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 13,
    color: "#1E3A8A",
  },

  /* ===== Card ===== */

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconOuter: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(16,185,129,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  iconInner: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    flex: 1,
    marginLeft: 14,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  meta: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500",
  },

  badge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#4338CA",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 18,
  },

  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
  },
});

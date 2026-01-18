import { StyleSheet } from "react-native";

export const resultStyles = StyleSheet.create({
  /* ===== Screen ===== */
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  /* ===== Tabs ===== */
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: "#6CCF00",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  tabTextActive: {
    color: "#000",
  },

  /* ===== Card ===== */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },

  /* ===== Score ===== */
  score: {
    fontSize: 40,
    fontWeight: "800",
    color: "#6CCF00",
  },
  status: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 8,
  },
  lulus: { color: "#6CCF00" },
  gagal: { color: "#E53935" },

  /* ===== Statistik ===== */
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  benar: { color: "#4CAF50", fontWeight: "600" },
  salah: { color: "#E53935", fontWeight: "600" },
  kosong: { color: "#999", fontWeight: "600" },

  /* ===== Pembahasan ===== */
  nomor: { fontWeight: "700", marginBottom: 6 },
  soal: { fontWeight: "600", marginBottom: 10 },
  option: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F3F3F3",
    marginBottom: 6,
  },
  correct: { backgroundColor: "#E8F5E9" },
  wrong: { backgroundColor: "#FDECEA" },
  answer: {
    marginTop: 8,
    fontWeight: "600",
    color: "#4CAF50",
  },
});

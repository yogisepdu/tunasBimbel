import { StyleSheet } from "react-native";
import Colors from "../../theme/colors";

export const quizStyles = StyleSheet.create({
  /* ===== Screen ===== */
  screenContainer: {
    flex: 1,
    backgroundColor: "#F6F7F9",
    padding: 16,
  },

  /* ===== Header ===== */
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerExit: {
    padding: 4,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
    paddingVertical: 26,
  },
  headerTimer: {
    color: "red",
    fontWeight: "700",
  },

  /* ===== Question Card ===== */
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardCategory: {
    fontWeight: "600",
  },
  questionText: {
    marginVertical: 12,
    lineHeight: 20,
  },

  /* ===== Option ===== */
  option: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  optionSelected: {
    borderColor: "#7ED957",
    backgroundColor: "#F0FAF3",
  },
  optionLabel: {
    fontWeight: "700",
    marginRight: 8,
  },
  optionText: {
    flex: 1,
  },

  /* ===== Footer ===== */
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  prevBtn: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  nextBtn: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  prevText: {
    color: "#9E9E9E",
    fontWeight: "600",
  },
  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },

  /* ===== Navigation ===== */
  navItem: {
    width: 50,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
  navActive: {
    backgroundColor: "#7ED957",
    borderColor: "#7ED957",
  },
  navAnswered: {
    borderColor: "#7ED957",
  },
});

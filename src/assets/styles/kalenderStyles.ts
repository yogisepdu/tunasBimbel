import { StyleSheet } from "react-native";
import Colors from "../../theme/colors";

export const kalenderStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textDark,
  },
  importantDays: {
    fontSize: 13,
    color: Colors.primary,
  },
  empty: {
    textAlign: "center",
    color: Colors.textLight,
    marginTop: 16,
  },
});

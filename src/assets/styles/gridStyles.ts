import { StyleSheet } from "react-native";
import Colors from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 12,
  },
  item: {
    flex: 1,
    alignItems: "center",
    marginVertical: 12,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  text: {
    fontSize: 11,
    textAlign: "center",
    color: "#333",
    paddingHorizontal: 4,
  },

  /* Badge */
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#22C55E",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeHot: {
    backgroundColor: "#EF4444",
  },
  badgeText: {
    fontSize: 9,
    color: "#fff",
    fontWeight: "bold",
  },
});

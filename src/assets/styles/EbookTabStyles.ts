import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  tab: {
    marginHorizontal: 28,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#9CA3AF",
  },
  textActive: {
    color: "#000",
    fontWeight: "bold",
  },
  underline: {
    marginTop: 6,
    width: 40,
    height: 2,
    backgroundColor: "#000",
  },
});

export default styles;

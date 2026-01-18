import { StyleSheet } from "react-native";
import Colors from "../../theme/colors";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  date: {
    fontSize: 11,
    color: Colors.textLight,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.textDark,
  },
  desc: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 4,
  },
});

export default styles;

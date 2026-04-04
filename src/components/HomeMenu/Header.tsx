import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.avatar}
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.small}>SELAMAT DATANG</Text>
          <Text style={styles.name}>Halo, Yogi 👋</Text>
        </View>
      </View>

      <View style={styles.notif}>
        <Ionicons name="notifications-outline" size={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },

  small: {
    fontSize: 11,
    color: "#94A3B8",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  notif: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
  },
});

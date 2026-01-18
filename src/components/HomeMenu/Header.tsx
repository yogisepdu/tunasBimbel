import { View, Text, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={require("../../assets/logo.png")} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Yogi Sepdu Dehiya</Text>
          <Text style={styles.email}>yogisepdudehiya@gmail.com</Text>
        </View>
      </View>

      <View style={styles.premium}>
        <Text style={{ color: "#F5A623", fontWeight: "bold" }}>👑 Premium</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  email: {
    fontSize: 12,
    color: "#777",
  },
  premium: {
    backgroundColor: "#FFF5E5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
});

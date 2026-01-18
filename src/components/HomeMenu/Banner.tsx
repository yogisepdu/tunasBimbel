import { Image, StyleSheet, View } from "react-native";

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    resizeMode: "cover",
  },
});

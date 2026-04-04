import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TryoutCard({
  title,
  participants,
  image,
  rating = 4.8,
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        <Image
          source={image || require("../../assets/logo.png")}
          style={styles.image}
        />

        {/* RATING */}
        <View style={styles.rating}>
          <Ionicons name="star" size={12} color="#FACC15" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>

        <Text style={styles.sub}>
          Peserta{" "}
          <Text style={{ fontWeight: "600" }}>{participants} Siswa</Text>
        </Text>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mulai</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginRight: 14,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 4,
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 140,
  },

  rating: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
  },

  sub: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 6,
  },

  button: {
    marginTop: 12,
    alignSelf: "flex-end",
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

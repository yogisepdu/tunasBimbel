import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Banner() {
  return (
    <View style={styles.card}>
      <Text style={styles.badge}>Premium Member</Text>

      <Text style={styles.title}>Langganan Premium Sekarang!</Text>

      <Text style={styles.sub}>Dapatkan akses ke 100+ kursus eksklusif</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "#2563EB", fontWeight: "600" }}>Cek Paket</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#2563EB",
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  sub: {
    color: "#E0E7FF",
    marginTop: 6,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
});

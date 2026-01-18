import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  participants: number;
};

export default function TryoutCard({ title, participants }: Props) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{participants} Peserta</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "#fff" }}>Mulai</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  sub: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});

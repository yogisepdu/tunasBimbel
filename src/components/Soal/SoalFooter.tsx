import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  attemptText?: string;
  onStart: () => void;
};

export default function SoalFooter({ onStart }: Props) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Mulai Simulasi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 38, // ✅ NAIKKAN KE ATAS
    left: 16,
    right: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});

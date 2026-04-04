import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Checkbox({ value, onChange }: any) {
  const handleOpenTerms = async () => {
    const url = "https://tunasbimbel.com/syarat-ketentuan"; // 🔥 GANTI SESUAI LINK KAMU

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Tidak bisa membuka link");
    }
  };

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
    >
      {/* CHECKBOX */}
      <TouchableOpacity onPress={() => onChange(!value)}>
        <Ionicons
          name={value ? "checkbox" : "square-outline"}
          size={20}
          color="#2F80ED"
        />
      </TouchableOpacity>

      {/* TEXT */}
      <Text style={{ marginLeft: 10, color: "#555", flex: 1 }}>
        Saya setuju dengan{" "}
        <Text
          style={{ color: "#2F80ED", fontWeight: "600" }}
          onPress={handleOpenTerms}
        >
          Syarat & Ketentuan
        </Text>
      </Text>
    </View>
  );
}

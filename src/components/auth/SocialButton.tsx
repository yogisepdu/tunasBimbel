import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SocialButton({ text, icon }: any) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 14,
        borderRadius: 12,
        marginBottom: 10,
      }}
    >
      <Ionicons name={icon} size={18} />
      <Text style={{ marginLeft: 10 }}>{text}</Text>
    </TouchableOpacity>
  );
}

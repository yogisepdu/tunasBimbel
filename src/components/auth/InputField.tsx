import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InputField({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
}: any) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 6, color: "#555" }}>{label}</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F5F7FA",
          borderRadius: 12,
          paddingHorizontal: 12,
          height: 50,
        }}
      >
        <Ionicons name={icon} size={20} color="#999" />

        <TextInput
          placeholder={placeholder}
          value={value} // ✅ FIX
          onChangeText={onChangeText} // ✅ FIX
          style={{ marginLeft: 10, flex: 1 }}
        />
      </View>
    </View>
  );
}

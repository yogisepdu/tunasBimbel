import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function PasswordField({
  label,
  placeholder,
  value,
  onChangeText,
}: any) {
  const [secure, setSecure] = useState(true);

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
        <Ionicons name="lock-closed-outline" size={20} color="#999" />

        <TextInput
          placeholder={placeholder}
          secureTextEntry={secure}
          value={value} // ✅ FIX
          onChangeText={onChangeText} // ✅ FIX
          style={{ marginLeft: 10, flex: 1 }}
        />

        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Ionicons
            name={secure ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

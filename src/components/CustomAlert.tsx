import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

type Props = {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
};

export default function CustomAlert({
  visible,
  title = "Terjadi Kesalahan",
  message,
  onClose,
}: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#1f2937",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            {title}
          </Text>

          <Text style={{ color: "#9ca3af", marginTop: 8 }}>{message}</Text>

          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 16,
              backgroundColor: "#3b82f6",
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

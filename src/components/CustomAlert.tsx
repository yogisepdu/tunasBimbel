import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void; // 🔥 kalau ada → mode confirm
};

export default function CustomAlert({
  visible,
  title = "Terjadi Kesalahan",
  message,
  onClose,
  onConfirm,
}: Props) {
  const isConfirm = !!onConfirm;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#111827",
            borderRadius: 20,
            padding: 20,
          }}
        >
          {/* ICON */}
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: isConfirm ? "#f59e0b" : "#ef4444",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={isConfirm ? "help" : "alert"}
                size={24}
                color="#fff"
              />
            </View>
          </View>

          {/* TITLE */}
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {title}
          </Text>

          {/* MESSAGE */}
          <Text
            style={{
              color: "#9ca3af",
              marginTop: 8,
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            {message}
          </Text>

          {/* BUTTON */}
          {isConfirm ? (
            // 🔥 CONFIRM MODE (YES / NO)
            <View style={{ flexDirection: "row", marginTop: 18, gap: 10 }}>
              {/* NO */}
              <TouchableOpacity
                onPress={onClose}
                style={{
                  flex: 1,
                  backgroundColor: "#374151",
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "500" }}>Tidak</Text>
              </TouchableOpacity>

              {/* YES */}
              <TouchableOpacity
                onPress={onConfirm}
                style={{
                  flex: 1,
                  backgroundColor: "#ef4444",
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Ya</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // 🔥 ERROR MODE (OK)
            <TouchableOpacity
              onPress={onClose}
              style={{
                marginTop: 18,
                backgroundColor: "#3b82f6",
                paddingVertical: 12,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Mengerti</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

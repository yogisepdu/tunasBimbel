import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type TabType = "video" | "rangkuman" | "kuis";

type Props = {
  active: TabType;
  onChange: (tab: TabType) => void;
};

export default function ChapterTab({ active, onChange }: Props) {
  const tabs: { key: TabType; label: string }[] = [
    { key: "video", label: "Video" },
    { key: "rangkuman", label: "Rangkuman" },
    { key: "kuis", label: "Kuis" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 16,
        backgroundColor: "#f1f3f8",
        borderRadius: 12,
      }}
    >
      {tabs.map((t) => (
        <TouchableOpacity
          key={t.key}
          onPress={() => onChange(t.key)}
          style={{
            flex: 1,
            padding: 12,
            alignItems: "center",
            borderRadius: 12,
            backgroundColor: active === t.key ? "#fff" : "transparent",
          }}
        >
          <Text style={{ fontWeight: "600" }}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

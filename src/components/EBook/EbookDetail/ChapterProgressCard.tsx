import React from "react";
import { View, Text } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  progress: number; // 0 - 100
};

export default function ChapterProgressCard({
  title,
  subtitle,
  progress,
}: Props) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: "#1e2a5a",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
        {title}
      </Text>

      {subtitle && (
        <Text style={{ color: "#cbd5ff", marginTop: 4 }}>{subtitle}</Text>
      )}

      {/* PROGRESS BAR */}
      <View
        style={{
          height: 6,
          backgroundColor: "#3b4ba3",
          borderRadius: 6,
          marginTop: 12,
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: 6,
            backgroundColor: "#fff",
            borderRadius: 6,
          }}
        />
      </View>

      <Text style={{ color: "#fff", marginTop: 8, fontSize: 12 }}>
        {progress}%
      </Text>
    </View>
  );
}

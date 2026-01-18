import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  duration?: string;
  done?: boolean;
  locked?: boolean;
  youtubeId?: string; // ⬅️ baru
  type?: "video" | "rangkuman" | "kuis";
  onPress?: () => void;
};


export default function ChapterTimelineItem({
  title,
  duration,
  done,
  locked,
  youtubeId,
  type,
  onPress,
}: Props) {
  const thumbnailUrl =
    type === "video" && youtubeId
      ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      : undefined;

  return (
    <TouchableOpacity
      disabled={locked || !onPress}
      onPress={onPress}
      style={{
        flexDirection: "row",
        marginBottom: 16,
        alignItems: "flex-start",
      }}
    >
      {/* TIMELINE ICON */}
      <View style={{ alignItems: "center", marginRight: 12 }}>
        <Ionicons
          name={
            locked
              ? "lock-closed"
              : done
              ? "checkmark-circle"
              : "ellipse-outline"
          }
          size={22}
          color={locked ? "#aaa" : done ? "#1e2a5a" : "#ccc"}
        />
        <View
          style={{
            width: 2,
            height: 60,
            backgroundColor: "#e5e7eb",
            marginTop: 4,
          }}
        />
      </View>

      {/* CARD */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 14,
          padding: 10,
          elevation: 2,
          opacity: locked ? 0.6 : 1,
        }}
      >
        {/* THUMBNAIL */}
        <View
          style={{
            width: 80,
            height: 50,
            borderRadius: 8,
            backgroundColor: "#f1f3f8",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            marginRight: 12,
          }}
        >
          {thumbnailUrl ? (
            <Image
              source={{ uri: thumbnailUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <Ionicons
              name={
                type === "video"
                  ? "play-circle"
                  : type === "rangkuman"
                  ? "document-text"
                  : "help-circle"
              }
              size={28}
              color="#1e2a5a"
            />
          )}
        </View>

        {/* TEXT */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 14 }}>{title}</Text>

          {duration && (
            <Text
              style={{
                marginTop: 4,
                color: "#6b7280",
                fontSize: 12,
              }}
            >
              ⏱ {duration}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}


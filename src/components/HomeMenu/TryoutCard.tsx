import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TryoutCard({
  title,
  participants,
  rating,
  locked = false,
  image,
  price,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        width: 240,
        marginRight: 16,
        borderRadius: 20,
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 4,
      }}
    >
      {/* 🔥 IMAGE */}
      <View style={{ height: 130, backgroundColor: "#E5E7EB" }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : null}

        {/* 🔥 BADGE PREMIUM */}
        {locked && (
          <View
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              backgroundColor: "#F59E0B",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Ionicons name="lock-closed" size={12} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 10, fontWeight: "600" }}>
              Premium
            </Text>
          </View>
        )}

        {/* 🔥 DARK OVERLAY */}
        {locked && (
          <View
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.35)",
            }}
          />
        )}
      </View>

      {/* 🔥 CONTENT */}
      <View style={{ padding: 14 }}>
        <Text
          numberOfLines={2}
          style={{
            fontWeight: "700",
            fontSize: 14,
            color: "#111827",
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            fontSize: 11,
            color: "#6B7280",
            marginTop: 6,
          }}
        >
          📚 {participants}
        </Text>

        {/* 🔥 RATING */}
        {!locked && (
          <Text style={{ fontSize: 12, marginTop: 4 }}>⭐ {rating}</Text>
        )}

        {/* 🔥 PRICE */}
        {locked && (
          <Text
            style={{
              marginTop: 8,
              fontSize: 14,
              fontWeight: "700",
              color: "#2563EB",
            }}
          >
            Rp {price?.toLocaleString("id-ID")}
          </Text>
        )}

        {/* 🔥 BUTTON */}
        <TouchableOpacity
          onPress={onPress}
          style={{
            marginTop: 10,
            backgroundColor: locked ? "#2563EB" : "#10B981",
            paddingVertical: 8,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {locked ? "Beli Paket" : "Mulai Belajar"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

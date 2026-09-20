import { Image, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

type TryoutCardProps = {
  title: string;

  participants: string;

  rating: number;

  locked?: boolean;

  image?: string | null;

  price?: number;

  onPress?: () => void;

  fullWidth?: boolean;
};

export default function TryoutCard({
  title,

  participants,

  rating,

  locked = false,

  image,

  price,

  onPress,

  fullWidth = false,
}: TryoutCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={{
        width: fullWidth ? "100%" : 240,

        marginRight: fullWidth ? 0 : 16,

        marginBottom: fullWidth ? 0 : 0,

        borderRadius: 20,

        backgroundColor: "#FFFFFF",

        overflow: "hidden",

        elevation: 4,

        shadowColor: "#000000",

        shadowOffset: {
          width: 0,

          height: 3,
        },

        shadowOpacity: 0.08,

        shadowRadius: 8,
      }}
    >
      {/* ================================================================ */}
      {/* IMAGE                                                            */}
      {/* ================================================================ */}

      <View
        style={{
          height: 150,

          backgroundColor: "#E5E7EB",
        }}
      >
        {image ? (
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: "100%",

              height: "100%",
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              flex: 1,

              alignItems: "center",

              justifyContent: "center",

              backgroundColor: "#E2E8F0",
            }}
          >
            <Ionicons name="book-outline" size={42} color="#94A3B8" />
          </View>
        )}

        {/* ============================================================ */}
        {/* PREMIUM BADGE                                                 */}
        {/* ============================================================ */}

        {locked && (
          <View
            style={{
              position: "absolute",

              top: 10,

              left: 10,

              backgroundColor: "#F59E0B",

              paddingHorizontal: 9,

              paddingVertical: 5,

              borderRadius: 12,

              flexDirection: "row",

              alignItems: "center",

              gap: 5,
            }}
          >
            <Ionicons name="lock-closed" size={12} color="#FFFFFF" />

            <Text
              style={{
                color: "#FFFFFF",

                fontSize: 10,

                fontWeight: "700",
              }}
            >
              Premium
            </Text>
          </View>
        )}

        {/* ============================================================ */}
        {/* IMAGE OVERLAY                                                 */}
        {/* ============================================================ */}

        {locked && (
          <View
            style={{
              position: "absolute",

              top: 0,

              right: 0,

              bottom: 0,

              left: 0,

              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          />
        )}
      </View>

      {/* ================================================================ */}
      {/* CONTENT                                                          */}
      {/* ================================================================ */}

      <View
        style={{
          padding: 15,
        }}
      >
        {/* TITLE */}

        <Text
          numberOfLines={2}
          style={{
            fontWeight: "700",

            fontSize: 15,

            lineHeight: 21,

            color: "#111827",
          }}
        >
          {title}
        </Text>

        {/* PARTICIPANTS */}

        <Text
          style={{
            fontSize: 12,

            color: "#6B7280",

            marginTop: 7,
          }}
        >
          📚 {participants}
        </Text>

        {/* RATING */}

        {!locked && (
          <Text
            style={{
              fontSize: 12,

              marginTop: 5,

              color: "#374151",
            }}
          >
            ⭐ {rating}
          </Text>
        )}

        {/* PRICE */}

        {locked && (
          <Text
            style={{
              marginTop: 9,

              fontSize: 15,

              fontWeight: "700",

              color: "#2563EB",
            }}
          >
            Rp {Number(price ?? 0).toLocaleString("id-ID")}
          </Text>
        )}

        {/* ============================================================ */}
        {/* ACTION BUTTON                                                 */}
        {/* ============================================================ */}

        <View
          style={{
            marginTop: 11,

            backgroundColor: locked ? "#2563EB" : "#10B981",

            paddingVertical: 10,

            borderRadius: 11,

            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",

              fontSize: 13,

              fontWeight: "700",
            }}
          >
            {locked ? "Lihat Paket" : "Beli Paket"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { resultStyles } from "../../assets/styles/resultStyles";
import { getLeaderboard } from "../../services/quizResultService";
import { getSoalLeaderboard } from "../../services/soalService";

type Props = {
  quizId?: number;
  setId?: number; // 🔥 tambah
  currentUser?: string;
};

export default function PeringkatSection({ quizId, setId, currentUser }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        let res;

        if (quizId) {
          res = await getLeaderboard(quizId);
        } else if (setId) {
          res = await getSoalLeaderboard(setId);
        }

        setData(res || []);
      } catch (err) {
        console.log("❌ leaderboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (quizId || setId) fetchLeaderboard();
  }, [quizId, setId]);

  // ================= LOADING =================
  if (loading) {
    return (
      <View style={resultStyles.card}>
        <Text style={resultStyles.cardTitle}>Peringkat</Text>
        <ActivityIndicator />
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={resultStyles.card}>
        <Text style={resultStyles.cardTitle}>Peringkat</Text>
        <Text>Belum ada leaderboard</Text>
      </View>
    );
  }

  // ================= DATA =================
  const top3 = data.slice(0, 3);
  const top10 = data.slice(0, 10);

  const myRank = data.find(
    (item) => item.user_name?.toLowerCase() === currentUser?.toLowerCase(),
  );

  const isInTop10 = top10.some(
    (item) => item.user_name?.toLowerCase() === currentUser?.toLowerCase(),
  );

  // ================= UI =================
  return (
    <View style={resultStyles.card}>
      <Text style={resultStyles.cardTitle}>Peringkat</Text>

      {/* ================= PODIUM MODERN ================= */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {/* 🥈 */}
        {top3[1] && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#F3F4F6",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 14,
                alignItems: "center",
                width: "90%",
              }}
            >
              <Text style={{ fontSize: 18 }}>🥈</Text>
              <Text style={{ fontWeight: "bold", marginTop: 4 }}>
                {top3[1].score}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 12, color: "#6B7280" }}
              >
                {top3[1].user_name}
              </Text>
            </View>
          </View>
        )}

        {/* 🥇 */}
        {top3[0] && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#FEF3C7",
                paddingVertical: 16,
                paddingHorizontal: 12,
                borderRadius: 16,
                alignItems: "center",
                width: "95%",
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 22 }}>🥇</Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                {top3[0].score}
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 13 }}>
                {top3[0].user_name}
              </Text>
            </View>
          </View>
        )}

        {/* 🥉 */}
        {top3[2] && (
          <View style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#FFE4E6",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 14,
                alignItems: "center",
                width: "90%",
              }}
            >
              <Text style={{ fontSize: 18 }}>🥉</Text>
              <Text style={{ fontWeight: "bold", marginTop: 4 }}>
                {top3[2].score}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 12, color: "#6B7280" }}
              >
                {top3[2].user_name}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* ================= TOP 10 LIST ================= */}
      {top10.map((item, index) => {
        const isMe =
          item.user_name?.toLowerCase() === currentUser?.toLowerCase();

        return (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 12,
              backgroundColor: isMe ? "#EEF2FF" : "#F9FAFB",
              marginBottom: 8,
            }}
          >
            <Text style={{ width: 40, fontWeight: "600" }}>#{index + 1}</Text>

            <Text
              style={{
                flex: 1,
                fontWeight: isMe ? "bold" : "500",
              }}
              numberOfLines={1}
            >
              {item.user_name} {isMe && "• Kamu"}
            </Text>

            <Text style={{ fontWeight: "bold" }}>{item.score}</Text>
          </View>
        );
      })}

      {/* ================= POSISI USER ================= */}
      {!isInTop10 && myRank && (
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 10,
              color: "#9CA3AF",
              fontSize: 12,
            }}
          >
            Posisimu
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 12,
              paddingHorizontal: 14,
              borderRadius: 14,
              backgroundColor: "#E0E7FF",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>#{myRank.rank}</Text>

            <Text
              style={{
                flex: 1,
                marginLeft: 10,
                fontWeight: "bold",
              }}
              numberOfLines={1}
            >
              {myRank.user_name}
            </Text>

            <Text style={{ fontWeight: "bold" }}>{myRank.score}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

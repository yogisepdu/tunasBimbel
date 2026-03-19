import { View, Text } from "react-native";
import StatistikTab from "./StatistikTab";
import { resultStyles } from "../../assets/styles/resultStyles";

type Props = {
  score: number;
  isPassed: boolean;
  stats: {
    benar: number;
    salah: number;
    kosong: number;
  };
};

export default function StatistikSection({ score, isPassed, stats }: Props) {
  return (
    <>
      <View style={resultStyles.card}>
        <Text style={resultStyles.cardTitle}>Skor Akhir</Text>
        <Text
          style={[
            resultStyles.score,
            { color: isPassed ? "#4CAF50" : "#F44336" },
          ]}
        >
          {score}
        </Text>
      </View>

      <View style={resultStyles.card}>
        <Text style={resultStyles.cardTitle}>Status Kelulusan</Text>
        <Text
          style={[
            resultStyles.status,
            isPassed ? resultStyles.lulus : resultStyles.gagal,
          ]}
        >
          {isPassed ? "LULUS" : "BELUM LULUS"}
        </Text>
      </View>

      <StatistikTab label="Total" data={stats} />
    </>
  );
}
import { View, Text } from "react-native";
import { resultStyles } from "../../assets/styles/resultStyles";

type Stat = {
  benar: number;
  salah: number;
  kosong: number;
};

type Props = {
  label: string;
  data: Stat;
};

export default function StatistikTab({ label, data }: Props) {
  return (
    <View style={resultStyles.card}>
      <Text style={resultStyles.cardTitle}>{label}</Text>

      <View style={resultStyles.statRow}>
        <Text style={resultStyles.benar}>✔ Benar: {data.benar}</Text>
        <Text style={resultStyles.salah}>✖ Salah: {data.salah}</Text>
        <Text style={resultStyles.kosong}>○ Kosong: {data.kosong}</Text>
      </View>
    </View>
  );
}

import { Text } from "react-native";
import { kalenderStyles as styles } from "../../assets/styles/kalenderStyles";

export default function KalenderSummary({ days }: { days: string[] }) {
  return (
    <>
      <Text style={styles.sectionTitle}>Hari Penting Bulan Ini</Text>
      <Text style={styles.importantDays}>
        {days.length ? days.join(", ") : "Tidak ada agenda"}
      </Text>
    </>
  );
}

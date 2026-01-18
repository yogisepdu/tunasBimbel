import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { kalenderStyles as styles } from "../../assets/styles/kalenderStyles";

type Props = {
  years: number[];
  months: number[];
  selectedYear: number;
  selectedMonth: number;
  onYearChange: (v: number) => void;
  onMonthChange: (v: number) => void;
};

export default function KalenderFilter({
  years,
  months,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: Props) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        selectedValue={selectedYear}
        onValueChange={onYearChange}
      >
        {years.map((y) => (
          <Picker.Item key={y} label={y.toString()} value={y} />
        ))}
      </Picker>

      <Picker
        style={styles.picker}
        selectedValue={selectedMonth}
        onValueChange={onMonthChange}
      >
        {months.map((m) => (
          <Picker.Item key={m} label={m.toString()} value={m} />
        ))}
      </Picker>
    </View>
  );
}

import { FlatList, Text } from "react-native";
import KalenderAgendaItem from "../../components/KalenderAgendaItem";
import { kalenderStyles as styles } from "../../assets/styles/kalenderStyles";
import { AgendaType } from "../../data/kalenderData";

export default function KalenderAgendaList({ data }: { data: AgendaType[] }) {
  return (
    <>
      <Text style={styles.sectionTitle}>Agenda</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <KalenderAgendaItem item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>Tidak ada agenda</Text>}
      />
    </>
  );
}

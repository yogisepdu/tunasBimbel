import { View, Text, StyleSheet } from "react-native";
import SoalSectionItem from "./SoalSectionItem";

type Item = {
  title: string;
  soal: string;
  waktu: string;
  poin: string;
  badge: string;
};

type Props = {
  title: string;
  items: Item[];
};

export default function SoalSectionCard({ title, items }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {items.map((item, index) => (
        <SoalSectionItem key={index} {...item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 16,
    padding: 16,
  },
  title: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 12,
  },
});

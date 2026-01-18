import React from "react";
import { View, Text } from "react-native";

import { AgendaType } from "../data/kalenderData";
import styles from "../assets/styles/KalenderAgendaStyles";

type Props = {
  item: AgendaType;
};

export default function KalenderAgendaItem({ item }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
    </View>
  );
}

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../assets/styles/EbookTabStyles";

type TabType = "materi" | "soal";

type Props = {
  active: TabType;
  onChange: (tab: TabType) => void;
};

const TABS: { key: TabType; label: string }[] = [
  { key: "materi", label: "Materi" },
  { key: "soal", label: "Soal" },
];

export default function EbookTab({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = active === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={styles.tab}
            activeOpacity={0.6}
          >
            <Text style={[styles.text, isActive && styles.textActive]}>
              {tab.label}
            </Text>

            {isActive && <View style={styles.underline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

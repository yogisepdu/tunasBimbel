import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../assets/styles/ProfileStyles";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionLabel}>
        <Text style={styles.sectionLabelText}>{title}</Text>
      </View>
      <View style={styles.card}>{children}</View>
    </View>
  );
};

export default Section;

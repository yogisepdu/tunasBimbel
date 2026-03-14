import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../assets/styles/activityStyles";

const SegmentedHeader: React.FC = () => {
  return (
    <View style={styles.segmentWrapper}>
      <View style={styles.segmentActive}>
        <Ionicons name="notifications" size={16} color="#1E3A8A" />
        <Text style={styles.segmentTextActive}>Pengumuman</Text>
      </View>
    </View>
  );
};

export default SegmentedHeader;

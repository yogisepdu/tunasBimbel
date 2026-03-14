import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../assets/styles/activityStyles";

interface Props {
  category: string;
  date: string;
  title: string;
  description: string;
  isNew?: boolean;
}

const AnnouncementCard: React.FC<Props> = ({
  category,
  date,
  title,
  description,
  isNew,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconOuter}>
          <View style={styles.iconInner}>
            <Ionicons name="megaphone" size={20} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.headerText}>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>
              {category} • {date}
            </Text>

            {isNew && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>BARU</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{title}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default AnnouncementCard;

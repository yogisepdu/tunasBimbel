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
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Ionicons name="megaphone" size={18} color="#2563EB" />
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

      {/* DESCRIPTION */}
      <Text numberOfLines={3} style={styles.description}>
        {description}
      </Text>
    </View>
  );
};

export default AnnouncementCard;

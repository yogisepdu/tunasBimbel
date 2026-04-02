import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../assets/styles/ProfileStyles";

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  isLast?: boolean;
  iconColor?: string; // 🔥 tambahan
  disabled?: boolean; // 🔥 tambahan
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  onPress,
  isLast = false,
  iconColor = "#1F2A44",
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        isLast && styles.lastMenuItem,
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
      activeOpacity={0.6}
      disabled={disabled}
    >
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={22} color={iconColor} />
        <Text style={styles.menuText}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

export default MenuItem;

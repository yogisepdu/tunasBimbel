import React, { memo, useRef } from "react";
import { Text, Pressable, Animated, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MenuItemType } from "../../data/menuData";
import { styles } from "../../assets/styles/gridStyles";

type Props = {
  item: MenuItemType;
  onPress: () => void;
};

function MenuItem({ item, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () =>
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();

  const pressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      android_ripple={{ color: "#E5E7EB" }}
      style={styles.item}
    >
      <Animated.View style={[styles.icon, { transform: [{ scale }] }]}>
        <Ionicons name={item.icon} size={22} color="#fff" />

        {item.badge && (
          <View style={[styles.badge, item.badge === "HOT" && styles.badgeHot]}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </Animated.View>

      <Text style={styles.text}>{item.label}</Text>
    </Pressable>
  );
}

export default memo(MenuItem);

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type HeaderProps = {
  title: string;
  iconName?: string;
};

export default function Header({ title, iconName = "calendar" }: HeaderProps) {
  const navigation = useNavigation<any>(); // <any> supaya TypeScript tidak error

  const handleBack = () => {
    navigation.navigate("MainTabs"); // kembali ke halaman Home/MainTabs
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={28}
            color="#16A34A"
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={{ width: 40 }} />
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
    alignItems: "flex-start",
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChapterHeader({ title }: { title: string }) {
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} />
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 12 }}>
        {title}
      </Text>
    </View>
  );
}

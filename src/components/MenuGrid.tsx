import React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { menus } from "../data/menuData";
import MenuItem from "./MenuGrid/MenuItem";
import { styles } from "../assets/styles/gridStyles";

export default function MenuGrid() {
  const navigation = useNavigation<any>();

  return (
    <FlatList
      data={menus}
      keyExtractor={(item) => item.label}
      numColumns={4}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <MenuItem item={item} onPress={() => navigation.navigate(item.route, item.params)} />
      )}
    />
  );
}

import React, { useState } from "react";
import { FlatList, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { menus, MenuItemType } from "../data/menuData";
import MenuItem from "./MenuGrid/MenuItem";
import { styles } from "../assets/styles/gridStyles";
import { apiFetch } from "../services/api";
import CustomAlert from "./CustomAlert";

export default function MenuGrid() {
  const navigation = useNavigation<any>();

  const [alert, setAlert] = useState({
    visible: false,
    message: "",
  });

  const showError = (message: string) => {
    setAlert({ visible: true, message });
  };

  const openExternalLink = async (key: string) => {
    try {
      const data = await apiFetch(`/links/${key}`);

      if (!data?.url) {
        throw new Error("URL tidak tersedia");
      }

      const supported = await Linking.canOpenURL(data.url);

      if (supported) {
        await Linking.openURL(data.url);
      } else {
        showError("Link tidak bisa dibuka");
      }
    } catch (err: any) {
      if (err.message === "SESSION_EXPIRED") return;

      showError(err.message || "Gagal membuka link");
    }
  };

  const handlePress = (item: MenuItemType) => {
    if (item.externalKey) {
      openExternalLink(item.externalKey);
      return;
    }

    if (item.route) {
      navigation.navigate(item.route, item.params);
    }
  };

  return (
    <>
      <FlatList
        data={menus}
        keyExtractor={(item) => item.label}
        numColumns={4}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <MenuItem item={item} onPress={() => handlePress(item)} />
        )}
      />

      <CustomAlert
        visible={alert.visible}
        message={alert.message}
        onClose={() => setAlert({ visible: false, message: "" })}
      />
    </>
  );
}

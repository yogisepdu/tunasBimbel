import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Header from "../../components/EBook/Header";

export default function MateriDetailScreen() {
  const route = useRoute<any>();
  const { title, pdfUrl } = route.params;

  const driveFileId = pdfUrl.match(/\/d\/([^/]+)/)?.[1];

  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    `https://drive.google.com/uc?export=download&id=${driveFileId}`,
  )}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title={title} icon="book" />

      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: viewerUrl }}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
          onShouldStartLoadWithRequest={(req) => {
            if (!req.url.startsWith("https://docs.google.com")) {
              return false;
            }
            return true;
          }}
          style={{ flex: 1 }}
        />

        {/* 🚫 Block tombol Google */}
        <View
          pointerEvents="auto"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 60,
            height: 60,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

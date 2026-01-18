import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  title: string;
  duration?: string;
  youtubeId?: string;
};

export default function VideoPreviewHeader({
  title,
  duration,
  youtubeId,
}: Props) {
  if (!youtubeId) return null;

  return (
    <View style={styles.wrapper}>
      {/* 🔑 CONTAINER WAJIB */}
      <View style={styles.playerContainer}>
        <WebView
          key={youtubeId} // 🔑 WAJIB
          source={{
            uri: `https://www.youtube.com/embed/${youtubeId}?controls=1&playsinline=1&rel=0`,
          }}
          originWhitelist={["*"]} // 🔑 WAJIB
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
          androidLayerType="hardware" // 🔑 WAJIB ANDROID
          setSupportMultipleWindows={false}
          style={styles.webview}
        />
      </View>

      {/* INFO */}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {duration && <Text style={styles.duration}>⏱ {duration}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  playerContainer: {
    width: "100%",
    height: 220, // 🔑 FIX HEIGHT
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
  },
  info: {
    padding: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  duration: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
  },
});

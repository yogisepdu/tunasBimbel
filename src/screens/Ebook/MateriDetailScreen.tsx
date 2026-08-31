import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import Header from "../../components/EBook/Header";
import { resolveBackendUrl } from "../../services/api";
import { openPrivatePdf } from "../../services/mediaService";

export default function MateriDetailScreen() {
  const route = useRoute<any>();

  const { title, pdfUrl, requiresAuth = false, resourceId } = route.params;

  const [opening, setOpening] = React.useState(false);

  const resolvedPdfUrl = resolveBackendUrl(pdfUrl) ?? "";

  const openPdf = async () => {
    try {
      setOpening(true);

      await openPrivatePdf(resolvedPdfUrl, resourceId);
    } catch (err: any) {
      Alert.alert(
        "Gagal Membuka PDF",
        err?.message ?? "Materi PDF tidak dapat dibuka.",
      );
    } finally {
      setOpening(false);
    }
  };

  if (requiresAuth) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={title} icon="book" />

        <View style={styles.privateBody}>
          <View style={styles.privateCard}>
            <Text style={styles.privateTitle}>Materi PDF Privat</Text>

            <Text style={styles.privateDescription}>
              File ini hanya dapat dibuka dengan akun student yang memiliki
              paket aktif.
            </Text>

            <TouchableOpacity
              disabled={opening}
              style={[
                styles.openButton,
                opening && {
                  opacity: 0.6,
                },
              ]}
              onPress={openPdf}
            >
              {opening ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.openButtonText}>Buka Materi PDF</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const driveFileId = resolvedPdfUrl.match(/\/d\/([^/]+)/)?.[1];

  const viewerUrl = driveFileId
    ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
        `https://drive.google.com/uc?export=download&id=${driveFileId}`,
      )}`
    : resolvedPdfUrl;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} icon="book" />

      <View
        style={{
          flex: 1,
        }}
      >
        <WebView
          source={{
            uri: viewerUrl,
          }}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
          style={{
            flex: 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  privateBody: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F8FAFC",
  },

  privateCard: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 20,
    elevation: 2,
  },

  privateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  privateDescription: {
    marginTop: 10,
    color: "#6B7280",
    lineHeight: 22,
  },

  openButton: {
    marginTop: 24,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },

  openButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});

import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import { Alert, Linking, Platform } from "react-native";

import { getStoredToken, resolveBackendUrl } from "./api";

export async function openPrivatePdf(
  pdfUrl: string,
  resourceId?: number,
): Promise<void> {
  const token = await getStoredToken();

  if (!token) {
    throw new Error("Sesi login tidak tersedia.");
  }

  const resolvedUrl = resolveBackendUrl(pdfUrl);

  if (!resolvedUrl) {
    throw new Error("URL PDF tidak valid.");
  }

  if (!FileSystem.cacheDirectory) {
    throw new Error("Cache directory tidak tersedia.");
  }

  const fileName = `materi-${resourceId ?? Date.now()}.pdf`;

  const destination = `${FileSystem.cacheDirectory}${fileName}`;

  const download = await FileSystem.downloadAsync(resolvedUrl, destination, {
    headers: {
      Accept: "application/pdf",
      Authorization: `Bearer ${token}`,
    },
  });

  if (download.status < 200 || download.status >= 300) {
    throw new Error("PDF gagal diunduh.");
  }

  if (Platform.OS === "android") {
    const contentUri = await FileSystem.getContentUriAsync(download.uri);

    await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      data: contentUri,
      flags: 1,
      type: "application/pdf",
    });

    return;
  }

  const supported = await Linking.canOpenURL(download.uri);

  if (supported) {
    await Linking.openURL(download.uri);

    return;
  }

  Alert.alert(
    "PDF tersimpan",
    "File berhasil diunduh tetapi tidak ada aplikasi yang dapat membukanya.",
  );
}

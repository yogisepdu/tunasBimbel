import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import { getStoredToken, resolveBackendUrl } from "../../../services/api";
import { VideoSourceType } from "../../../types/ChapterType";

type Props = {
  title: string;
  duration?: string;
  sourceType?: VideoSourceType;
  youtubeId?: string | null;
  videoUrl?: string | null;
  requiresAuth?: boolean;
};

function AuthenticatedVideo({
  videoUrl,
  token,
}: {
  videoUrl: string;
  token: string;
}) {
  const source = useMemo(
    () => ({
      uri: videoUrl,
      contentType: "progressive" as const,
      headers: {
        Accept: "video/*",
        Authorization: `Bearer ${token}`,
      },
    }),
    [videoUrl, token],
  );

  const player = useVideoPlayer(source);

  return (
    <VideoView
      style={styles.privateVideo}
      player={player}
      nativeControls
      allowsFullscreen
      contentFit="contain"
    />
  );
}

function PrivateVideo({ videoUrl }: { videoUrl: string }) {
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const value = await getStoredToken();

        if (mounted) {
          setToken(value);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingPlayer}>
        <ActivityIndicator color="#ffffff" />
        <Text style={styles.loadingText}>Menyiapkan video...</Text>
      </View>
    );
  }

  if (!token) {
    return (
      <View style={styles.loadingPlayer}>
        <Text style={styles.loadingText}>Sesi login tidak tersedia.</Text>
      </View>
    );
  }

  return <AuthenticatedVideo videoUrl={videoUrl} token={token} />;
}

export default function VideoPreviewHeader({
  title,
  duration,
  sourceType,
  youtubeId,
  videoUrl,
}: Props) {
  const resolvedVideoUrl = resolveBackendUrl(videoUrl);

  const finalSourceType =
    sourceType ??
    (youtubeId ? "youtube" : resolvedVideoUrl ? "private_file" : undefined);

  const hasYoutube = finalSourceType === "youtube" && Boolean(youtubeId);

  const hasPrivateVideo =
    finalSourceType === "private_file" && Boolean(resolvedVideoUrl);

  if (!hasYoutube && !hasPrivateVideo) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.playerContainer}>
        {hasYoutube ? (
          <WebView
            key={youtubeId!}
            source={{
              uri: `https://www.youtube.com/embed/${youtubeId}?controls=1&playsinline=1&rel=0`,
            }}
            originWhitelist={["*"]}
            javaScriptEnabled
            domStorageEnabled
            allowsFullscreenVideo
            androidLayerType="hardware"
            setSupportMultipleWindows={false}
            style={styles.webview}
          />
        ) : (
          <PrivateVideo videoUrl={resolvedVideoUrl!} />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.sourceBadge}>
            {finalSourceType === "private_file" ? "PRIVATE VIDEO" : "YOUTUBE"}
          </Text>

          {duration && <Text style={styles.duration}>⏱ {duration}</Text>}
        </View>
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
    height: 220,
    backgroundColor: "#000",
  },

  webview: {
    flex: 1,
  },

  privateVideo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },

  loadingPlayer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#111827",
  },

  loadingText: {
    color: "#ffffff",
    fontSize: 12,
  },

  info: {
    padding: 12,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  metaRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sourceBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4F46E5",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
  },

  duration: {
    fontSize: 12,
    color: "#6b7280",
  },
});

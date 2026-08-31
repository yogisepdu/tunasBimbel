import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ChapterHeader,
  ChapterProgressCard,
  ChapterTab,
  ChapterTimelineItem,
} from "../../components/EBook/EbookDetail";
import VideoPreviewHeader from "../../components/EBook/EbookDetail/VideoPreviewHeader";
import { useEbookDetail } from "../../hooks/useEbookDetail";
import { RootStackParamList } from "../../navigation/types";
import { markPdfDone, markVideoDone } from "../../services/progressService";
import { isItemLocked } from "../../utils/ebookLock";

export default function EbookDetailScreen() {
  const route = useRoute<any>();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { chapterId, title, subtitle } = route.params;

  const numericChapterId =
    typeof chapterId === "string"
      ? Number(chapterId.replace("c-", ""))
      : Number(chapterId);

  const {
    tab,
    setTab,
    headerVideo,
    filteredItems,
    chapterItems,
    setActiveVideoId,
    progress,
    loading,
    error,
    markItemDone,
  } = useEbookDetail(numericChapterId);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />

        <Text
          style={{
            marginTop: 8,
          }}
        >
          Memuat materi...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            color: "#DC2626",
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ChapterHeader title={title} />

      <ChapterProgressCard
        title={title}
        subtitle={subtitle}
        progress={progress}
      />

      {headerVideo && (
        <VideoPreviewHeader
          title={headerVideo.title}
          duration={headerVideo.duration}
          sourceType={headerVideo.sourceType}
          youtubeId={headerVideo.youtubeId}
          videoUrl={headerVideo.videoUrl}
          requiresAuth={headerVideo.requiresAuth}
        />
      )}

      <ChapterTab active={tab} onChange={setTab} />

      <FlatList
        data={filteredItems ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 20,
        }}
        renderItem={({ item }) => {
          const isLocked = isItemLocked(item, chapterItems);

          return (
            <ChapterTimelineItem
              title={item.title}
              duration={item.duration}
              done={item.isDone}
              locked={isLocked}
              type={item.type}
              youtubeId={item.youtubeId ?? undefined}
              onPress={async () => {
                if (isLocked) {
                  return;
                }

                try {
                  if (item.type === "video") {
                    setActiveVideoId(item.id);

                    markItemDone(item.id);

                    const videoId =
                      item.resourceId ?? Number(item.id.replace("v-", ""));

                    await markVideoDone(String(numericChapterId), videoId);
                  }

                  if (item.type === "rangkuman") {
                    const pdfId =
                      item.resourceId ?? Number(item.id.replace("r-", ""));

                    await markPdfDone(String(numericChapterId), pdfId);

                    markItemDone(item.id);

                    navigation.navigate("MateriDetail", {
                      title: item.title,
                      pdfUrl: item.pdfUrl ?? "",
                      resourceId: pdfId,
                      requiresAuth: Boolean(item.requiresAuth),
                    });
                  }

                  if (item.type === "kuis") {
                    navigation.navigate("Quiz", {
                      chapterId: String(numericChapterId),
                      source: "quiz",
                    });
                  }
                } catch (err) {
                  console.log("progress error:", err);
                }
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

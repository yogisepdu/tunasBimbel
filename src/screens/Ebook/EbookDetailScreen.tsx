import { useRoute, useNavigation } from "@react-navigation/native";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

import {
  ChapterHeader,
  ChapterProgressCard,
  ChapterTab,
  ChapterTimelineItem,
} from "../../components/EBook/EbookDetail";

import VideoPreviewHeader from "../../components/EBook/EbookDetail/VideoPreviewHeader";

import { useEbookDetail } from "../../hooks/useEbookDetail";
import { isItemLocked } from "../../utils/ebookLock";

import { markVideoDone, markPdfDone } from "../../services/progressService";

export default function EbookDetailScreen() {
  const route = useRoute<any>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { chapterId, title, subtitle } = route.params;

  const {
    tab,
    setTab,
    headerVideo,
    filteredItems,
    chapterItems,
    setActiveVideoId,
    progress,
    loading,
    markItemDone,
  } = useEbookDetail(chapterId);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
          youtubeId={headerVideo.youtubeId}
        />
      )}

      <ChapterTab active={tab} onChange={setTab} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const isLocked = isItemLocked(item, chapterItems);

          return (
            <ChapterTimelineItem
              title={item.title}
              duration={item.duration}
              done={item.isDone}
              locked={isLocked}
              type={item.type}
              youtubeId={item.youtubeId}
              onPress={async () => {
                if (isLocked) return;

                // ================= VIDEO =================

                if (item.type === "video") {
                  setActiveVideoId(item.youtubeId!);

                  markItemDone(item.id); // realtime update

                  const videoId = Number(item.id.replace("v-", ""));

                  markVideoDone(chapterId, videoId); // API background
                }

                // ================= PDF =================

                if (item.type === "rangkuman") {
                  markItemDone(item.id);

                  const pdfId = Number(item.id.replace("r-", ""));

                  markPdfDone(chapterId, pdfId);

                  navigation.navigate("MateriDetail", {
                    title: item.title,
                    pdfUrl: item.pdfUrl!,
                  });
                }

                // ================= QUIZ =================

                if (item.type === "kuis") {
                  const quizId = Number(item.id.replace("q-", ""));

                  navigation.navigate("Quiz", {
                    quizId,
                    chapterId,
                    source: "quiz",
                  });
                }
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

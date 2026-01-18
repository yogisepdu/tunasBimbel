import { useRoute, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
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
    videoItems,
    setActiveVideoId,
    progress,
  } = useEbookDetail(chapterId);

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
              onPress={() => {
                if (isLocked) return;

                if (item.type === "video") {
                  setActiveVideoId(item.youtubeId!);
                }

                if (item.type === "rangkuman") {
                  navigation.navigate("MateriDetail", {
                    title: item.title,
                    pdfUrl: item.pdfUrl!,
                  });
                }

                if (item.type === "kuis") {
                  navigation.navigate("Quiz", {
                    quizId: item.id,
                    chapterId,
                    source: "quiz", // 👈 WAJIB
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

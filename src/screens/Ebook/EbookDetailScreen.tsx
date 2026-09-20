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

  /*
  |--------------------------------------------------------------------------
  | Normalize Chapter ID
  |--------------------------------------------------------------------------
  */

  const numericChapterId =
    typeof chapterId === "string"
      ? Number(chapterId.replace("c-", ""))
      : Number(chapterId);

  /*
  |--------------------------------------------------------------------------
  | Ebook Detail Hook
  |--------------------------------------------------------------------------
  */

  const {
    tab,
    setTab,

    headerVideo,

    filteredItems,

    chapterItems,

    setActiveVideoId,

    progress,

    updateProgressFromServer,

    loading,

    error,

    markItemDone,
  } = useEbookDetail(numericChapterId);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Screen
  |--------------------------------------------------------------------------
  */

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}

      <ChapterHeader title={title} />

      {/* ----------------------------------------------------------------- */}
      {/* Progress                                                          */}
      {/* ----------------------------------------------------------------- */}

      <ChapterProgressCard
        title={title}
        subtitle={subtitle}
        progress={progress}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Video Preview                                                     */}
      {/* ----------------------------------------------------------------- */}

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

      {/* ----------------------------------------------------------------- */}
      {/* Tab                                                               */}
      {/* ----------------------------------------------------------------- */}

      <ChapterTab active={tab} onChange={setTab} />

      {/* ----------------------------------------------------------------- */}
      {/* Items                                                             */}
      {/* ----------------------------------------------------------------- */}

      <FlatList
        data={filteredItems ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 20,
        }}
        renderItem={({ item }) => {
          /*
          |--------------------------------------------------------------------------
          | Lock
          |--------------------------------------------------------------------------
          */

          const isLocked = isItemLocked(item, chapterItems);

          return (
            <ChapterTimelineItem
              title={item.title}
              duration={item.duration}
              done={Boolean(item.isDone)}
              locked={isLocked}
              type={item.type}
              youtubeId={item.youtubeId ?? undefined}
              onPress={async () => {
                /*
                |--------------------------------------------------------------------------
                | Locked
                |--------------------------------------------------------------------------
                */

                if (isLocked) {
                  return;
                }

                try {
                  /*
                  |--------------------------------------------------------------------------
                  | VIDEO
                  |--------------------------------------------------------------------------
                  */

                  if (item.type === "video") {
                    setActiveVideoId(item.id);

                    const videoId =
                      item.resourceId ?? Number(item.id.replace("v-", ""));

                    /*
                    |--------------------------------------------------------------------------
                    | Server terlebih dahulu
                    |--------------------------------------------------------------------------
                    */

                    const result = await markVideoDone(
                      String(numericChapterId),
                      videoId,
                    );

                    markItemDone(item.id);

                    if (result.data) {
                      updateProgressFromServer(result.data.progressPercent);
                    }

                    return;
                  }

                  /*
                  |--------------------------------------------------------------------------
                  | PDF / RANGKUMAN
                  |--------------------------------------------------------------------------
                  */

                  if (item.type === "rangkuman") {
                    const pdfId =
                      item.resourceId ?? Number(item.id.replace("r-", ""));

                    /*
                    |--------------------------------------------------------------------------
                    | Simpan progress ke server
                    |--------------------------------------------------------------------------
                    */

                    const result = await markPdfDone(
                      String(numericChapterId),
                      pdfId,
                    );

                    markItemDone(item.id);

                    if (result.data) {
                      updateProgressFromServer(result.data.progressPercent);
                    }
                    /*
                    |--------------------------------------------------------------------------
                    | Buka PDF
                    |--------------------------------------------------------------------------
                    */

                    navigation.navigate("MateriDetail", {
                      title: item.title,

                      pdfUrl: item.pdfUrl ?? "",

                      resourceId: pdfId,

                      requiresAuth: Boolean(item.requiresAuth),
                    });

                    return;
                  }

                  /*
                  |--------------------------------------------------------------------------
                  | QUIZ
                  |--------------------------------------------------------------------------
                  */

                  if (item.type === "kuis") {
                    navigation.navigate("Quiz", {
                      chapterId: String(numericChapterId),

                      source: "quiz",
                    });

                    return;
                  }
                } catch (err: any) {
                  /*
                  |--------------------------------------------------------------------------
                  | Progress gagal
                  |--------------------------------------------------------------------------
                  |
                  | Jangan tandai item sebagai selesai
                  | jika server gagal.
                  |--------------------------------------------------------------------------
                  */

                  console.error("Progress error:", err);
                }
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

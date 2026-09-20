import { useCallback, useMemo, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { getChapterDetail } from "../services/chapterService";

import { ChapterDetailItem } from "../types/ChapterType";

export function useEbookDetail(chapterId: string | number) {
  /*
  |--------------------------------------------------------------------------
  | Tab
  |--------------------------------------------------------------------------
  */

  const [tab, setTab] = useState<"video" | "rangkuman" | "kuis">("video");

  /*
  |--------------------------------------------------------------------------
  | Chapter Items
  |--------------------------------------------------------------------------
  */

  const [chapterItems, setChapterItems] = useState<ChapterDetailItem[]>([]);

  /*
  |--------------------------------------------------------------------------
  | Active Video
  |--------------------------------------------------------------------------
  */

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | Loading / Error
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | Server Progress
  |--------------------------------------------------------------------------
  */

  const [serverProgress, setServerProgress] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | Load Chapter
  |--------------------------------------------------------------------------
  */

  const load = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const numericId =
        typeof chapterId === "string"
          ? Number(chapterId.replace("c-", ""))
          : Number(chapterId);

      if (!Number.isInteger(numericId) || numericId <= 0) {
        throw new Error("ID chapter tidak valid.");
      }

      const response = await getChapterDetail(numericId);

      /*
      |--------------------------------------------------------------------------
      | Items
      |--------------------------------------------------------------------------
      */

      setChapterItems(response.items);

      /*
      |--------------------------------------------------------------------------
      | Progress dari server
      |--------------------------------------------------------------------------
      */

      setServerProgress(response.progress.percent);

      /*
      |--------------------------------------------------------------------------
      | Video pertama
      |--------------------------------------------------------------------------
      */

      const firstVideo = response.items.find((item) => item.type === "video");

      setActiveVideoId(firstVideo?.id ?? null);
    } catch (err: any) {
      console.error("EbookDetail load error:", err);

      setError(err?.message ?? "Gagal memuat materi.");

      setChapterItems([]);

      setServerProgress(0);

      setActiveVideoId(null);
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  /*
  |--------------------------------------------------------------------------
  | Reload setiap screen kembali aktif
  |--------------------------------------------------------------------------
  */

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  /*
  |--------------------------------------------------------------------------
  | Video Items
  |--------------------------------------------------------------------------
  */

  const videoItems = useMemo(
    () => chapterItems.filter((item) => item.type === "video"),
    [chapterItems],
  );

  /*
  |--------------------------------------------------------------------------
  | Filter Items
  |--------------------------------------------------------------------------
  */

  const filteredItems = useMemo(
    () => chapterItems.filter((item) => item.type === tab),
    [chapterItems, tab],
  );

  /*
  |--------------------------------------------------------------------------
  | Header Video
  |--------------------------------------------------------------------------
  */

  const headerVideo = useMemo(() => {
    if (!videoItems.length) {
      return null;
    }

    if (!activeVideoId) {
      return videoItems[0];
    }

    return (
      videoItems.find((video) => video.id === activeVideoId) ?? videoItems[0]
    );
  }, [activeVideoId, videoItems]);

  /*
  |--------------------------------------------------------------------------
  | Progress
  |--------------------------------------------------------------------------
  */

  const progress = serverProgress;

  /*
  |--------------------------------------------------------------------------
  | Update Progress dari response API
  |--------------------------------------------------------------------------
  */

  const updateProgressFromServer = useCallback((percent: number) => {
    const normalized = Math.max(0, Math.min(100, Number(percent) || 0));

    setServerProgress(normalized);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Mark Item Done
  |--------------------------------------------------------------------------
  */

  const markItemDone = useCallback((itemId: string) => {
    setChapterItems((previous) =>
      previous.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isDone: true,
            }
          : item,
      ),
    );
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return {
    /*
     * Tab
     */
    tab,
    setTab,

    /*
     * Items
     */
    chapterItems,
    filteredItems,
    videoItems,

    /*
     * Header
     */
    headerVideo,

    /*
     * Active video
     */
    activeVideoId,
    setActiveVideoId,

    /*
     * Progress
     */
    progress,
    updateProgressFromServer,

    /*
     * State
     */
    loading,
    error,

    /*
     * Actions
     */
    markItemDone,

    reload: load,
  };
}

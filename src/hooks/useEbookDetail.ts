import { useEffect, useMemo, useState } from "react";
import { getChapterDetail } from "../services/chapterService";
import { ChapterDetailItem } from "../types/ChapterType";

export function useEbookDetail(chapterId: string) {
  const [tab, setTab] = useState<"video" | "rangkuman" | "kuis">("video");
  const [chapterItems, setChapterItems] = useState<ChapterDetailItem[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ================= LOAD DATA =================

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const numericId =
          typeof chapterId === "string"
            ? chapterId.replace("c-", "")
            : chapterId;

        const data = await getChapterDetail(numericId);

        setChapterItems(data || []);
      } catch (e) {
        console.log("chapter detail error:", e);
        setChapterItems([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [chapterId]);

  // ================= FILTER =================

  const videoItems = useMemo(
    () => chapterItems.filter((i) => i.type === "video"),
    [chapterItems],
  );

  const filteredItems = useMemo(
    () => chapterItems.filter((i) => i.type === tab),
    [chapterItems, tab],
  );

  // ================= HEADER VIDEO =================

  const headerVideo = useMemo(() => {
    if (!videoItems.length) return null;

    if (!activeVideoId) return videoItems[0];

    return (
      videoItems.find((v) => v.youtubeId === activeVideoId) || videoItems[0]
    );
  }, [activeVideoId, videoItems]);

  // ================= PROGRESS =================

  const progress = useMemo(() => {
    if (!chapterItems.length) return 0;

    const done = chapterItems.filter((i) => i.isDone).length;

    return Math.round((done / chapterItems.length) * 100);
  }, [chapterItems]);

  // ================= MARK DONE (REALTIME) =================

  const markItemDone = (itemId: string) => {
    setChapterItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isDone: true } : item,
      ),
    );
  };

  return {
    tab,
    setTab,
    chapterItems,
    filteredItems,
    videoItems,
    headerVideo,
    activeVideoId,
    setActiveVideoId,
    progress,
    loading,
    markItemDone,
  };
}

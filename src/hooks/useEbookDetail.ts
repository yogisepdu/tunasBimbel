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
        const data = await getChapterDetail(chapterId);
        setChapterItems(data);
      } catch (e) {
        console.log("chapter detail error:", e);
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
    if (!activeVideoId) return videoItems[0];

    return videoItems.find((v) => v.youtubeId === activeVideoId);
  }, [activeVideoId, videoItems]);

  // ================= PROGRESS =================

  const progress = useMemo(() => {
    const total = chapterItems.length;
    const done = chapterItems.filter((i) => i.isDone).length;

    if (total === 0) return 0;

    return Math.round((done / total) * 100);
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

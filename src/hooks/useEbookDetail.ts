import { useEffect, useMemo, useState } from "react";
import { getChapterDetail } from "../services/chapterService";
import { ChapterDetailItem } from "../types/ChapterType";

export function useEbookDetail(chapterId: string | number) {
  const [tab, setTab] = useState<"video" | "rangkuman" | "kuis">("video");

  const [chapterItems, setChapterItems] = useState<ChapterDetailItem[]>([]);

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const numericId =
          typeof chapterId === "string"
            ? chapterId.replace("c-", "")
            : chapterId;

        const data = await getChapterDetail(numericId);

        if (!mounted) {
          return;
        }

        setChapterItems(data ?? []);

        const firstVideo = (data ?? []).find((item) => item.type === "video");

        setActiveVideoId(firstVideo?.id ?? null);
      } catch (err: any) {
        if (!mounted) {
          return;
        }

        setError(err?.message ?? "Gagal memuat materi.");

        setChapterItems([]);
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
  }, [chapterId]);

  const videoItems = useMemo(
    () => chapterItems.filter((item) => item.type === "video"),
    [chapterItems],
  );

  const filteredItems = useMemo(
    () => chapterItems.filter((item) => item.type === tab),
    [chapterItems, tab],
  );

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

  const progress = useMemo(() => {
    if (!chapterItems.length) {
      return 0;
    }

    const done = chapterItems.filter((item) => item.isDone).length;

    return Math.round((done / chapterItems.length) * 100);
  }, [chapterItems]);

  const markItemDone = (itemId: string) => {
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
    error,
    markItemDone,
  };
}

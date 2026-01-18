import { useEffect, useMemo, useState } from "react";
import { chapterDetailData } from "../data/chapterDetailData";

export function useEbookDetail(chapterId: string) {
  const [tab, setTab] = useState<"video" | "rangkuman" | "kuis">("video");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const chapterItems = useMemo(
    () => chapterDetailData.filter((i) => i.chapterId === chapterId),
    [chapterId],
  );

  const videoItems = useMemo(
    () => chapterItems.filter((i) => i.type === "video"),
    [chapterItems],
  );

  const filteredItems = useMemo(
    () => chapterItems.filter((i) => i.type === tab),
    [chapterItems, tab],
  );

  const headerVideo = useMemo(() => {
    return activeVideoId
      ? videoItems.find((v) => v.youtubeId === activeVideoId)
      : null;
  }, [activeVideoId, videoItems]);

  const progress = useMemo(() => {
    const total = chapterItems.length;
    const done = chapterItems.filter((i) => i.isDone).length;
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, [chapterItems]);

  useEffect(() => {
    if (!activeVideoId && videoItems.length > 0) {
      setActiveVideoId(videoItems[0].youtubeId!);
    }
  }, [activeVideoId, videoItems]);

  return {
    tab,
    setTab,
    activeVideoId,
    setActiveVideoId,
    chapterItems,
    videoItems,
    filteredItems,
    headerVideo,
    progress,
  };
}

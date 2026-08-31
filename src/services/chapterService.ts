import { ChapterDetailItem } from "../types/ChapterType";
import { apiFetch, resolveBackendUrl } from "./api";

export const getChapterDetail = async (
  chapterId: string | number,
): Promise<ChapterDetailItem[]> => {
  const response = await apiFetch(`/chapters/${chapterId}`);

  if (!response || !Array.isArray(response.data)) {
    return [];
  }

  return response.data.map((item: any) => {
    const sourceType =
      item.sourceType ??
      item.source_type ??
      (item.youtubeId || item.youtube_id
        ? "youtube"
        : item.videoUrl || item.video_url
          ? "private_file"
          : undefined);

    return {
      ...item,

      resourceId: item.resourceId ?? item.resource_id,

      sourceType,

      youtubeId: item.youtubeId ?? item.youtube_id ?? null,

      videoUrl: resolveBackendUrl(item.videoUrl ?? item.video_url ?? null),

      pdfUrl: resolveBackendUrl(item.pdfUrl ?? item.pdf_url ?? null),

      requiresAuth: Boolean(item.requiresAuth ?? item.requires_auth ?? false),
    } as ChapterDetailItem;
  });
};

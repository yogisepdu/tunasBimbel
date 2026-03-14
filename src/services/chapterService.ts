import { apiFetch } from "./api";
import { ChapterDetailItem } from "../types/ChapterType";

export const getChapterDetail = async (
  chapterId: string,
): Promise<ChapterDetailItem[]> => {
  const res = await apiFetch(`/chapters/${chapterId}`);

  if (!res || !Array.isArray(res.data)) {
    return [];
  }

  return res.data;
};

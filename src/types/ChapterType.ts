export type ChapterContentType = "video" | "rangkuman" | "kuis";

export type VideoSourceType = "youtube" | "private_file";

export type ChapterDetailItem = {
  id: string;

  resourceId?: number;

  chapterId: string;

  type: ChapterContentType;

  title: string;
  subtitle?: string | null;

  sourceType?: VideoSourceType;

  youtubeId?: string | null;

  videoUrl?: string | null;

  pdfUrl?: string | null;

  requiresAuth?: boolean;

  duration?: string;

  totalQuestion?: number;

  isDone?: boolean;
};

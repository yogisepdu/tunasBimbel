export type ChapterContentType = "video" | "rangkuman" | "kuis";

export type ChapterDetailItem = {
  id: string;
  chapterId: string;
  type: ChapterContentType;

  title: string;
  subtitle?: string;

  youtubeId?: string;
  duration?: string;

  pdfUrl?: string;

  totalQuestion?: number;

  isDone?: boolean;
};

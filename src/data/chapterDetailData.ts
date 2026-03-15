export type ChapterContentType = "video" | "rangkuman" | "kuis";

export type ChapterDetailItem = {
  id: string;
  chapterId: string;
  type: "video" | "rangkuman" | "kuis";

  title: string;
  subtitle?: string;

  // video (YouTube)
  youtubeId?: string;
  duration?: string;

  // rangkuman
  pdfUrl?: string;

  // kuis
  totalQuestion?: number;

  isDone?: boolean;
};

export const chapterDetailData: ChapterDetailItem[] = [
  // ============================
  // Chapter 1: Verbal Ability
  // ============================

  {
    id: "c1-v1",
    chapterId: "1",
    type: "video",
    title: "Verbal Analogi",
    subtitle: "Pengantar Verbal Analogi",
    youtubeId: "GaF4lYBw1VU",
    duration: "09:16",
    isDone: true,
  },
  {
    id: "c1-r1",
    chapterId: "1",
    type: "rangkuman",
    title: "Materi Verbal Analogi",
    pdfUrl:
      "https://drive.google.com/file/d/1Qh3XrFzklFVsVfCdyXRDx1cztINfNmZ9/view?usp=drive_link",
    isDone: true,
  },
  {
    id: "c1-v2",
    chapterId: "1",
    type: "video",
    title: "Verbal Silogisme",
    subtitle: "Pengantar Verbal Silogisme",
    youtubeId: "SHx9p_HsVXI",
    duration: "08:11",
    isDone: true,
  },
  {
    id: "c1-r2",
    chapterId: "1",
    type: "rangkuman",
    title: "Materi Verbal Silogisme",
    pdfUrl:
      "https://drive.google.com/file/d/1Qh3XrFzklFVsVfCdyXRDx1cztINfNmZ9/view?usp=drive_link",
    isDone: true,
  },
  {
    id: "c1-v3",
    chapterId: "1",
    type: "video",
    title: "Antonim & Sinonim",
    subtitle: "Dasar Antonim dan Sinonim",
    youtubeId: "b78RfUCw_fU",
    duration: "07:45",
    isDone: true,
  },
  {
    id: "c1-r3",
    chapterId: "1",
    type: "rangkuman",
    title: "Materi Antonim & Sinonim",
    pdfUrl:
      "https://drive.google.com/file/d/1Qh3XrFzklFVsVfCdyXRDx1cztINfNmZ9/view?usp=drive_link",
    isDone: true,
  },
  {
    id: "c1-v4",
    chapterId: "1",
    type: "video",
    title: "Makna Kata & Istilah",
    subtitle: "Pemahaman Makna Kata",
    youtubeId: "b78RfUCw_fU",
    duration: "08:10",
    isDone: true,
  },
  {
    id: "c1-r4",
    chapterId: "1",
    type: "rangkuman",
    title: "Materi Makna Kata",
    pdfUrl: "https://example.com/pdf/makna-kata",
    isDone: true,
  },
  {
    id: "c1-k1",
    chapterId: "1",
    type: "kuis",
    title: "Kuis Verbal",
    totalQuestion: 10,
    isDone: false,
  },
  // ============================
  // Chapter 2: Numerikal Ability
  // ============================

  {
    id: "c2-v1",
    chapterId: "2",
    type: "video",
    title: "Numerikal Analogi",
    subtitle: "Pengantar Numerikal Analogi",
    youtubeId: "b78RfUCw_fU",
    duration: "09:26",
    isDone: true,
  },
  {
    id: "c2-r1",
    chapterId: "2",
    type: "rangkuman",
    title: "Materi Numerikal Analogi",
    pdfUrl: "https://example.com/pdf/numerikal-analogi",
    isDone: false,
  },
  {
    id: "c2-v2",
    chapterId: "2",
    type: "video",
    title: "Numerikal Silogisme",
    subtitle: "Pengantar Numerikal Silogisme",
    youtubeId: "b78RfUCw_fU",
    duration: "08:22",
    isDone: false,
  },
  {
    id: "c2-r2",
    chapterId: "2",
    type: "rangkuman",
    title: "Materi Numerikal Silogisme",
    pdfUrl: "https://example.com/pdf/numerikal-silogisme",
    isDone: false,
  },
  {
    id: "c2-k1",
    chapterId: "2",
    type: "kuis",
    title: "Kuis Numerikal",
    totalQuestion: 10,
    isDone: false,
  },
];



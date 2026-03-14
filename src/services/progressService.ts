import { apiFetch } from "./api";

export const markVideoDone = (chapterId: string, videoId: number) => {
  return apiFetch("/chapter-progress", {
    method: "POST",
    body: {
      chapter_id: chapterId,
      video_id: videoId,
    },
  });
};

export const markPdfDone = (chapterId: string, pdfId: number) => {
  return apiFetch("/chapter-progress", {
    method: "POST",
    body: {
      chapter_id: chapterId,
      pdf_id: pdfId,
    },
  });
};

export const markQuizDone = (chapterId: string, quizId: number) => {
  return apiFetch("/chapter-progress", {
    method: "POST",
    body: {
      chapter_id: chapterId,
      quiz_id: quizId,
    },
  });
};

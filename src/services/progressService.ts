import { apiFetch } from "./api";

/*
|--------------------------------------------------------------------------
| Progress Response
|--------------------------------------------------------------------------
|
| Response dari:
| POST /api/chapter-progress
|
| Contoh:
|
| {
|   "success": true,
|   "message": "Progress berhasil disimpan.",
|   "data": {
|     "chapterId": "2",
|     "completedVideoIds": [3, 4],
|     "completedPdfIds": [],
|     "completedQuizIds": [],
|     "progressPercent": 67,
|     "status": false
|   }
| }
|
|--------------------------------------------------------------------------
*/

export type ChapterProgressData = {
  chapterId: string;

  completedVideoIds: number[];

  completedPdfIds: number[];

  completedQuizIds: number[];

  progressPercent: number;

  status: boolean;
};

export type ChapterProgressResponse = {
  success: boolean;

  message?: string;

  data?: ChapterProgressData;
};

/*
|--------------------------------------------------------------------------
| Helper: normalize progress response
|--------------------------------------------------------------------------
*/

const normalizeProgressResponse = (response: any): ChapterProgressResponse => {
  const data = response?.data;

  return {
    success: Boolean(response?.success),

    message: response?.message,

    data: data
      ? {
          chapterId: String(data.chapterId ?? data.chapter_id ?? ""),

          completedVideoIds: Array.isArray(data.completedVideoIds)
            ? data.completedVideoIds.map(Number)
            : Array.isArray(data.completed_video_ids)
              ? data.completed_video_ids.map(Number)
              : [],

          completedPdfIds: Array.isArray(data.completedPdfIds)
            ? data.completedPdfIds.map(Number)
            : Array.isArray(data.completed_pdf_ids)
              ? data.completed_pdf_ids.map(Number)
              : [],

          completedQuizIds: Array.isArray(data.completedQuizIds)
            ? data.completedQuizIds.map(Number)
            : Array.isArray(data.completed_quiz_ids)
              ? data.completed_quiz_ids.map(Number)
              : [],

          progressPercent: Math.max(
            0,
            Math.min(
              100,
              Number(data.progressPercent ?? data.progress_percent ?? 0),
            ),
          ),

          status: Boolean(data.status ?? data.completed ?? false),
        }
      : undefined,
  };
};

/*
|--------------------------------------------------------------------------
| Mark Video Done
|--------------------------------------------------------------------------
*/

export const markVideoDone = async (
  chapterId: string,
  videoId: number,
): Promise<ChapterProgressResponse> => {
  const response = await apiFetch("/chapter-progress", {
    method: "POST",

    body: {
      chapter_id: chapterId,
      video_id: videoId,
    },
  });

  return normalizeProgressResponse(response);
};

/*
|--------------------------------------------------------------------------
| Mark PDF Done
|--------------------------------------------------------------------------
*/

export const markPdfDone = async (
  chapterId: string,
  pdfId: number,
): Promise<ChapterProgressResponse> => {
  const response = await apiFetch("/chapter-progress", {
    method: "POST",

    body: {
      chapter_id: chapterId,
      pdf_id: pdfId,
    },
  });

  return normalizeProgressResponse(response);
};

/*
|--------------------------------------------------------------------------
| Mark Quiz Done
|--------------------------------------------------------------------------
*/

export const markQuizDone = async (
  chapterId: number,
  quizId: number,
): Promise<ChapterProgressResponse> => {
  const response = await apiFetch("/chapter-progress", {
    method: "POST",

    body: {
      chapter_id: chapterId,
      quiz_id: quizId,
    },
  });

  return normalizeProgressResponse(response);
};

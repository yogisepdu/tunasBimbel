import { ChapterDetailItem } from "../types/ChapterType";

import { apiFetch, resolveBackendUrl } from "./api";

/*
|--------------------------------------------------------------------------
| Chapter Progress
|--------------------------------------------------------------------------
|
| Data ini mengikuti response dari Laravel:
|
| "progress": {
|     "percent": 67,
|     "status": false,
|     "totalResources": 3,
|     "completedResources": 2,
|     "completedVideoIds": [3,4],
|     "completedPdfIds": [],
|     "completedQuizIds": []
| }
|
*/

export type ChapterProgress = {
  percent: number;
  completed: boolean;

  totalResources?: number;
  completedResources?: number;

  completedVideoIds?: number[];
  completedPdfIds?: number[];
  completedQuizIds?: number[];
};

/*
|--------------------------------------------------------------------------
| Chapter Detail Response
|--------------------------------------------------------------------------
*/

export type ChapterDetailResponse = {
  items: ChapterDetailItem[];
  progress: ChapterProgress;
};

/*
|--------------------------------------------------------------------------
| Get Chapter Detail
|--------------------------------------------------------------------------
*/

export const getChapterDetail = async (
  chapterId: string | number,
): Promise<ChapterDetailResponse> => {
  const response = await apiFetch(`/chapters/${chapterId}`);

  /*
  |--------------------------------------------------------------------------
  | Response tidak valid
  |--------------------------------------------------------------------------
  */

  if (!response || !Array.isArray(response.data)) {
    return {
      items: [],

      progress: {
        percent: 0,
        completed: false,

        totalResources: 0,
        completedResources: 0,

        completedVideoIds: [],
        completedPdfIds: [],
        completedQuizIds: [],
      },
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Normalize chapter items
  |--------------------------------------------------------------------------
  */

  const items = response.data.map((item: any) => {
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

      /*
       * Resource ID
       */
      resourceId: item.resourceId ?? item.resource_id,

      /*
       * Video source
       */
      sourceType,

      youtubeId: item.youtubeId ?? item.youtube_id ?? null,

      videoUrl: resolveBackendUrl(item.videoUrl ?? item.video_url ?? null),

      /*
       * PDF
       */
      pdfUrl: resolveBackendUrl(item.pdfUrl ?? item.pdf_url ?? null),

      /*
       * Authentication
       */
      requiresAuth: Boolean(item.requiresAuth ?? item.requires_auth ?? false),

      /*
       * Progress item
       *
       * Backend sudah mengirim boolean isDone.
       * Kita pertahankan apa adanya.
       */
      isDone: Boolean(item.isDone),
    } as ChapterDetailItem;
  });

  /*
  |--------------------------------------------------------------------------
  | Normalize progress
  |--------------------------------------------------------------------------
  */

  const serverProgress = response.progress ?? {};

  const percent = Math.max(
    0,
    Math.min(100, Number(serverProgress.percent ?? 0)),
  );

  /*
  |--------------------------------------------------------------------------
  | Backend menggunakan "status"
  |
  | Sebelumnya frontend membaca "completed".
  | Itu menyebabkan completed selalu false.
  |--------------------------------------------------------------------------
  */

  const completed = Boolean(
    serverProgress.status ?? serverProgress.completed ?? percent >= 100,
  );

  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return {
    items,

    progress: {
      percent,

      completed,

      totalResources: Number(serverProgress.totalResources ?? 0),

      completedResources: Number(serverProgress.completedResources ?? 0),

      completedVideoIds: Array.isArray(serverProgress.completedVideoIds)
        ? serverProgress.completedVideoIds.map(Number)
        : [],

      completedPdfIds: Array.isArray(serverProgress.completedPdfIds)
        ? serverProgress.completedPdfIds.map(Number)
        : [],

      completedQuizIds: Array.isArray(serverProgress.completedQuizIds)
        ? serverProgress.completedQuizIds.map(Number)
        : [],
    },
  };
};

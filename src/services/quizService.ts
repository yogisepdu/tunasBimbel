import { AssessmentAttemptResponse } from "../types/AssessmentType";
import { apiFetch } from "./api";

export const getQuizQuestions = async (
  chapterId: number,
): Promise<AssessmentAttemptResponse> => {
  return apiFetch<AssessmentAttemptResponse>(`/chapter/${chapterId}/quiz`);
};

export const checkQuizProgress = async (chapterId: number) => {
  return apiFetch(`/quiz-progress/${chapterId}`);
};

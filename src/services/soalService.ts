import {
  AnswerPayload,
  AssessmentAttemptResponse,
  AssessmentSubmitResponse,
} from "../types/AssessmentType";
import { apiFetch } from "./api";

export const getSoalQuestions = async (
  setId: number,
): Promise<AssessmentAttemptResponse> => {
  return apiFetch<AssessmentAttemptResponse>(`/soal-sets/${setId}/questions`);
};

export const saveSoalResult = async (data: {
  attempt_token: string;
  answers: AnswerPayload;
}): Promise<AssessmentSubmitResponse> => {
  return apiFetch<AssessmentSubmitResponse>("/soal-result", {
    method: "POST",
    body: data,
  });
};

export const checkSoalProgress = async (setId: number) => {
  if (!setId) {
    throw new Error("setId tidak valid");
  }

  return apiFetch(`/soal-progress/${setId}`);
};

export const getSoalLeaderboard = async (setId: number) => {
  return apiFetch(`/soal-leaderboard/${setId}`);
};

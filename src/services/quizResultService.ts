import {
  AnswerPayload,
  AssessmentSubmitResponse,
} from "../types/AssessmentType";
import { apiFetch } from "./api";

export const saveQuizResult = async (data: {
  attempt_token: string;
  answers: AnswerPayload;
}): Promise<AssessmentSubmitResponse> => {
  return apiFetch<AssessmentSubmitResponse>("/quiz-result", {
    method: "POST",
    body: data,
  });
};

export const getLeaderboard = async (quizId: number) => {
  return apiFetch(`/leaderboard/${quizId}`);
};

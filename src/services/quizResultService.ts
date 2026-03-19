import { apiFetch } from "./api";

export const saveQuizResult = async (data: {
  quiz_id: number;
  score: number;
  correct: number;
  wrong: number;
  empty: number;
}) => {
  return await apiFetch("/quiz-result", {
    method: "POST",
    body: data,
  });
};

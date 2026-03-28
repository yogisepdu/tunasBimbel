import { apiFetch } from "./api";

export const saveQuizResult = async (data: {
  quiz_id: number;
  score: number;
  correct: number;
  wrong: number;
  empty: number;
  answers: any[]; // 🔥 tambah
}) => {
  return await apiFetch("/quiz-result", {
    method: "POST",
    body: data,
  });
};

export const getLeaderboard = async (quizId: number) => {
  return await apiFetch(`/leaderboard/${quizId}`);
};

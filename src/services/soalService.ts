import { apiFetch } from "./api";

export const saveSoalResult = async (data: any) => {
  return apiFetch("/soal-result", {
    method: "POST",
    body: data, // ✅ sudah benar
  });
};

export const checkSoalProgress = async (setId: number) => {
  if (!setId) {
    throw new Error("setId tidak valid");
  }

  return apiFetch(`/soal-progress/${setId}`);
};

export const getSoalLeaderboard = async (setId: number) => {
  return await apiFetch(`/soal-leaderboard/${setId}`);
};
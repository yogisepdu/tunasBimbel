import { apiFetch } from "./api";

export const getQuizQuestions = async (chapterId: number) => {
  const res = await apiFetch(`/chapter/${chapterId}/quiz`);

  if (!res) {
    return {
      quiz_id: null,
      title: "",
      duration: 0,
      questions: [],
    };
  }

  return res;
};

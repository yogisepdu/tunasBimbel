// utils/statisticHelper.ts
export function calculateStatistics(
  questions: any[],
  answers: { questionId: number; selectedAnswer?: string }[],
) {
  let benar = 0;
  let salah = 0;
  let kosong = 0;

  questions.forEach((q, index) => {
    const id = q.id ?? index + 1;
    const answer = answers.find((a) => a.questionId === id);

    if (!answer || !answer.selectedAnswer) {
      kosong++;
    } else if (answer.selectedAnswer === q.correctAnswer) {
      benar++;
    } else {
      salah++;
    }
  });

  return {
    benar,
    salah,
    kosong,
  };
}

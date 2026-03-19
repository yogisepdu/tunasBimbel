export const calculateStatistics = (questions: any[], userAnswers: any[]) => {
  let benar = 0;
  let salah = 0;
  let kosong = 0;

  // 🔥 mapping jawaban biar cepat & akurat
  const answerMap = Object.fromEntries(
    userAnswers.map((a) => [a.questionId, a.selectedAnswer]),
  );

  questions.forEach((q) => {
    const user = answerMap[q.id];

    // support 2 format API
    const correct = q.correctAnswer ?? q.correct_answer;

    if (!user) {
      kosong++;
    } else if (user === correct) {
      benar++;
    } else {
      salah++;
    }
  });

  return { benar, salah, kosong };
};

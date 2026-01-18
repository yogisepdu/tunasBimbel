export type QuizQuestion = {
  text: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
};

export const soalDummy: QuizQuestion[] = [
  {
    text: "Berapakah hasil dari sin 30°?",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "√3/2" },
      { key: "C", text: "1" },
      { key: "D", text: "0" },
    ],
    correctAnswer: "A",
  },
  {
    text: "Jika cos 0° = ...?",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "-1" },
      { key: "D", text: "½" },
    ],
    correctAnswer: "B",
  },
];

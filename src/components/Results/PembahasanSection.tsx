import PembahasanItem from "./PembahasanItem";

type Props = {
  questions: any[];
  userAnswers: any[];
};

export default function PembahasanSection({ questions, userAnswers }: Props) {
  // 🔥 mapping cepat & aman
  const answerMap = Object.fromEntries(
    userAnswers.map((a: any) => [a.questionId, a.selectedAnswer]),
  );

  return (
    <>
      {questions.map((q: any, index: number) => (
        <PembahasanItem
          key={q.id ?? index}
          nomor={index + 1}
          question={q}
          userAnswer={answerMap[q.id]}
        />
      ))}
    </>
  );
}

import PembahasanItem from "./PembahasanItem";

type Props = {
  questions: any[];
  userAnswers: any[];
};

export default function PembahasanSection({ questions, userAnswers }: Props) {
  return (
    <>
      {questions.map((q: any, index: number) => (
        <PembahasanItem
          key={index}
          nomor={index + 1}
          question={q}
          userAnswer={
            userAnswers.find((a) => a.questionId === (q.id ?? index + 1))
              ?.selectedAnswer
          }
        />
      ))}
    </>
  );
}

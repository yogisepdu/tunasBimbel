import { Text, View } from "react-native";
import { resultStyles } from "../../assets/styles/resultStyles";
import {
  AssessmentQuestion,
  AssessmentReviewItem,
} from "../../types/AssessmentType";
import PembahasanItem from "./PembahasanItem";

type Props = {
  questions: AssessmentQuestion[];
  review: AssessmentReviewItem[];
};

export default function PembahasanSection({ questions, review }: Props) {
  if (!questions.length || !review.length) {
    return (
      <View style={resultStyles.card}>
        <Text style={resultStyles.cardTitle}>Pembahasan</Text>

        <Text>
          Pembahasan lengkap tersedia setelah submit attempt terbaru. Hasil lama
          tetap dapat melihat skor dan peringkat.
        </Text>
      </View>
    );
  }

  const reviewMap = Object.fromEntries(
    review.map((item) => [item.question_id, item]),
  );

  return (
    <>
      {questions.map((question, index) => {
        const item = reviewMap[question.id];

        return (
          <PembahasanItem
            key={question.id}
            nomor={index + 1}
            question={question}
            userAnswer={item?.selected_answer}
            correctAnswer={item?.correct_answer}
          />
        );
      })}
    </>
  );
}

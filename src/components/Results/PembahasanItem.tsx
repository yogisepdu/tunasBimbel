import { Text, View } from "react-native";
import { resultStyles } from "../../assets/styles/resultStyles";
import { AssessmentQuestion } from "../../types/AssessmentType";

type Props = {
  question: AssessmentQuestion;
  userAnswer?: string | null;
  correctAnswer?: string | null;
  nomor: number;
};

export default function PembahasanItem({
  question,
  userAnswer,
  correctAnswer,
  nomor,
}: Props) {
  return (
    <View style={resultStyles.card}>
      <Text style={resultStyles.nomor}>Soal {nomor}</Text>

      <Text style={resultStyles.soal}>{question.text}</Text>

      {question.options.map((option) => {
        const isCorrect = option.key === correctAnswer;

        const isUser = option.key === userAnswer;

        return (
          <View
            key={option.key}
            style={[
              resultStyles.option,
              isCorrect && resultStyles.correct,
              isUser && !isCorrect && resultStyles.wrong,
            ]}
          >
            <Text>
              {option.key}. {option.text}
            </Text>
          </View>
        );
      })}

      {!userAnswer && (
        <Text
          style={{
            color: "gray",
            marginTop: 5,
          }}
        >
          Tidak dijawab
        </Text>
      )}

      {correctAnswer ? (
        <Text style={resultStyles.answer}>Jawaban benar: {correctAnswer}</Text>
      ) : (
        <Text
          style={{
            color: "#6B7280",
            marginTop: 8,
          }}
        >
          Kunci jawaban tidak tersedia untuk hasil lama.
        </Text>
      )}
    </View>
  );
}

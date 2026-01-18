import { View, Text } from "react-native";
import { resultStyles } from "../../assets/styles/resultStyles";

type Props = {
  question: any;
  userAnswer?: string;
  nomor: number;
};

export default function PembahasanItem({ question, userAnswer, nomor }: Props) {
  return (
    <View style={resultStyles.card}>
      <Text style={resultStyles.nomor}>Soal {nomor}</Text>
      <Text style={resultStyles.soal}>{question.text}</Text>

      {question.options.map((opt: any) => {
        const isCorrect = opt.key === question.correctAnswer;
        const isUser = opt.key === userAnswer;

        return (
          <View
            key={opt.key}
            style={[
              resultStyles.option,
              isCorrect && resultStyles.correct,
              isUser && !isCorrect && resultStyles.wrong,
            ]}
          >
            <Text>
              {opt.key}. {opt.text}
            </Text>
          </View>
        );
      })}

      <Text style={resultStyles.answer}>
        Jawaban benar: {question.correctAnswer}
      </Text>
    </View>
  );
}

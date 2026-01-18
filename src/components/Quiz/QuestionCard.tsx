import { View, Text } from "react-native";
import OptionItem from "./OptionItem";
import { quizStyles } from "../../assets/styles/quizStyles";

export default function QuestionCard({
  question,
  index,
  total,
  selectedAnswer,
  onSelect,
}: any) {
  return (
    <View style={quizStyles.card}>
      <View style={quizStyles.cardHeader}>
        <Text>
          Soal {index + 1} dari {total}
        </Text>
        <Text style={quizStyles.cardCategory}>
          {question.category}
          {question.subCategory ? ` ${question.subCategory}` : ""}
        </Text>
      </View>

      <Text style={quizStyles.questionText}>{question.text}</Text>

      {question.options.map((opt: any) => (
        <OptionItem
          key={opt.key}
          label={opt.key}
          text={opt.text}
          selected={selectedAnswer === opt.key}
          onPress={() => onSelect(opt.key)}
        />
      ))}
    </View>
  );
}

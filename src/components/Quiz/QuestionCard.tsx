import { View, Text, Image } from "react-native";
import OptionItem from "./OptionItem";
import { quizStyles } from "../../assets/styles/quizStyles";
import { storageUrl } from "../../services/api";

export default function QuestionCard({
  question,
  index,
  total,
  selectedAnswer,
  onSelect,
}: any) {
  const imageUri = question.image ? storageUrl(question.image) : null;

  // console.log("IMAGE URL:", imageUri);

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

      <Image
        source={{ uri: imageUri }}
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 1.6,
        }}
        resizeMode="contain"
        onError={(e) => {
          console.log("IMAGE LOAD ERROR:", imageUri);
        }}
      />

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

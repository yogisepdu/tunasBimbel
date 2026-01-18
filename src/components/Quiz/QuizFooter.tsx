import { View, Text, TouchableOpacity } from "react-native";
import { quizStyles } from "../../assets/styles/quizStyles";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  isFirst?: boolean;
  isLast?: boolean;
};

export default function QuizFooter({
  onPrev,
  onNext,
  isFirst = false,
  isLast = false,
}: Props) {
  return (
    <View style={quizStyles.footerContainer}>
      <TouchableOpacity
        style={[quizStyles.prevBtn, isFirst && quizStyles.disabled]}
        onPress={onPrev}
        disabled={isFirst}
      >
        <Text style={quizStyles.prevText}>Previous</Text>
      </TouchableOpacity>

      <TouchableOpacity style={quizStyles.nextBtn} onPress={onNext}>
        <Text style={quizStyles.nextText}>{isLast ? "Submit" : "Next"}</Text>
      </TouchableOpacity>
    </View>
  );
}

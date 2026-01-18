import { TouchableOpacity, Text } from "react-native";
import { quizStyles } from "../../assets/styles/quizStyles";

export default function OptionItem({ label, text, selected, onPress }: any) {
  return (
    <TouchableOpacity
      style={[quizStyles.option, selected && quizStyles.optionSelected]}
      onPress={onPress}
    >
      <Text style={quizStyles.optionLabel}>{label}.</Text>
      <Text style={quizStyles.optionText}>{text}</Text>
    </TouchableOpacity>
  );
}

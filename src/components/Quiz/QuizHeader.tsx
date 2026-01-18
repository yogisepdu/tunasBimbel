import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { quizStyles } from "../../assets/styles/quizStyles";

type Props = {
  title: string;
  timeLeft: number;
  onExit: () => void;
};

export default function QuizHeader({ title, timeLeft, onExit }: Props) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={quizStyles.headerContainer}>
      <TouchableOpacity onPress={onExit} style={quizStyles.headerExit}>
        <Ionicons name="arrow-back" size={22} />
      </TouchableOpacity>

      <Text style={quizStyles.headerTitle}>{title}</Text>

      <Text style={quizStyles.headerTimer}>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </Text>
    </View>
  );
}

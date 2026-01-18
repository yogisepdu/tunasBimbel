import { FlatList, TouchableOpacity, Text } from "react-native";
import { quizStyles } from "../../assets/styles/quizStyles";

export default function QuizNavigation({
  total,
  current,
  answers,
  onSelect,
}: any) {
  return (
    <FlatList
      data={Array.from({ length: total }, (_, i) => i)}
      numColumns={5}
      keyExtractor={(i) => i.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            quizStyles.navItem,
            item === current && quizStyles.navActive,
            answers[item] && quizStyles.navAnswered,
          ]}
          onPress={() => onSelect(item)}
        >
          <Text style={item === current && { color: "#fff" }}>{item + 1}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

import { View, Alert, Text, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import * as ScreenCapture from "expo-screen-capture";
import { useEffect, useRef } from "react";

import { useQuiz } from "../../hooks/useQuiz";
import QuizHeader from "../../components/Quiz/QuizHeader";
import QuestionCard from "../../components/Quiz/QuestionCard";
import QuizFooter from "../../components/Quiz/QuizFooter";
import QuizNavigation from "../../components/Quiz/QuizNavigation";
import { quizStyles } from "../../assets/styles/quizStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export default function QuizScreen({ route, navigation }: Props) {
  const { chapterId, source } = route.params;

  const hasFinished = useRef(false);

  const quiz = useQuiz(chapterId, source, (result) => {
    navigation.replace("Result", result);
  });

  // 🔒 Prevent Screenshot
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const handleSubmitConfirm = () => {
    Alert.alert("Submit Quiz", "Yakin ingin mengakhiri quiz?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Submit",
        style: "destructive",
        onPress: () => {
          if (hasFinished.current) return;

          hasFinished.current = true;

          const result = quiz.submitQuiz();

          navigation.replace("Result", result);
        },
      },
    ]);
  };

  // ================= LOADING =================

  if (quiz.total === 0 || !quiz.question) {
    return (
      <View
        style={[
          quizStyles.screenContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Memuat soal...</Text>
      </View>
    );
  }

  // ================= UI =================

  return (
    <View style={quizStyles.screenContainer}>
      <QuizHeader
        title={quiz.meta.title || "Quiz"}
        timeLeft={quiz.timeLeft}
        onExit={handleSubmitConfirm}
      />

      <QuestionCard
        question={quiz.question}
        index={quiz.currentIndex}
        total={quiz.total}
        selectedAnswer={quiz.answers[quiz.currentIndex] ?? null}
        onSelect={quiz.selectAnswer}
      />

      <QuizFooter
        isFirst={quiz.currentIndex === 0}
        isLast={quiz.currentIndex === quiz.total - 1}
        onPrev={() => quiz.setCurrentIndex((i: number) => Math.max(i - 1, 0))}
        onNext={() => {
          if (quiz.currentIndex === quiz.total - 1) {
            handleSubmitConfirm();
          } else {
            quiz.setCurrentIndex((i: number) => i + 1);
          }
        }}
      />

      <QuizNavigation
        total={quiz.total}
        current={quiz.currentIndex}
        answers={quiz.answers}
        onSelect={quiz.setCurrentIndex}
      />
    </View>
  );
}

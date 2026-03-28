import React, { useEffect, useRef, useState } from "react";
import { View, Alert, Text, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import * as ScreenCapture from "expo-screen-capture";

import { useQuiz } from "../../hooks/useQuiz";
import QuizHeader from "../../components/Quiz/QuizHeader";
import QuestionCard from "../../components/Quiz/QuestionCard";
import QuizFooter from "../../components/Quiz/QuizFooter";
import QuizNavigation from "../../components/Quiz/QuizNavigation";
import { quizStyles } from "../../assets/styles/quizStyles";

import { checkQuizProgress } from "../../services/quizService";
import { saveQuizResult } from "../../services/quizResultService";
import { markQuizDone } from "../../services/progressService";
import { checkSoalProgress, saveSoalResult } from "../../services/soalService";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export default function QuizScreen({ route, navigation }: Props) {
  const { chapterId, source, setId } = route.params;

  const hasFinished = useRef(false);

  const [checking, setChecking] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  // ================= FIX ID =================
  const numericChapterId =
    typeof chapterId === "string"
      ? Number(chapterId.replace("c-", ""))
      : chapterId;

  const soalSetId = setId ?? null;

  // 🔥 VALIDASI ID
  const activeId = source === "soal" ? soalSetId : numericChapterId;

  // console.log("🔥 PARAMS:", {
  //   chapterId,
  //   setId,
  //   source,
  // });

  // ================= QUIZ HOOK =================
  const quiz = useQuiz(activeId, source, (result) => {
    navigation.replace("Result", {
      ...result,
      chapterId: numericChapterId, // 🔥 WAJIB
      setId: soalSetId,
    });
  });

  // ================= CEK PROGRESS =================
  useEffect(() => {
    const checkProgress = async () => {
      try {
        let res;

        if (source === "quiz") {
          if (!numericChapterId) return;
          res = await checkQuizProgress(numericChapterId);
        } else {
          if (!soalSetId) return;
          res = await checkSoalProgress(soalSetId);
        }

        if (res?.has_done && res?.result) {
          const resultSetId = Number(res.result.soal_set_id);

          // 🔥 WAJIB SAMA
          if (source === "soal" && resultSetId !== soalSetId) {
            console.log("⛔ beda setId, jangan redirect");
            return;
          }

          setRedirecting(true);

          navigation.replace("Result", {
            quizId: res.result.quiz_id, // ✅ BENAR
            chapterId: numericChapterId, // 🔥 INI WAJIB
            setId: soalSetId,
            source,
            title: quiz.meta?.title ?? "Hasil",
            total: quiz.total ?? 0,
            correct: res.result.correct,
            wrong: res.result.wrong,
            empty: res.result.empty,
            score: res.result.score,
            userAnswers: (res.result.answers || []).map((a: any) => ({
              questionId: a.questionId ?? a.question_id,
              selectedAnswer: a.selectedAnswer ?? a.answer,
            })),
          });

          // console.log("🔥 CHECK PROGRESS:", {
          //   currentSetId: soalSetId,
          //   resultSetId: res?.result?.soal_set_id,
          // });
        }
      } catch (err) {
        console.log("check progress error:", err);
      } finally {
        setChecking(false);
      }
    };

    checkProgress();
  }, [source, soalSetId, numericChapterId]);

  // ================= SCREENSHOT BLOCK =================
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();
    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  // ================= LOADING =================
  if (checking || redirecting) {
    return (
      <View style={quizStyles.screenContainer}>
        <ActivityIndicator />
        <Text>
          {redirecting ? "Mengalihkan ke hasil..." : "Cek progress..."}
        </Text>
      </View>
    );
  }

  // ================= SUBMIT =================
  const handleSubmitConfirm = () => {
    Alert.alert("Submit", "Yakin ingin mengakhiri?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Submit",
        style: "destructive",
        onPress: async () => {
          if (hasFinished.current) return;

          hasFinished.current = true;

          const result = quiz.submitQuiz();

          try {
            if (source === "quiz") {
              await saveQuizResult({
                quiz_id: result.quizId,
                score: result.score,
                correct: result.correct,
                wrong: result.wrong,
                empty: result.empty,
                answers: result.userAnswers,
              });

              await markQuizDone(numericChapterId, result.quizId);
            }

            if (source === "soal") {
              if (!result.quizId) {
                console.log("❌ soal_set_id kosong saat submit");
                return;
              }

              await saveSoalResult({
                soal_set_id: result.quizId,
                score: result.score,
                correct: result.correct,
                wrong: result.wrong,
                empty: result.empty,
                answers: result.userAnswers,
              });
            }
          } catch (err) {
            console.log("❌ save error:", err);
          }

          navigation.replace("Result", {
            ...result,
            chapterId: numericChapterId, // 🔥 WAJIB
            setId: soalSetId, // 🔥 WAJIB TAMBAH INI
          });
        },
      },
    ]);
  };

  // ================= LOAD SOAL =================
  if (!quiz.question) {
    return (
      <View style={quizStyles.screenContainer}>
        <ActivityIndicator />
        <Text>Memuat soal...</Text>
      </View>
    );
  }

  // ================= UI =================
  return (
    <View style={quizStyles.screenContainer}>
      <QuizHeader
        title={quiz.meta.title}
        timeLeft={quiz.timeLeft}
        onExit={handleSubmitConfirm}
      />

      <QuestionCard
        question={quiz.question}
        index={quiz.currentIndex}
        total={quiz.total}
        selectedAnswer={quiz.answers[quiz.currentIndex]}
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

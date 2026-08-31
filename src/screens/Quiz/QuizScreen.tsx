import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ScreenCapture from "expo-screen-capture";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

import { quizStyles } from "../../assets/styles/quizStyles";
import QuestionCard from "../../components/Quiz/QuestionCard";
import QuizFooter from "../../components/Quiz/QuizFooter";
import QuizHeader from "../../components/Quiz/QuizHeader";
import QuizNavigation from "../../components/Quiz/QuizNavigation";
import { useQuiz } from "../../hooks/useQuiz";
import { RootStackParamList } from "../../navigation/types";
import { markQuizDone } from "../../services/progressService";
import { saveQuizResult } from "../../services/quizResultService";
import { checkQuizProgress } from "../../services/quizService";
import { checkSoalProgress, saveSoalResult } from "../../services/soalService";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export default function QuizScreen({ route, navigation }: Props) {
  const { chapterId, source, setId } = route.params;

  const numericChapterId =
    typeof chapterId === "string"
      ? Number(chapterId.replace("c-", ""))
      : Number(chapterId ?? 0);

  const soalSetId = Number(setId ?? 0);

  const activeId = source === "soal" ? soalSetId : numericChapterId;

  const [checkingProgress, setCheckingProgress] = useState(true);

  const [redirecting, setRedirecting] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const hasFinished = useRef(false);

  const quiz = useQuiz(activeId, source, !checkingProgress && !redirecting);

  useEffect(() => {
    const checkProgress = async () => {
      try {
        let response;

        if (source === "quiz") {
          if (!numericChapterId) {
            return;
          }

          response = await checkQuizProgress(numericChapterId);
        } else {
          if (!soalSetId) {
            return;
          }

          response = await checkSoalProgress(soalSetId);
        }

        if (response?.has_done && response?.result) {
          setRedirecting(true);

          const result = response.result;

          const answerObject = result.answers ?? {};

          const userAnswers = Array.isArray(answerObject)
            ? answerObject.map((item: any) => ({
                questionId: Number(item.questionId ?? item.question_id ?? 0),
                selectedAnswer:
                  item.selectedAnswer ??
                  item.selected_answer ??
                  item.answer ??
                  undefined,
              }))
            : Object.entries(answerObject).map(
                ([questionId, selectedAnswer]) => ({
                  questionId: Number(questionId),
                  selectedAnswer: selectedAnswer
                    ? String(selectedAnswer)
                    : undefined,
                }),
              );

          navigation.replace("Result", {
            source,
            chapterId: numericChapterId,
            quizId: Number(result.quiz_id ?? 0),
            setId: source === "soal" ? soalSetId : undefined,
            title: source === "soal" ? "Hasil Try Out" : "Hasil Quiz",
            total:
              Number(result.correct ?? 0) +
              Number(result.wrong ?? 0) +
              Number(result.empty ?? 0),
            correct: Number(result.correct ?? 0),
            wrong: Number(result.wrong ?? 0),
            empty: Number(result.empty ?? 0),
            score: Number(result.score ?? 0),
            userAnswers,
            questions: [],
            review: [],
          });
        }
      } catch (err) {
        console.log("check progress error:", err);
      } finally {
        setCheckingProgress(false);
      }
    };

    checkProgress();
  }, [source, soalSetId, numericChapterId, navigation]);

  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const submitToServer = async () => {
    if (hasFinished.current || submitting) {
      return;
    }

    if (!quiz.meta.attemptToken) {
      Alert.alert(
        "Belum siap",
        "Attempt belum tersedia. Silakan tunggu soal selesai dimuat.",
      );

      return;
    }

    hasFinished.current = true;

    setSubmitting(true);

    try {
      const answers = quiz.buildAnswerPayload();

      const response =
        source === "quiz"
          ? await saveQuizResult({
              attempt_token: quiz.meta.attemptToken,
              answers,
            })
          : await saveSoalResult({
              attempt_token: quiz.meta.attemptToken,
              answers,
            });

      const result = response.data;

      if (source === "quiz") {
        await markQuizDone(
          numericChapterId,
          Number(result.quiz_id ?? quiz.meta.id),
        );
      }

      await quiz.clearSavedProgress();

      navigation.replace("Result", {
        source,
        chapterId: numericChapterId,
        quizId: Number(result.quiz_id ?? quiz.meta.id),
        setId:
          source === "soal"
            ? Number(result.soal_set_id ?? soalSetId)
            : undefined,
        title: quiz.meta.title,
        total: quiz.total,
        correct: result.correct,
        wrong: result.wrong,
        empty: result.empty,
        score: result.score,
        userAnswers: quiz.userAnswers,
        questions: quiz.questions,
        review: result.review ?? [],
      });
    } catch (err: any) {
      hasFinished.current = false;

      Alert.alert(
        "Gagal Mengirim Jawaban",
        err?.message ?? "Jawaban belum berhasil dikirim ke server.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (quiz.isTimeUp && !hasFinished.current) {
      submitToServer();
    }
  }, [quiz.isTimeUp]);

  const handleSubmitConfirm = () => {
    if (submitting) return;

    Alert.alert("Submit", "Yakin ingin mengakhiri pengerjaan?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Submit",
        style: "destructive",
        onPress: submitToServer,
      },
    ]);
  };

  if (checkingProgress || redirecting || quiz.loading) {
    return (
      <View style={quizStyles.screenContainer}>
        <ActivityIndicator />

        <Text>
          {redirecting
            ? "Mengalihkan ke hasil..."
            : checkingProgress
              ? "Memeriksa progress..."
              : "Memuat soal..."}
        </Text>
      </View>
    );
  }

  if (quiz.error) {
    return (
      <View
        style={[
          quizStyles.screenContainer,
          {
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          },
        ]}
      >
        <Text
          style={{
            color: "#DC2626",
            textAlign: "center",
          }}
        >
          {quiz.error}
        </Text>
      </View>
    );
  }

  if (!quiz.question) {
    return (
      <View style={quizStyles.screenContainer}>
        <Text>Soal tidak tersedia.</Text>
      </View>
    );
  }

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
        onPrev={() =>
          quiz.setCurrentIndex((index: number) => Math.max(index - 1, 0))
        }
        onNext={() => {
          if (quiz.currentIndex === quiz.total - 1) {
            handleSubmitConfirm();
          } else {
            quiz.setCurrentIndex((index: number) => index + 1);
          }
        }}
      />

      <QuizNavigation
        total={quiz.total}
        current={quiz.currentIndex}
        answers={quiz.answers}
        onSelect={quiz.setCurrentIndex}
      />

      {submitting && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(255,255,255,0.8)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />

          <Text
            style={{
              marginTop: 10,
            }}
          >
            Menilai jawaban di server...
          </Text>
        </View>
      )}
    </View>
  );
}

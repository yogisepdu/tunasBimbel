import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ScreenCapture from "expo-screen-capture";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { quizStyles } from "../../assets/styles/quizStyles";

import QuestionCard from "../../components/Quiz/QuestionCard";
import QuizFooter from "../../components/Quiz/QuizFooter";
import QuizHeader from "../../components/Quiz/QuizHeader";
import QuizNavigation from "../../components/Quiz/QuizNavigation";

import ConfirmModal from "../../components/Common/ConfirmModal";

import { useQuiz } from "../../hooks/useQuiz";

import { RootStackParamList } from "../../navigation/types";

import { markQuizDone } from "../../services/progressService";

import { saveQuizResult } from "../../services/quizResultService";

import { checkQuizProgress } from "../../services/quizService";

import { checkSoalProgress, saveSoalResult } from "../../services/soalService";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export default function QuizScreen({ route, navigation }: Props) {
  /*
  |--------------------------------------------------------------------------
  | Route Params
  |--------------------------------------------------------------------------
  */

  const { chapterId, source, setId } = route.params;

  /*
  |--------------------------------------------------------------------------
  | Normalize Chapter ID
  |--------------------------------------------------------------------------
  */

  const numericChapterId =
    typeof chapterId === "string"
      ? Number(chapterId.replace("c-", ""))
      : Number(chapterId ?? 0);

  /*
  |--------------------------------------------------------------------------
  | Soal / Try Out Set ID
  |--------------------------------------------------------------------------
  */

  const soalSetId = Number(setId ?? 0);

  /*
  |--------------------------------------------------------------------------
  | Active ID
  |--------------------------------------------------------------------------
  */

  const activeId = source === "soal" ? soalSetId : numericChapterId;

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [checkingProgress, setCheckingProgress] = useState(true);

  const [redirecting, setRedirecting] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Submit Confirmation Modal
  |--------------------------------------------------------------------------
  */

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Info / Error Modal
  |--------------------------------------------------------------------------
  */

  const [infoModal, setInfoModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    confirmText: string;
    danger?: boolean;
    icon?: string;
  }>({
    visible: false,
    title: "",
    message: "",
    confirmText: "Mengerti",
    danger: false,
    icon: "!",
  });

  /*
  |--------------------------------------------------------------------------
  | Prevent double submit
  |--------------------------------------------------------------------------
  */

  const hasFinished = useRef(false);

  /*
  |--------------------------------------------------------------------------
  | Quiz Hook
  |--------------------------------------------------------------------------
  */

  const quiz = useQuiz(activeId, source, !checkingProgress && !redirecting);

  /*
  |--------------------------------------------------------------------------
  | Check Previous Quiz Progress
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const checkProgress = async () => {
      try {
        let response;

        /*
          |--------------------------------------------------------------------------
          | Quiz
          |--------------------------------------------------------------------------
          */

        if (source === "quiz") {
          if (!numericChapterId) {
            return;
          }

          response = await checkQuizProgress(numericChapterId);
        } else {
          /*
          |--------------------------------------------------------------------------
          | Try Out
          |--------------------------------------------------------------------------
          */
          if (!soalSetId) {
            return;
          }

          response = await checkSoalProgress(soalSetId);
        }

        /*
          |--------------------------------------------------------------------------
          | Already Completed
          |--------------------------------------------------------------------------
          */

        if (response?.has_done && response?.result) {
          setRedirecting(true);

          const result = response.result;

          /*
            |--------------------------------------------------------------------------
            | Answers
            |--------------------------------------------------------------------------
            */

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

          /*
            |--------------------------------------------------------------------------
            | Navigate to Result
            |--------------------------------------------------------------------------
            */

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

    void checkProgress();
  }, [source, soalSetId, numericChapterId, navigation]);

  /*
  |--------------------------------------------------------------------------
  | Screen Capture Protection
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    void ScreenCapture.preventScreenCaptureAsync();

    return () => {
      void ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Submit Quiz / Try Out
  |--------------------------------------------------------------------------
  */

  const submitToServer = async () => {
    /*
      |--------------------------------------------------------------------------
      | Prevent double submit
      |--------------------------------------------------------------------------
      */

    if (hasFinished.current || submitting) {
      return;
    }

    /*
      |--------------------------------------------------------------------------
      | Attempt Token Check
      |--------------------------------------------------------------------------
      */

    if (!quiz.meta.attemptToken) {
      setInfoModal({
        visible: true,

        title: "Belum Siap",

        message:
          "Pengerjaan belum siap. Silakan tunggu sampai soal selesai dimuat.",

        confirmText: "Mengerti",

        danger: false,

        icon: "!",
      });

      return;
    }

    /*
      |--------------------------------------------------------------------------
      | Lock Submit
      |--------------------------------------------------------------------------
      */

    hasFinished.current = true;

    setSubmitting(true);

    try {
      /*
        |--------------------------------------------------------------------------
        | Build Answer Payload
        |--------------------------------------------------------------------------
        */

      const answers = quiz.buildAnswerPayload();

      /*
        |--------------------------------------------------------------------------
        | Send to Server
        |--------------------------------------------------------------------------
        */

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

      /*
        |--------------------------------------------------------------------------
        | Server Result
        |--------------------------------------------------------------------------
        */

      const result = response.data;

      /*
        |--------------------------------------------------------------------------
        | Quiz Progress
        |--------------------------------------------------------------------------
        |
        | Hanya Quiz biasa yang dicatat
        | sebagai progress chapter.
        |
        | Try Out menggunakan mekanisme
        | progress sendiri.
        |--------------------------------------------------------------------------
        */

      if (source === "quiz") {
        await markQuizDone(
          numericChapterId,

          Number(result.quiz_id ?? quiz.meta.id),
        );
      }

      /*
        |--------------------------------------------------------------------------
        | Clear Local Saved Progress
        |--------------------------------------------------------------------------
        */

      await quiz.clearSavedProgress();

      /*
        |--------------------------------------------------------------------------
        | Navigate Result
        |--------------------------------------------------------------------------
        */

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

        correct: Number(result.correct ?? 0),

        wrong: Number(result.wrong ?? 0),

        empty: Number(result.empty ?? 0),

        score: Number(result.score ?? 0),

        userAnswers: quiz.userAnswers,

        questions: quiz.questions,

        review: result.review ?? [],
      });
    } catch (err: any) {
      /*
        |--------------------------------------------------------------------------
        | Allow Retry
        |--------------------------------------------------------------------------
        */

      hasFinished.current = false;

      /*
        |--------------------------------------------------------------------------
        | Show Custom Error Modal
        |--------------------------------------------------------------------------
        */

      setInfoModal({
        visible: true,

        title: "Gagal Mengirim Jawaban",

        message:
          err?.message ??
          "Jawaban belum berhasil dikirim ke server. Silakan coba lagi.",

        confirmText: "Mengerti",

        danger: true,

        icon: "!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Time Up
  |--------------------------------------------------------------------------
  |
  | Jika waktu habis, langsung submit.
  | Tidak perlu confirmation modal.
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (quiz.isTimeUp && !hasFinished.current) {
      void submitToServer();
    }
  }, [quiz.isTimeUp]);

  /*
  |--------------------------------------------------------------------------
  | Submit Confirmation
  |--------------------------------------------------------------------------
  */

  const handleSubmitConfirm = () => {
    if (submitting) {
      return;
    }

    setShowSubmitConfirm(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Close Submit Modal
  |--------------------------------------------------------------------------
  */

  const handleCancelSubmit = () => {
    if (submitting) {
      return;
    }

    setShowSubmitConfirm(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Confirm Submit
  |--------------------------------------------------------------------------
  */

  const handleConfirmSubmit = async () => {
    if (submitting) {
      return;
    }

    /*
     * Jangan langsung menutup modal.
     *
     * Modal akan berubah menjadi loading
     * selama proses submit.
     */

    await submitToServer();

    /*
      |--------------------------------------------------------------------------
      | Jika submit gagal, modal tetap terbuka.
      |
      | Jika berhasil, navigation.replace()
      | akan meninggalkan screen ini.
      |--------------------------------------------------------------------------
      */

    if (!hasFinished.current) {
      setShowSubmitConfirm(true);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Close Info Modal
  |--------------------------------------------------------------------------
  */

  const closeInfoModal = () => {
    setInfoModal((previous) => ({
      ...previous,
      visible: false,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Loading Screen
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Quiz Error
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | No Question
  |--------------------------------------------------------------------------
  */

  if (!quiz.question) {
    return (
      <View style={quizStyles.screenContainer}>
        <Text>Soal tidak tersedia.</Text>
      </View>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Main Screen
  |--------------------------------------------------------------------------
  */

  return (
    <View style={quizStyles.screenContainer}>
      {/* ----------------------------------------------------------------- */}
      {/* Quiz Header                                                       */}
      {/* ----------------------------------------------------------------- */}

      <QuizHeader
        title={quiz.meta.title}
        timeLeft={quiz.timeLeft}
        onExit={handleSubmitConfirm}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Question                                                          */}
      {/* ----------------------------------------------------------------- */}

      <QuestionCard
        question={quiz.question}
        index={quiz.currentIndex}
        total={quiz.total}
        selectedAnswer={quiz.answers[quiz.currentIndex]}
        onSelect={quiz.selectAnswer}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Footer                                                            */}
      {/* ----------------------------------------------------------------- */}

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

      {/* ----------------------------------------------------------------- */}
      {/* Question Navigation                                               */}
      {/* ----------------------------------------------------------------- */}

      <QuizNavigation
        total={quiz.total}
        current={quiz.currentIndex}
        answers={quiz.answers}
        onSelect={quiz.setCurrentIndex}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Submit Loading Overlay                                             */}
      {/* ----------------------------------------------------------------- */}

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

      {/* ----------------------------------------------------------------- */}
      {/* Submit Confirmation Modal                                          */}
      {/* ----------------------------------------------------------------- */}

      <ConfirmModal
        visible={showSubmitConfirm}
        title={source === "soal" ? "Submit Try Out" : "Submit Quiz"}
        message={
          source === "soal"
            ? "Yakin ingin mengakhiri pengerjaan try out ini? Setelah dikirim, jawaban tidak dapat diubah."
            : "Yakin ingin mengakhiri pengerjaan quiz ini? Setelah dikirim, jawaban tidak dapat diubah."
        }
        confirmText="Submit"
        cancelText="Batal"
        icon="✓"
        loading={submitting}
        onCancel={handleCancelSubmit}
        onConfirm={handleConfirmSubmit}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Info / Error Modal                                                 */}
      {/* ----------------------------------------------------------------- */}

      <ConfirmModal
        visible={infoModal.visible}
        title={infoModal.title}
        message={infoModal.message}
        confirmText={infoModal.confirmText}
        cancelText="Tutup"
        icon={infoModal.icon ?? "!"}
        danger={Boolean(infoModal.danger)}
        onCancel={closeInfoModal}
        onConfirm={closeInfoModal}
      />
    </View>
  );
}

import { ScrollView, Text, ActivityIndicator, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useMemo, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { calculateStatistics } from "../../utils/statisticHelper";

import ResultTabs from "../../components/Results/ResultTabs";
import StatistikSection from "../../components/Results/StatistikSection";
import PembahasanSection from "../../components/Results/PembahasanSection";
import PeringkatSection from "../../components/Results/PeringkatSection";
import { resultStyles } from "../../assets/styles/resultStyles";

import { markQuizDone } from "../../services/progressService";
import { getQuizQuestions } from "../../services/quizService";
import { apiFetch } from "../../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

// 🔥 HELPER NORMALISASI
const normalizeQuestion = (q: any) => ({
  id: q.id,
  text: q.text,
  options: (q.options || []).map((opt: any) => ({
    key: opt.key ?? opt.option_key ?? opt.label,
    text: opt.text ?? opt.option_text ?? opt.value,
  })),
  correctAnswer: q.correctAnswer ?? q.correct_answer,
});

export default function ResultScreen({ route }: Props) {
  const { score, source, userAnswers, quizId, chapterId, setId } = route.params;

  const [activeTab, setActiveTab] = useState<
    "Statistik" | "Pembahasan" | "Peringkat"
  >("Statistik");

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [resultData, setResultData] = useState<any>(null);

  const soalSetId = Number(setId);
  const quizChapterId =
    typeof chapterId === "string"
      ? Number(chapterId.replace("c-", ""))
      : Number(chapterId);

  // ================= FINAL DATA (WAJIB DI ATAS) =================
  const finalScore = resultData?.score ?? score ?? 0;
  const finalAnswers = resultData?.userAnswers ?? userAnswers ?? [];

  // ================= LOAD USER =================
  useEffect(() => {
    (async () => {
      const u = await AsyncStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    })();
  }, []);

  // console.log("🔥 PARAMS RESULT:", {
  //   chapterId,
  //   quizId,
  //   source,
  // });
  // ================= LOAD RESULT =================
  useEffect(() => {
    const loadResult = async () => {
      try {
        if (source === "quiz") {
          if (!quizChapterId || isNaN(quizChapterId)) {
            console.log("❌ INVALID quizChapterId:", chapterId);
            setLoading(false);
            return;
          }

          const res = await apiFetch(`/quiz-progress/${quizChapterId}`);

          if (res?.has_done && res?.result) {
            setResultData({
              score: res.result.score,
              userAnswers: (res.result.answers || []).map((a: any) => ({
                questionId: a.questionId ?? a.question_id,
                selectedAnswer: a.selectedAnswer ?? a.answer,
              })),
            });
          }
        }

        if (source === "soal") {
          if (!soalSetId) return;

          const res = await apiFetch(`/soal-progress/${soalSetId}`);

          if (res?.has_done && res?.result) {
            setResultData({
              score: res.result.score,
              userAnswers: (res.result.answers || []).map((a: any) => ({
                questionId: a.questionId ?? a.question_id,
                selectedAnswer: a.selectedAnswer ?? a.answer,
              })),
            });
          }
        }
      } catch (err) {
        console.log("❌ load result error:", err);
      }
    };

    loadResult();
  }, [source, chapterId, setId]);

  // ================= LOAD QUESTIONS =================
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        if (source === "soal") {
          if (!soalSetId) return;

          const res = await apiFetch(`/soal-sets/${soalSetId}/questions`);
          setQuestions((res.questions || []).map(normalizeQuestion));
          return;
        }

        if (!quizChapterId || isNaN(quizChapterId)) {
          console.log("❌ INVALID quizChapterId:", chapterId);
          setLoading(false);
          return;
        }

        const res = await getQuizQuestions(quizChapterId);
        setQuestions((res?.questions || []).map(normalizeQuestion));
      } catch (err) {
        console.log("❌ load questions error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [source, setId, chapterId]);

  const isPassed = finalScore >= 70;

  // ================= STAT =================
  const stats = useMemo(() => {
    if (!questions.length) {
      return { benar: 0, salah: 0, kosong: 0 };
    }

    return calculateStatistics(questions, finalAnswers);
  }, [questions, finalAnswers]);

  // ================= PROGRESS =================
  useEffect(() => {
    if (source !== "quiz") return;
    if (!quizId) return;

    markQuizDone(chapterId, quizId);
  }, []);

  // ================= LOADING =================
  if (loading) {
    return (
      <View
        style={[
          resultStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
        <Text>Memuat hasil...</Text>
      </View>
    );
  }

  // ================= UI =================
  return (
    <ScrollView style={resultStyles.container}>
      <Text style={resultStyles.header}>
        {source === "soal" ? "Hasil Try Out" : "Hasil Quiz"}
      </Text>

      <ResultTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "Statistik" && (
        <StatistikSection
          score={finalScore}
          isPassed={isPassed}
          stats={stats}
        />
      )}

      {activeTab === "Pembahasan" && (
        <PembahasanSection questions={questions} userAnswers={finalAnswers} />
      )}

      {activeTab === "Peringkat" && (
        <PeringkatSection
          quizId={source === "quiz" ? quizId : undefined}
          setId={source === "soal" ? soalSetId : undefined}
          currentUser={user?.name}
        />
      )}
    </ScrollView>
  );
}

import { ScrollView, Text, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useMemo, useState, useEffect } from "react";

import { calculateStatistics } from "../../utils/statisticHelper";

import ResultTabs from "../../components/Results/ResultTabs";
import StatistikSection from "../../components/Results/StatistikSection";
import PembahasanSection from "../../components/Results/PembahasanSection";
import PeringkatSection from "../../components/Results/PeringkatSection";
import { resultStyles } from "../../assets/styles/resultStyles";
import { saveQuizResult } from "../../services/quizResultService";

import { markQuizDone } from "../../services/progressService";
import { getQuizQuestions } from "../../services/quizService";

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

export default function ResultScreen({ route }: Props) {
  const { score, source, userAnswers, quizId, chapterId } = route.params;

  const [activeTab, setActiveTab] = useState<
    "Statistik" | "Pembahasan" | "Peringkat"
  >("Statistik");

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isPassed = score >= 70;

  // ================= LOAD QUESTIONS FROM API =================
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        if (!chapterId) return;

        const numericChapterId =
          typeof chapterId === "string"
            ? Number(chapterId.replace("c-", ""))
            : chapterId;

        const res = await getQuizQuestions(numericChapterId);

        setQuestions(res.questions || []);
      } catch (err) {
        console.log("load questions error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (source === "quiz") {
      loadQuestions();
    }
  }, []);

  // ================= HITUNG STATISTIK =================
  const stats = useMemo(() => {
    if (!questions.length) {
      return { benar: 0, salah: 0, kosong: 0 };
    }

    return calculateStatistics(questions, userAnswers);
  }, [questions, userAnswers]);

  // ================= SIMPAN PROGRESS =================
  useEffect(() => {
    if (source !== "quiz") return;
    if (!chapterId || !quizId) return;

    const saveProgress = async () => {
      try {
        const numericChapterId =
          typeof chapterId === "string"
            ? Number(chapterId.replace("c-", ""))
            : chapterId;

        const numericQuizId =
          typeof quizId === "string"
            ? Number(quizId.replace("quiz-", ""))
            : quizId;

        await markQuizDone(numericChapterId, numericQuizId);
      } catch (err) {
        console.log("ERROR markQuizDone:", err);
      }
    };

    saveProgress();
  }, []);

  useEffect(() => {
    if (source !== "quiz") return;
    if (!quizId) return;
    if (!questions.length) return;

    const saveResult = async () => {
      try {
        const numericQuizId =
          typeof quizId === "string"
            ? Number(quizId.replace("quiz-", ""))
            : quizId;

        await saveQuizResult({
          quiz_id: numericQuizId,
          score,
          correct: stats.benar,
          wrong: stats.salah,
          empty: stats.kosong,
        });

        console.log("✅ Result tersimpan");
      } catch (err) {
        console.log("❌ Gagal simpan result:", err);
      }
    };

    saveResult();
  }, [questions]);

  if (loading) {
    return (
      <ScrollView style={resultStyles.container}>
        <ActivityIndicator size="large" />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={resultStyles.container}>
      <Text style={resultStyles.header}>Hasil Ujian</Text>

      <ResultTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "Statistik" && (
        <StatistikSection score={score} isPassed={isPassed} stats={stats} />
      )}

      {activeTab === "Pembahasan" && (
        <PembahasanSection questions={questions} userAnswers={userAnswers} />
      )}

      {activeTab === "Peringkat" && <PeringkatSection />}
    </ScrollView>
  );
}

import { ScrollView, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useMemo, useState } from "react";

import { quizDummy } from "../../data/quizDummy";
import { soalDummy } from "../../data/soalDummy";
import { calculateStatistics } from "../../utils/statisticHelper";

import ResultTabs from "../../components/Results/ResultTabs";
import StatistikSection from "../../components/Results/StatistikSection";
import PembahasanSection from "../../components/Results/PembahasanSection";
import PeringkatSection from "../../components/Results/PeringkatSection";
import { resultStyles } from "../../assets/styles/resultStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

export default function ResultScreen({ route }: Props) {
  const { score, source, userAnswers } = route.params;

  const [activeTab, setActiveTab] = useState<
    "Statistik" | "Pembahasan" | "Peringkat"
  >("Statistik");

  const isPassed = score >= 300;

  const questions = useMemo(
    () => (source === "quiz" ? quizDummy : soalDummy),
    [source],
  );

  const stats = useMemo(
    () => calculateStatistics(questions, userAnswers),
    [questions, userAnswers],
  );

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

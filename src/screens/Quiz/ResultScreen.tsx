import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { resultStyles } from "../../assets/styles/resultStyles";
import PembahasanSection from "../../components/Results/PembahasanSection";
import PeringkatSection from "../../components/Results/PeringkatSection";
import ResultTabs from "../../components/Results/ResultTabs";
import StatistikSection from "../../components/Results/StatistikSection";
import { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

export default function ResultScreen({ route }: Props) {
  const {
    score,
    source,
    quizId,
    setId,
    correct,
    wrong,
    empty,
    questions = [],
    review = [],
  } = route.params;

  const [activeTab, setActiveTab] = useState<
    "Statistik" | "Pembahasan" | "Peringkat"
  >("Statistik");

  const [user, setUser] = useState<any>(null);

  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem("user");

        if (raw) {
          setUser(JSON.parse(raw));
        }
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  const stats = useMemo(
    () => ({
      benar: Number(correct ?? 0),
      salah: Number(wrong ?? 0),
      kosong: Number(empty ?? 0),
    }),
    [correct, wrong, empty],
  );

  const finalScore = Number(score ?? 0);

  const isPassed = finalScore >= 70;

  if (loadingUser) {
    return (
      <View
        style={[
          resultStyles.container,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" />
        <Text>Memuat hasil...</Text>
      </View>
    );
  }

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
        <PembahasanSection questions={questions} review={review} />
      )}

      {activeTab === "Peringkat" && (
        <PeringkatSection
          quizId={source === "quiz" ? quizId : undefined}
          setId={source === "soal" ? setId : undefined}
          currentUser={user?.name}
        />
      )}
    </ScrollView>
  );
}

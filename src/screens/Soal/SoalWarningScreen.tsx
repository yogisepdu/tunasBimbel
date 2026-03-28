import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useEffect, useState } from "react";

import SoalHeader from "../../components/Soal/SoalHeader";
import SoalSectionCard from "../../components/Soal/SoalSectionCard";
import { apiFetch } from "../../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "SoalWarning">;

type Section = {
  id: number;
  title: string;
  total_soal: number;
  date: string;
  icon: string;
  color: string;
  items: {
    id: number;
    title: string;
    soal: string;
    waktu: string;
    poin: string;
    badge: string;
    is_done?: boolean;
  }[];
};

export default function SoalWarningScreen({ route, navigation }: Props) {
  const { soalId, title } = route.params;

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await apiFetch(`/soal-sections/${soalId}`);
      setSections(res);
    } catch (err: any) {
      if (err.message === "SESSION_EXPIRED") return;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ambil semua set id
  const allSets = sections.flatMap((s) => s.items);
  const firstSet = allSets[0];

  return (
    <View style={styles.container}>
      <SoalHeader title={title} onBack={navigation.goBack} />

      {/* LOADING */}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* ERROR */}
      {!loading && error !== "" && (
        <View style={styles.overlay}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}

      {/* CONTENT */}
      {!loading && error === "" && (
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {sections.map((section) => (
              <SoalSectionCard
                key={section.id}
                title={section.title}
                items={section.items}
                totalSoal={section.total_soal}
                date={section.date}
                icon={section.icon}
                color={section.color}
                onSelect={(id) => {
                  navigation.replace("Quiz", {
                    setId: id, // 🔥 INI YANG BENAR
                    source: "soal",
                  });
                }}
              />
            ))}
          </ScrollView>

          {/* 🔥 BUTTON */}
          {firstSet && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => {
                navigation.replace("Quiz", {
                  setId: firstSet.id, // 🔥 FIX
                  source: "soal",
                });
              }}
            >
              <Text style={styles.startButtonText}>Mulai Simulasi</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  startButton: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  startButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

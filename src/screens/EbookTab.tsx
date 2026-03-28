import React, { useState, useEffect } from "react";
import { FlatList, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import Header from "../components/EBook/Header";
import EbookTab from "../components/EBook";
import EbookListItem from "../components/EBook/EbookListItem";

import { getEbooks } from "../services/ebookService";
import { apiFetch } from "../services/api";
import { EbookType } from "../types/EbookType";

function extractTotalSoal(duration: string): number {
  const match = duration.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export default function EbookTabScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const initialTab = route.params?.initialInnerTab ?? "materi";
  const [tab, setTab] = useState<"materi" | "soal">(initialTab);

  // 🔥 CACHE PER TAB
  const [materiData, setMateriData] = useState<EbookType[]>([]);
  const [soalData, setSoalData] = useState<EbookType[]>([]);

  const [loadingMateri, setLoadingMateri] = useState(true);
  const [loadingSoal, setLoadingSoal] = useState(true);

  // ================= LOAD MATERI (ONCE) =================
  useEffect(() => {
    const loadMateri = async () => {
      try {
        const data = await getEbooks();
        setMateriData(data);
      } catch (error) {
        console.log("Materi error:", error);
      } finally {
        setLoadingMateri(false);
      }
    };

    loadMateri();
  }, []);

  // ================= LOAD SOAL (ONCE) =================
  useEffect(() => {
    const loadSoal = async () => {
      try {
        const data = await apiFetch("/soal-sections");

        const mapped: EbookType[] = data.flatMap((section: any) =>
          section.items.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            mapel: section.title,
            type: "soal",
            duration: item.soal,
          })),
        );

        setSoalData(mapped);
      } catch (error) {
        console.log("Soal error:", error);
      } finally {
        setLoadingSoal(false);
      }
    };

    loadSoal();
  }, []);

  // ================= HANDLE INITIAL TAB =================
  useEffect(() => {
    if (route.params?.initialInnerTab) {
      setTab(route.params.initialInnerTab);
    }
  }, [route.params?.initialInnerTab]);

  // ================= DATA ACTIVE =================
  const data = tab === "materi" ? materiData : soalData;
  const loading = tab === "materi" ? loadingMateri : loadingSoal;

  // ================= LOADING =================
  if (loading && data.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  // ================= EMPTY =================
  if (!loading && data.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Tidak ada data {tab}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Riwayat" icon="book" />

      <EbookTab active={tab} onChange={setTab} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <EbookListItem
            item={item}
            onPress={() => {
              if (item.type === "materi") {
                navigation.navigate("EbookDetail", {
                  chapterId: item.id,
                  title: item.title,
                  subtitle: item.mapel,
                });
              }

              if (item.type === "soal") {
                navigation.navigate("SoalWarning", {
                  soalId: item.id,
                  title: item.title,
                  duration: item.duration,
                  totalSoal: extractTotalSoal(item.duration),
                });
              }
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

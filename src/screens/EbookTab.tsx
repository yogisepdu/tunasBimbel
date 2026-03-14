import React, { useState, useEffect } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import Header from "../components/EBook/Header";
import EbookTab from "../components/EBook";
import EbookListItem from "../components/EBook/EbookListItem";

import { getEbooks } from "../services/ebookService";
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

  const [ebooks, setEbooks] = useState<EbookType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getEbooks();
        setEbooks(data);
      } catch (error) {
        console.log("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (route.params?.initialInnerTab) {
      setTab(route.params.initialInnerTab);
    }
  }, [route.params?.initialInnerTab]);

  const filtered = (ebooks ?? []).filter((i) => i.type === tab);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Riwayat" icon="book" />

      <EbookTab active={tab} onChange={setTab} />

      <FlatList
        data={filtered}
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

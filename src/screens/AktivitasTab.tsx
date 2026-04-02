import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedHeader from "../components/Activity/segmentedHeader";
import AnnouncementCard from "../components/Activity/announcementCard";
import { styles } from "../assets/styles/activityStyles";
import { apiFetch } from "../services/api";

interface Announcement {
  id: number;
  category: string;
  title: string;
  description: string;
  isNew: boolean;
  date: string;
}

const AktivitasScreen: React.FC = () => {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // 🔥 FORMAT TANGGAL INDONESIA
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return dateStr; // fallback kalau gagal parse

    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const fetchAnnouncements = async () => {
    try {
      setError("");
      const res = await apiFetch("/announcements");

      setData(res.data || []);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAnnouncements();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <SegmentedHeader />

      {/* LOADING */}
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* ERROR */}
      {!loading && error !== "" && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
          {error}
        </Text>
      )}

      {/* DATA */}
      {!loading && !error && (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 24,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {data.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Belum ada pengumuman
            </Text>
          ) : (
            data.map((item) => (
              <AnnouncementCard
                key={item.id}
                category={item.category}
                date={formatDate(item.date)} // 🔥 FIX DATE
                title={item.title}
                description={item.description}
                isNew={item.isNew}
              />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AktivitasScreen;

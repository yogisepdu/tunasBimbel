import { ScrollView, View, Text } from "react-native";
import Header from "../components/HomeMenu/Header";
import Banner from "../components/HomeMenu/Banner";
import MenuGrid from "../components/MenuGrid";
import TryoutCard from "../components/HomeMenu/TryoutCard";
import ActivityCard from "../components/HomeMenu/ActivityCard";

export default function HomeTab() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F8FAFC" }}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <Header />
      <Banner />

      <View style={{ marginTop: 25 }}>
        <MenuGrid />
      </View>

      {/* REKOMENDASI */}
      <View style={{ marginTop: 30 }}>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700" }}>
            🚀 Rekomendasi Untuk Kamu
          </Text>

          <Text style={{ color: "#2563EB" }}>Lihat Semua</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 15, paddingLeft: 16 }}
        >
          <TryoutCard
            title="Mastering UTBK: Strategi Menaklukkan TPS"
            participants="1.2k"
            rating={4.9}
          />

          <TryoutCard
            title="Intensif Bahasa TOEFL/IELTS"
            participants="850"
            rating={4.8}
          />
        </ScrollView>
        {/* AKTIVITAS TERKINI */}
        <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              Aktivitas Terkini
            </Text>

            <View
              style={{
                backgroundColor: "#DBEAFE",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 20,
              }}
            >
              <Text
                style={{ fontSize: 11, color: "#2563EB", fontWeight: "600" }}
              >
                3 TUGAS BARU
              </Text>
            </View>
          </View>

          {/* LIST */}
          <ActivityCard
            type="quiz"
            title="Kuis Matematika: Aljabar"
            subtitle="Tenggat: Besok, 18:00 WIB"
            status="BELUM"
          />

          <ActivityCard
            type="materi"
            title="Materi Biologi: Sel & Jaringan"
            subtitle="Telah dipelajari 45%"
            status="LANJUT"
          />

          <ActivityCard
            type="event"
            title="Webinar: Persiapan Mandiri UI"
            subtitle="Hari ini pukul 19:30"
            status="IKUTI"
          />
        </View>
      </View>
    </ScrollView>
  );
}

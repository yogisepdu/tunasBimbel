import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/HomeMenu/Header";
import Banner from "../components/HomeMenu/Banner";
import MenuGrid from "../components/MenuGrid";
import TryoutCard from "../components/HomeMenu/TryoutCard";
import ActivityCard from "../components/HomeMenu/ActivityCard";

import { apiFetch } from "../services/api";

export default function HomeTab() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  
  const [packages, setPackages] = useState<any[]>([]);
  const [loadingPackage, setLoadingPackage] = useState(true);

  const navigation = useNavigation<any>();

  const fetchActivities = async () => {
    try {
      setLoadingActivity(true);
      const res = await apiFetch("/activities");

      // console.log("🔥 ACTIVITIES:", res.data);

      setActivities(res.data || []);
    } catch (err) {
      console.log("Activity error:", err);
    } finally {
      setLoadingActivity(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // 🔥 refresh setiap balik ke screen
  useFocusEffect(
    React.useCallback(() => {
      fetchActivities();
    }, []),
  );

  const fetchPackages = async () => {
    try {
      const res = await apiFetch("/packages");
      setPackages(res.data || []);
    } catch (err) {
      console.log("Package error:", err);
    } finally {
      setLoadingPackage(false);
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchPackages();
  }, []);

  const pendingCount = activities.filter((a: any) => a.progress < 100).length;

  const getRandomRating = () => {
    return (4.3 + Math.random() * 0.7).toFixed(1);
  };

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
          {loadingPackage ? (
            <ActivityIndicator />
          ) : (
            packages.map((pkg) => (
              <TryoutCard
                key={pkg.id}
                title={pkg.name}
                participants={`${pkg.totalClass} Kelas`}
                rating={Number(getRandomRating())}
                locked={!pkg.is_owned}
                image={pkg.image}
                price={pkg.price}
                onPress={() => {
                  if (pkg.is_owned) {
                    navigation.navigate("EbookTab");
                  } else {
                    navigation.navigate("PaymentScreen", {
                      packageId: pkg.id,
                    });
                  }
                }}
              />
            ))
          )}
        </ScrollView>

        {/* 🔥 AKTIVITAS TERKINI */}
        <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
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
                style={{
                  fontSize: 11,
                  color: "#2563EB",
                  fontWeight: "600",
                }}
              >
                {pendingCount} BELUM SELESAI
              </Text>
            </View>
          </View>

          {/* LIST */}
          {loadingActivity ? (
            <ActivityIndicator style={{ marginTop: 10 }} />
          ) : activities.length === 0 ? (
            <Text style={{ color: "#9CA3AF", marginTop: 10 }}>
              Belum ada aktivitas, yuk mulai belajar!
            </Text>
          ) : (
            activities.slice(0, 3).map((item: any) => (
              <ActivityCard
                key={item.id}
                type={item.type}
                title={item.title}
                progress={item.progress} // ✅ FIX UTAMA
                status={item.status}
              />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

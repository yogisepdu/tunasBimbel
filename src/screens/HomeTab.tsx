import React, { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import ActivityCard from "../components/HomeMenu/ActivityCard";
import Banner from "../components/HomeMenu/Banner";
import Header from "../components/HomeMenu/Header";
import TryoutCard from "../components/HomeMenu/TryoutCard";
import MenuGrid from "../components/MenuGrid";

import { API_URL, apiFetch } from "../services/api";

export default function HomeTab() {
  /*
  |--------------------------------------------------------------------------
  | Activities
  |--------------------------------------------------------------------------
  */

  const [activities, setActivities] = useState<any[]>([]);

  const [loadingActivity, setLoadingActivity] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Packages
  |--------------------------------------------------------------------------
  */

  const [packages, setPackages] = useState<any[]>([]);

  const [loadingPackage, setLoadingPackage] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Show All Packages
  |--------------------------------------------------------------------------
  */

  const [showAllPackages, setShowAllPackages] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Fetch Activities
  |--------------------------------------------------------------------------
  */

  const fetchActivities = useCallback(async () => {
    try {
      setLoadingActivity(true);

      const res = await apiFetch("/activities");

      setActivities(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.log("Activity error:", err);

      setActivities([]);
    } finally {
      setLoadingActivity(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Fetch Packages
  |--------------------------------------------------------------------------
  */

  const fetchPackages = useCallback(async () => {
    try {
      setLoadingPackage(true);

      const res = await apiFetch("/packages");

      setPackages(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.log("Package error:", err);

      setPackages([]);
    } finally {
      setLoadingPackage(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    void fetchActivities();

    void fetchPackages();
  }, [fetchActivities, fetchPackages]);

  /*
  |--------------------------------------------------------------------------
  | Refresh setiap Home kembali aktif
  |--------------------------------------------------------------------------
  */

  useFocusEffect(
    useCallback(() => {
      void fetchActivities();

      void fetchPackages();
    }, [fetchActivities, fetchPackages]),
  );

  /*
  |--------------------------------------------------------------------------
  | Pending Activity
  |--------------------------------------------------------------------------
  */

  const pendingCount = activities.filter(
    (activity: any) => Number(activity.progress ?? 0) < 100,
  ).length;

  /*
  |--------------------------------------------------------------------------
  | Rating
  |--------------------------------------------------------------------------
  |
  | Untuk sementara tetap mengikuti sistem lama.
  |--------------------------------------------------------------------------
  */

  const getRandomRating = () => {
    return (4.3 + Math.random() * 0.7).toFixed(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Open Package Website
  |--------------------------------------------------------------------------
  |
  | Backend saat ini memiliki public route:
  |
  | /checkout/{packageId}
  |
  | Kalau nanti API mengirim "url", "web_url", atau "website_url",
  | kita prioritaskan URL tersebut.
  |--------------------------------------------------------------------------
  */

  const openPackageWebsite = async (pkg: any) => {
    try {
      const packageId = Number(pkg?.id);

      if (!Number.isInteger(packageId) || packageId <= 0) {
        Alert.alert(
          "Paket Tidak Valid",
          "Paket yang dipilih tidak memiliki ID yang valid.",
        );

        return;
      }

      /*
        |--------------------------------------------------------------------------
        | Prioritaskan URL yang dikirim API
        |--------------------------------------------------------------------------
        */

      const customUrl =
        pkg?.url ??
        pkg?.web_url ??
        pkg?.website_url ??
        pkg?.link ??
        pkg?.checkout_url ??
        null;

      /*
        |--------------------------------------------------------------------------
        | Fallback ke public web checkout
        |--------------------------------------------------------------------------
        */

      const webUrl =
        typeof customUrl === "string" && customUrl.trim() !== ""
          ? customUrl.trim()
          : `${API_URL}/checkout/${packageId}`;

      /*
        |--------------------------------------------------------------------------
        | Pastikan URL dapat dibuka
        |--------------------------------------------------------------------------
        */

      const supported = await Linking.canOpenURL(webUrl);

      if (!supported) {
        Alert.alert(
          "Tidak Dapat Membuka Website",
          "Perangkat tidak dapat membuka halaman paket tersebut.",
        );

        return;
      }

      /*
        |--------------------------------------------------------------------------
        | Buka browser / halaman web
        |--------------------------------------------------------------------------
        */

      await Linking.openURL(webUrl);
    } catch (err) {
      console.log("Open package website error:", err);

      Alert.alert(
        "Gagal Membuka Website",
        "Halaman paket tidak dapat dibuka. Silakan coba lagi.",
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Package Header Action
  |--------------------------------------------------------------------------
  */

  const handlePackageHeader = () => {
    setShowAllPackages((previous) => !previous);
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <ScrollView
      style={{
        flex: 1,

        backgroundColor: "#F8FAFC",
      }}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* ================================================================= */}
      {/* HEADER                                                            */}
      {/* ================================================================= */}

      <Header />

      {/* ================================================================= */}
      {/* BANNER                                                            */}
      {/* ================================================================= */}

      <Banner />

      {/* ================================================================= */}
      {/* MENU GRID                                                         */}
      {/* ================================================================= */}

      <View
        style={{
          marginTop: 25,
        }}
      >
        <MenuGrid />
      </View>

      {/* ================================================================= */}
      {/* PACKAGE SECTION                                                   */}
      {/* ================================================================= */}

      <View
        style={{
          marginTop: 30,
        }}
      >
        {/* ----------------------------------------------------------------- */}
        {/* Package Header                                                    */}
        {/* ----------------------------------------------------------------- */}

        <View
          style={{
            paddingHorizontal: 16,

            flexDirection: "row",

            justifyContent: "space-between",

            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,

              fontWeight: "700",

              color: "#111827",
            }}
          >
            🚀 Rekomendasi Untuk Kamu
          </Text>

          {packages.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handlePackageHeader}
              style={{
                paddingVertical: 4,

                paddingLeft: 10,
              }}
            >
              <Text
                style={{
                  color: "#2563EB",

                  fontSize: 14,

                  fontWeight: "600",
                }}
              >
                {showAllPackages ? "Tutup" : "Lihat Semua"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ----------------------------------------------------------------- */}
        {/* Package Loading                                                   */}
        {/* ----------------------------------------------------------------- */}

        {loadingPackage ? (
          <View
            style={{
              minHeight: 160,

              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <ActivityIndicator />

            <Text
              style={{
                marginTop: 8,

                color: "#6B7280",

                fontSize: 13,
              }}
            >
              Memuat paket...
            </Text>
          </View>
        ) : packages.length === 0 ? (
          /* ---------------------------------------------------------------- */
          /* Empty                                                            */
          /* ---------------------------------------------------------------- */

          <View
            style={{
              paddingHorizontal: 16,

              paddingTop: 20,

              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                color: "#9CA3AF",

                fontSize: 14,

                textAlign: "center",
              }}
            >
              Belum ada paket tersedia.
            </Text>
          </View>
        ) : showAllPackages ? (
          /* ---------------------------------------------------------------- */
          /* ALL PACKAGES - VERTICAL LIST                                    */
          /* ---------------------------------------------------------------- */

          <View
            style={{
              paddingHorizontal: 16,

              marginTop: 15,

              gap: 16,
            }}
          >
            {packages.map((pkg: any) => (
              <TryoutCard
                key={pkg.id}
                title={pkg.name}
                participants={`${pkg.totalClass ?? 0} Kelas`}
                rating={Number(getRandomRating())}
                locked={!pkg.is_owned}
                image={pkg.image}
                price={pkg.price}
                fullWidth
                onPress={() => openPackageWebsite(pkg)}
              />
            ))}
          </View>
        ) : (
          /* ---------------------------------------------------------------- */
          /* RECOMMENDED PACKAGES - HORIZONTAL                              */
          /* ---------------------------------------------------------------- */

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginTop: 15,
            }}
            contentContainerStyle={{
              paddingLeft: 16,

              paddingRight: 4,
            }}
          >
            {packages.map((pkg: any) => (
              <TryoutCard
                key={pkg.id}
                title={pkg.name}
                participants={`${pkg.totalClass ?? 0} Kelas`}
                rating={Number(getRandomRating())}
                locked={!pkg.is_owned}
                image={pkg.image}
                price={pkg.price}
                onPress={() => openPackageWebsite(pkg)}
              />
            ))}
          </ScrollView>
        )}

        {/* ================================================================= */}
        {/* AKTIVITAS TERKINI                                                */}
        {/* ================================================================= */}

        <View
          style={{
            marginTop: 30,

            paddingHorizontal: 16,
          }}
        >
          {/* ----------------------------------------------------------------- */}
          {/* Activity Header                                                   */}
          {/* ----------------------------------------------------------------- */}

          <View
            style={{
              flexDirection: "row",

              justifyContent: "space-between",

              alignItems: "center",

              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontSize: 18,

                fontWeight: "700",

                color: "#111827",
              }}
            >
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

          {/* ----------------------------------------------------------------- */}
          {/* Activity List                                                     */}
          {/* ----------------------------------------------------------------- */}

          {loadingActivity ? (
            <ActivityIndicator
              style={{
                marginTop: 10,
              }}
            />
          ) : activities.length === 0 ? (
            <Text
              style={{
                color: "#9CA3AF",

                marginTop: 10,
              }}
            >
              Belum ada aktivitas, yuk mulai belajar!
            </Text>
          ) : (
            activities
              .slice(0, 3)
              .map((item: any) => (
                <ActivityCard
                  key={item.id}
                  type={item.type}
                  title={item.title}
                  progress={item.progress}
                  status={item.status}
                />
              ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

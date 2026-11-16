import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from "../assets/styles/ProfileStyles";
import CustomAlert from "../components/CustomAlert";
import MenuItem from "../components/MenuProfile/MenuItem";
import Section from "../components/MenuProfile/Section";

import { useAlert } from "../hooks/useAlert";
import { resetToLogin } from "../navigation/navigationRef";
import { ProfileStackParamList } from "../navigation/ProfileStack";
import { apiFetch } from "../services/api";

// ========================
// TYPES
// ========================
type NavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

type ProfileData = {
  name: string;
  email: string;
  phone: string;
};

type ProfileApiResponse = {
  user?: {
    name?: string | null;
    email?: string | null;
  };
  profile?: {
    name?: string | null;
    phone?: string | null;
  } | null;
};

// ========================
// COMPONENT
// ========================
const ProfileTab: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const { visible, message, title, showAlert, hideAlert } = useAlert();

  // ========================
  // STATE
  // ========================
  const [confirmLogout, setConfirmLogout] = React.useState(false);

  const [loadingProfile, setLoadingProfile] = React.useState(true);

  const [profile, setProfile] = React.useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
  });

  // ========================
  // REFS
  // ========================
  const hasLoadedProfile = React.useRef(false);

  const showAlertRef = React.useRef(showAlert);

  // Selalu gunakan fungsi showAlert terbaru
  React.useEffect(() => {
    showAlertRef.current = showAlert;
  }, [showAlert]);

  // ========================
  // LOAD PROFILE FROM API
  // ========================
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const loadProfile = async () => {
        // Loading hanya ditampilkan pada pemuatan pertama
        if (!hasLoadedProfile.current) {
          setLoadingProfile(true);
        }

        try {
          const res = await apiFetch<ProfileApiResponse>("/profile");

          if (!isActive) return;

          setProfile({
            name: res?.profile?.name || res?.user?.name || "",
            email: res?.user?.email || "",
            phone: res?.profile?.phone || "",
          });
        } catch (error: any) {
          if (!isActive) return;

          showAlertRef.current(error?.message || "Gagal mengambil data profil");
        } finally {
          if (isActive) {
            hasLoadedProfile.current = true;
            setLoadingProfile(false);
          }
        }
      };

      loadProfile();

      return () => {
        isActive = false;
      };
    }, []),
  );

  // ========================
  // OPEN LINK
  // ========================
  const openLink = async (name: string) => {
    try {
      const res = await apiFetch<{ url?: string }>(`/links/${name}`);

      const url = res?.url;

      if (!url) {
        showAlert("Link tidak tersedia");
        return;
      }

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        showAlert("Tidak bisa membuka link");
      }
    } catch (error: any) {
      showAlert(error?.message || "Terjadi kesalahan");
    }
  };

  // ========================
  // LOGOUT
  // ========================
  const handleLogout = async () => {
    try {
      setConfirmLogout(false);

      await apiFetch("/logout", {
        method: "POST",
      });

      await AsyncStorage.multiRemove(["token", "user"]);

      resetToLogin();
    } catch (error: any) {
      showAlert(error?.message || "Gagal logout");
    }
  };

  // ========================
  // RENDER
  // ========================
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../assets/tunas-logo.png")}
            style={styles.avatar}
          />

          {/* NAME */}
          <Text style={styles.name}>
            {loadingProfile
              ? "Memuat profil..."
              : profile.name || "Nama belum tersedia"}
          </Text>

          {/* EMAIL */}
          <Text style={styles.email}>
            {profile.email || "Email belum tersedia"}
          </Text>

          {/* PHONE */}
          <Text style={styles.phone}>
            {profile.phone || "Nomor WhatsApp belum tersedia"}
          </Text>

          {/* EDIT PROFILE */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
            activeOpacity={0.8}
          >
            <Ionicons name="pencil" size={16} color="#fff" />

            <Text style={styles.editText}>Ubah Profil</Text>
          </TouchableOpacity>
        </View>

        {/* MEMBERSHIP */}
        <Section title="Membership">
          <MenuItem
            icon="gift-outline"
            title="Bonus Premium"
            onPress={() => openLink("bonus_premium")}
          />

          <MenuItem
            icon="pricetag-outline"
            title="Klaim Kode Voucher"
            isLast
            onPress={() => openLink("klaim_voucher")}
          />
        </Section>

        {/* SUPPORT */}
        <Section title="Support">
          <MenuItem
            icon="help-circle-outline"
            title="Bantuan / FAQ"
            onPress={() => openLink("faq")}
          />

          <MenuItem
            icon="alert-circle-outline"
            title="Laporan Masalah"
            onPress={() => openLink("laporan")}
          />

          <MenuItem
            icon="heart-outline"
            title="Saran dan Masukan"
            onPress={() => openLink("saran")}
          />

          <MenuItem
            icon="star-outline"
            title="Beri Kami Nilai"
            isLast
            onPress={() => openLink("rating")}
          />
        </Section>

        {/* INFORMASI LAINNYA */}
        <Section title="Informasi Lainnya">
          <MenuItem
            icon="shield-checkmark-outline"
            title="Kebijakan Privasi"
            onPress={() => openLink("privacy_policy")}
          />

          <MenuItem
            icon="document-text-outline"
            title="Syarat & Ketentuan Layanan"
            onPress={() => openLink("terms")}
          />

          <MenuItem
            icon="people-outline"
            title="Tentang Kami"
            onPress={() => openLink("about")}
          />

          <MenuItem
            icon="information-circle-outline"
            title="Lisensi & Atribut"
            isLast
            onPress={() => openLink("license")}
          />
        </Section>

        {/* LOGOUT */}
        <View style={styles.logoutCard}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setConfirmLogout(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={22} color="#E53935" />

            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>
        </View>

        {/* APP VERSION */}
        <Text style={styles.versionText}>version 1.1.0</Text>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ALERT ERROR */}
      <CustomAlert
        visible={visible}
        title={title}
        message={message}
        onClose={hideAlert}
      />

      {/* ALERT LOGOUT */}
      <CustomAlert
        visible={confirmLogout}
        title="Keluar"
        message="Apakah kamu yakin ingin keluar?"
        onClose={() => setConfirmLogout(false)}
        onConfirm={handleLogout}
        confirmText="Keluar"
      />
    </>
  );
};

export default ProfileTab;

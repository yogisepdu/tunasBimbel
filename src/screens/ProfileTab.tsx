import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/ProfileStyles";
import MenuItem from "../components/MenuProfile/MenuItem";
import Section from "../components/MenuProfile/Section";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../navigation/ProfileStack";
import { apiFetch } from "../services/api";

import CustomAlert from "../components/CustomAlert";
import { useAlert } from "../hooks/useAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetToLogin } from "../navigation/navigationRef";

type NavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

const ProfileTab: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const { visible, message, title, showAlert, hideAlert } = useAlert();

  const [confirmLogout, setConfirmLogout] = React.useState(false);

  // 🔥 OPEN LINK
  const openLink = async (name: string) => {
    try {
      const res = await apiFetch(`/links/${name}`);
      const url = res?.url;

      if (!url) return showAlert("Link tidak tersedia");

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        showAlert("Tidak bisa membuka link");
      }
    } catch (err: any) {
      showAlert(err?.message || "Terjadi kesalahan");
    }
  };

  // 🔥 LOGOUT
  const handleLogout = async () => {
    try {
      setConfirmLogout(false); // 🔥 tutup modal dulu

      await apiFetch("/logout", { method: "POST" });

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      resetToLogin();
    } catch (err: any) {
      showAlert(err?.message || "Gagal logout");
    }
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />

          <Text style={styles.name}>Yogi Sepdu Dehiya</Text>
          <Text style={styles.email}>yogisepdudehiya@gmail.com</Text>
          <Text style={styles.phone}>+6282252992668</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
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

        {/* INFORMASI */}
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
          >
            <Ionicons name="log-out-outline" size={22} color="#E53935" />
            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>
        </View>

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

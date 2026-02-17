import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/ProfileStyles";
import MenuItem from "../components/MenuProfile/MenuItem";
import Section from "../components/MenuProfile/Section";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../navigation/ProfileStack";

type NavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

const ProfileTab: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
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

      <Section title="Membership">
        <MenuItem icon="gift-outline" title="Bonus Premium" />
        <MenuItem icon="pricetag-outline" title="Klaim Kode Voucher" isLast />
      </Section>

      <Section title="Support">
        <MenuItem icon="help-circle-outline" title="Bantuan / FAQ" />
        <MenuItem icon="alert-circle-outline" title="Laporan Masalah" />
        <MenuItem icon="heart-outline" title="Saran dan Masukan" />
        <MenuItem icon="star-outline" title="Beri Kami Nilai" isLast />
      </Section>

      <Section title="Informasi Lainnya">
        <MenuItem icon="shield-checkmark-outline" title="Kebijakan Privasi" />
        <MenuItem
          icon="document-text-outline"
          title="Syarat & Ketentuan Layanan"
        />
        <MenuItem icon="people-outline" title="Tentang Kami" />
        <MenuItem
          icon="information-circle-outline"
          title="Lisensi & Atribut"
          isLast
        />
      </Section>

      <View style={styles.logoutCard}>
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={22} color="#E53935" />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.versionText}>version 1.1.0</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default ProfileTab;

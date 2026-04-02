import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../assets/styles/EditProfileStyles";
import { Dropdown } from "react-native-element-dropdown";
import { useWilayah } from "../../hooks/useWilayah";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { apiFetch } from "../../services/api";

const EditProfileScreen: React.FC = () => {
  // ========================
  // STATE
  // ========================
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"pria" | "wanita">("pria");
  const [saving, setSaving] = useState(false);

  // ========================
  // WILAYAH
  // ========================
  const {
    provinces,
    regencies,
    districts,
    villages,
    selectedProvince,
    setSelectedProvince,
    selectedRegency,
    setSelectedRegency,
    selectedDistrict,
    setSelectedDistrict,
    selectedVillage,
    setSelectedVillage,
    loading,
  } = useWilayah();

  // ========================
  // LOAD PROFILE
  // ========================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await apiFetch("/profile");

        const user = res.user;
        const profile = res.profile;

        setEmail(user?.email || "");
        setName(profile?.name || "");
        setPhone(profile?.phone || "");
        setGender(profile?.gender || "pria");

        setSelectedProvince(profile?.province_id || null);
        setSelectedRegency(profile?.regency_id || null);
        setSelectedDistrict(profile?.district_id || null);
        setSelectedVillage(profile?.village_id || null);
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Gagal load profil",
          text2: error.message,
        });
      }
    };

    loadProfile();
  }, []);

  // ========================
  // SAVE PROFILE
  // ========================
  const handleSave = async () => {
    if (!name || !phone) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Nama dan nomor WA wajib diisi",
      });
      return;
    }

    try {
      setSaving(true);

      const res = await apiFetch("/profile", {
        method: "POST",
        body: {
          name,
          phone,
          gender,
          province_id: selectedProvince,
          regency_id: selectedRegency,
          district_id: selectedDistrict,
          village_id: selectedVillage,
        },
      });

      // 🔥 update local storage
      const stored = await AsyncStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({ ...user, profile: res.profile }),
        );
      }

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Profil berhasil diperbarui",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Profil</Text>
        </View>

        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* EMAIL */}
        <Text style={styles.label}>Email*</Text>
        <TextInput style={styles.input} value={email} editable={false} />

        {/* NAMA */}
        <Text style={styles.label}>Nama*</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Masukkan nama"
        />

        {/* WA */}
        <Text style={styles.label}>No. Whatsapp*</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Masukkan nomor WA"
          keyboardType="phone-pad"
        />

        {/* GENDER */}
        <Text style={styles.label}>Jenis Kelamin*</Text>
        <View style={styles.genderContainer}>
          {["pria", "wanita"].map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.genderCard, gender === g && styles.genderActive]}
              onPress={() => setGender(g as any)}
            >
              <Ionicons
                name={g === "pria" ? "male" : "female"}
                size={40}
                color={gender === g ? "#fff" : "#1F2A44"}
              />
              <Text
                style={[
                  styles.genderText,
                  gender === g && styles.genderTextActive,
                ]}
              >
                {g === "pria" ? "Pria" : "Wanita"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PROVINSI */}
        <Text style={styles.label}>Provinsi*</Text>
        <Dropdown
          style={styles.dropdown}
          data={provinces}
          labelField="name"
          valueField="id"
          value={selectedProvince}
          onChange={(item) => setSelectedProvince(item.id)}
          placeholder="Pilih Provinsi"
        />

        {/* KABUPATEN */}
        <Text style={styles.label}>Kabupaten*</Text>
        <Dropdown
          style={[
            styles.dropdown,
            !selectedProvince && styles.dropdownDisabled,
          ]}
          data={regencies}
          labelField="name"
          valueField="id"
          value={selectedRegency}
          onChange={(item) => setSelectedRegency(item.id)}
          disable={!selectedProvince}
          placeholder="Pilih Kabupaten"
        />

        {/* KECAMATAN */}
        <Text style={styles.label}>Kecamatan*</Text>
        <Dropdown
          style={[styles.dropdown, !selectedRegency && styles.dropdownDisabled]}
          data={districts}
          labelField="name"
          valueField="id"
          value={selectedDistrict}
          onChange={(item) => setSelectedDistrict(item.id)}
          disable={!selectedRegency}
          placeholder="Pilih Kecamatan"
        />

        {/* KELURAHAN */}
        <Text style={styles.label}>Kelurahan*</Text>
        <Dropdown
          style={[
            styles.dropdown,
            !selectedDistrict && styles.dropdownDisabled,
          ]}
          data={villages}
          labelField="name"
          valueField="id"
          value={selectedVillage}
          onChange={(item) => setSelectedVillage(item.id)}
          disable={!selectedDistrict}
          placeholder="Pilih Kelurahan"
        />

        {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* BUTTON */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, saving && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Simpan</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;

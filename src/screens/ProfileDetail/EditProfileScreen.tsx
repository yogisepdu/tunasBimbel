import React, { useState } from "react";
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

const EditProfileScreen: React.FC = () => {
  // ========================
  // PROFILE STATE
  // ========================
  const [gender, setGender] = useState<"pria" | "wanita">("pria");

  // ========================
  // WILAYAH (DARI HOOK)
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
    postalCode,
    loading,
  } = useWilayah();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Profil</Text>
        </View>

        {/* FOTO PROFIL */}
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
        <TextInput
          style={styles.input}
          value="yogisepdudehiya@gmail.com"
          editable={false}
        />

        {/* NAMA */}
        <Text style={styles.label}>Nama*</Text>
        <TextInput style={styles.input} placeholder="Masukkan nama" />

        {/* NO WA */}
        <Text style={styles.label}>No. Whatsapp*</Text>
        <TextInput style={styles.input} placeholder="Masukkan nomor WA" />

        {/* GENDER */}
        <Text style={styles.label}>Jenis Kelamin*</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderCard,
              gender === "pria" && styles.genderActive,
            ]}
            onPress={() => setGender("pria")}
          >
            <Ionicons
              name="male"
              size={40}
              color={gender === "pria" ? "#fff" : "#1F2A44"}
            />
            <Text
              style={[
                styles.genderText,
                gender === "pria" && styles.genderTextActive,
              ]}
            >
              Pria
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderCard,
              gender === "wanita" && styles.genderActive,
            ]}
            onPress={() => setGender("wanita")}
          >
            <Ionicons
              name="female"
              size={40}
              color={gender === "wanita" ? "#fff" : "#1F2A44"}
            />
            <Text
              style={[
                styles.genderText,
                gender === "wanita" && styles.genderTextActive,
              ]}
            >
              Wanita
            </Text>
          </TouchableOpacity>
        </View>

        {/* PROVINSI */}
        <Text style={styles.label}>Provinsi*</Text>

        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.containerStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          data={provinces}
          search
          maxHeight={300}
          activeColor="#F2F4F7"
          labelField="name"
          valueField="id"
          placeholder="Pilih Provinsi"
          searchPlaceholder="Cari provinsi..."
          value={selectedProvince}
          onChange={(item) => setSelectedProvince(item.id)}
        />

        {/* KABUPATEN */}
        <Text style={styles.label}>Kota/Kabupaten*</Text>

        <Dropdown
          style={[
            styles.dropdown,
            !selectedProvince && styles.dropdownDisabled,
          ]}
          containerStyle={styles.containerStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          data={regencies}
          search
          maxHeight={300}
          activeColor="#F2F4F7"
          labelField="name"
          valueField="id"
          placeholder="Pilih Kabupaten"
          searchPlaceholder="Cari kabupaten..."
          value={selectedRegency}
          onChange={(item) => setSelectedRegency(item.id)}
          disable={!selectedProvince}
        />

        {/* KECAMATAN */}
        <Text style={styles.label}>Kecamatan*</Text>

        <Dropdown
          style={[
            styles.dropdown,
            !selectedRegency && styles.dropdownDisabled,
          ]}
          containerStyle={styles.containerStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          data={districts}
          search
          maxHeight={300}
          activeColor="#F2F4F7"
          labelField="name"
          valueField="id"
          placeholder="Pilih Kecamatan"
          searchPlaceholder="Cari kecamatan..."
          value={selectedDistrict}
          onChange={(item) => setSelectedDistrict(item.id)}
          disable={!selectedRegency}
        />

        {/* KELURAHAN */}
        <Text style={styles.label}>Kelurahan*</Text>

        <Dropdown
          style={[
            styles.dropdown,
            !selectedDistrict && styles.dropdownDisabled,
          ]}
          containerStyle={styles.containerStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          data={villages}
          search
          maxHeight={300}
          activeColor="#F2F4F7"
          labelField="name"
          valueField="id"
          placeholder="Pilih Kelurahan"
          searchPlaceholder="Cari kelurahan..."
          value={selectedVillage}
          onChange={(item) => setSelectedVillage(item.id)}
          disable={!selectedDistrict}
        />

        {loading && (
          <ActivityIndicator
            size="small"
            color="#1F2A44"
            style={{ marginTop: 10 }}
          />
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* BUTTON SIMPAN */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;

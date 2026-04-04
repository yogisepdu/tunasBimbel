import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

import React, { useState } from "react";
import Toast from "react-native-toast-message";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

import InputField from "../components/auth/InputField";
import PasswordField from "../components/auth/PasswordField";
import Checkbox from "../components/auth/Checkbox";
import SocialButton from "../components/auth/SocialButton";

import { apiFetch } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  // 🔥 STATE (BERSIH)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  // 🔥 VALIDASI EMAIL
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // 🔥 REGISTER
  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Semua field wajib diisi",
      });
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      Toast.show({
        type: "error",
        text1: "Email tidak valid",
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password minimal 6 karakter",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password tidak sama",
      });
      return;
    }

    if (!agree) {
      Toast.show({
        type: "error",
        text1: "Harap setujui syarat & ketentuan",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await apiFetch("/register", {
        method: "POST",
        body: {
          name: cleanName,
          email: cleanEmail,
          password,
          password_confirmation: confirmPassword,
        },
      });

    //   console.log("REGISTER SUCCESS:", res);

      // 🔥 TAMPILKAN TOAST DULU
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Akun berhasil dibuat 🎉",
        visibilityTime: 2000,
      });

      // 🔥 DELAY NAVIGATION (LEBIH STABIL)
      setTimeout(() => {
        navigation.replace("Login");
      }, 2000);
    } catch (error: any) {
      if (error.message === "SESSION_EXPIRED") return;

      console.log("REGISTER ERROR:", error);

      Toast.show({
        type: "error",
        text1: "Register gagal",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F2F4F7" }}>
      {/* HEADER */}
      <ImageBackground
        source={require("../../assets/images/register-bg.png")}
        style={{
          height: 220,
          padding: 20,
          justifyContent: "flex-end",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          Buat Akun Baru
        </Text>

        <Text style={{ color: "#eee" }}>
          Mulai belajar lebih mudah bersama TunasBimbel
        </Text>
      </ImageBackground>

      {/* FORM */}
      <View
        style={{
          backgroundColor: "#fff",
          marginTop: -40,
          marginHorizontal: 16,
          borderRadius: 20,
          padding: 20,
          elevation: 5,
        }}
      >
        <InputField
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap Anda"
          icon="person-outline"
          value={name}
          onChangeText={setName}
        />

        <InputField
          label="Email"
          placeholder="contoh@email.com"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
        />

        <PasswordField
          label="Password"
          placeholder="Minimal 6 karakter"
          value={password}
          onChangeText={setPassword}
        />

        <PasswordField
          label="Konfirmasi Password"
          placeholder="Ulangi password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Checkbox value={agree} onChange={setAgree} />

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={{
            backgroundColor: "#2F80ED",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Daftar Sekarang
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* SOCIAL */}
      <View style={{ margin: 20 }}>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>ATAU</Text>

        <SocialButton text="Daftar dengan Google" icon="logo-google" />

        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Sudah punya akun?{" "}
          <Text
            style={{ color: "#2F80ED", fontWeight: "600" }}
            onPress={handleGoToLogin}
          >
            Masuk di sini
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

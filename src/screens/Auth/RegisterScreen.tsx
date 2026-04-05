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
import { RootStackParamList } from "../../navigation/types";

import InputField from "../../components/auth/InputField";
import PasswordField from "../../components/auth/PasswordField";
import Checkbox from "../../components/auth/Checkbox";
import SocialButton from "../../components/auth/SocialButton";

import { apiFetch } from "../../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      return Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Semua field wajib diisi",
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return Toast.show({
        type: "error",
        text1: "Email tidak valid",
      });
    }

    if (password.length < 6) {
      return Toast.show({
        type: "error",
        text1: "Password minimal 6 karakter",
      });
    }

    if (password !== confirmPassword) {
      return Toast.show({
        type: "error",
        text1: "Password tidak sama",
      });
    }

    if (!agree) {
      return Toast.show({
        type: "error",
        text1: "Harap setujui syarat & ketentuan",
      });
    }

    try {
      setLoading(true);

      await apiFetch("/register", {
        method: "POST",
        body: {
          name: cleanName,
          email: cleanEmail,
          password,
          password_confirmation: confirmPassword,
        },
      });

      Toast.show({
        type: "success",
        text1: "Registrasi berhasil",
        text2: "Cek email kamu untuk verifikasi 📩",
      });

      // reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgree(false);

      // redirect ke login + kirim email
      setTimeout(() => {
        navigation.replace("Login", {
          registered: true,
          email: cleanEmail,
        });
      }, 1500);
    } catch (error: any) {
      if (error.message === "SESSION_EXPIRED") return;

      Toast.show({
        type: "error",
        text1: "Register gagal",
        text2: error.message,
      });
      console.log("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F2F4F7" }}>
      <ImageBackground
        source={require("../../../assets/images/register-bg.png")}
        style={{ height: 220, padding: 20, justifyContent: "flex-end" }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          Buat Akun Baru
        </Text>
        <Text style={{ color: "#eee" }}>
          Mulai belajar lebih mudah bersama TunasBimbel
        </Text>
      </ImageBackground>

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

        <TouchableOpacity
          onPress={loading ? undefined : handleRegister}
          style={{
            backgroundColor: "#2F80ED",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <>
              <ActivityIndicator color="#fff" />
              <Text style={{ color: "#fff", marginTop: 5 }}>
                Mendaftarkan...
              </Text>
            </>
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Daftar Sekarang
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ margin: 20 }}>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>ATAU</Text>

        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Sudah punya akun?{" "}
          <Text
            style={{ color: "#2F80ED", fontWeight: "600" }}
            onPress={() => navigation.navigate("Login")}
          >
            Masuk di sini
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

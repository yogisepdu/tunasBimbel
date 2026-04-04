import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../theme/colors";
import { apiFetch } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // 🔥 LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Email dan password wajib diisi",
      });
      return;
    }

    try {
      setLoading(true);

      const data = await apiFetch("/login", {
        method: "POST",
        body: {
          email: email.trim(),
          password,
        },
      });

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      navigation.replace("MainTabs");
    } catch (error: any) {
      if (error.message === "SESSION_EXPIRED") return;

      Toast.show({
        type: "error",
        text1: "Login Gagal",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 NAVIGATE TO REGISTER
  const handleOpenRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.title}>Selamat Datang!</Text>
          <Text style={styles.subtitle}>
            Masuk untuk melanjutkan petualangan belajarmu hari ini.
          </Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Portal Siswa</Text>
          </View>

          {/* EMAIL */}
          <Text style={styles.label}>Email atau Username</Text>
          <View style={styles.input}>
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="nama@email.com"
              value={email}
              onChangeText={setEmail}
              style={styles.inputText}
              autoCapitalize="none"
            />
          </View>

          {/* PASSWORD */}
          <Text style={styles.label}>Kata Sandi</Text>
          <View style={styles.input}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Masukkan sandi anda"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.inputText}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* REMEMBER */}
          <View style={styles.rowBetween}>
            <TouchableOpacity
              style={styles.rememberWrap}
              onPress={() => setRemember(!remember)}
            >
              <Ionicons
                name={remember ? "checkbox" : "square-outline"}
                size={18}
                color={Colors.primary}
              />
              <Text style={styles.remember}>Ingat saya</Text>
            </TouchableOpacity>

            <Text style={styles.forgot}>Lupa Sandi?</Text>
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Masuk Sekarang →</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* REGISTER */}
        <Text style={styles.register}>
          Belum punya akun?{" "}
          <Text style={styles.registerLink} onPress={handleOpenRegister}>
            Daftar
          </Text>
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  header: {
    backgroundColor: "#93c9ab",
    borderRadius: 30,
    padding: 25,
    alignItems: "center",
    marginBottom: -40,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    textAlign: "center",
    color: "#3f3f3f",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },

  badge: {
    alignSelf: "center",
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 15,
  },
  badgeText: {
    color: "#04a80aff",
    fontWeight: "600",
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#374151",
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  inputText: {
    flex: 1,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  rememberWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  remember: {
    color: "#6B7280",
  },

  forgot: {
    color: "#F97316",
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#04a80aff",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  register: {
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
  },

  registerLink: {
    color: "rgb(38, 192, 43)",
    fontWeight: "700",
  },
});

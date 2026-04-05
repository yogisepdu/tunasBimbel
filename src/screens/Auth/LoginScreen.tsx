import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import React, { useEffect, useState } from "react";
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
import Colors from "../../theme/colors";
import { apiFetch } from "../../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation, route }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  // 🔥 HANDLE REGISTER SUCCESS
  useEffect(() => {
    if (route.params?.registered) {
      Toast.show({
        type: "success",
        text1: "Registrasi berhasil",
        text2: "Silakan cek email untuk verifikasi",
      });

      if (route.params?.email) {
        setEmail(route.params.email);
      }
    }
  }, []);

  // 🔥 LOGIN
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

      // 🔥 HANDLE EMAIL BELUM VERIFIED
      if (error.message === "Email belum diverifikasi") {
        setUnverifiedEmail(email.trim());

        Toast.show({
          type: "error",
          text1: "Email belum diverifikasi",
          text2: "Silakan cek email atau kirim ulang",
        });

        return;
      }

      Toast.show({
        type: "error",
        text1: "Login Gagal",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 HANDLE RESEND VERIFICATION
  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;

    try {
      setResendLoading(true);

      await apiFetch("/resend-verification", {
        method: "POST",
        body: {
          email: unverifiedEmail,
        },
      });

      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Email verifikasi telah dikirim ulang 📩",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error.message,
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <Text style={styles.title}>Selamat Datang!</Text>
          <Text style={styles.subtitle}>Masuk untuk melanjutkan belajarmu</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input}>
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.inputText}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.input}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />
            <TextInput
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.inputText}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{ alignSelf: "flex-end", marginTop: 8 }}
          >
            <Text style={{ color: Colors.primary, fontWeight: "600" }}>
              Lupa Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={loading ? undefined : handleLogin}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Masuk</Text>
            )}
          </TouchableOpacity>
        </View>
        {unverifiedEmail ? (
          <TouchableOpacity
            onPress={handleResendVerification}
            disabled={resendLoading}
            style={{
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#F97316", fontWeight: "600" }}>
              {resendLoading
                ? "Mengirim ulang..."
                : "Kirim Ulang Email Verifikasi"}
            </Text>
          </TouchableOpacity>
        ) : null}

        <Text style={styles.register}>
          Belum punya akun?{" "}
          <Text onPress={() => navigation.navigate("Register")}>Daftar</Text>
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  logo: { width: 60, height: 60 },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { color: "#666" },

  card: { backgroundColor: "#fff", padding: 20, borderRadius: 15 },

  label: { marginTop: 10 },
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 10,
  },
  inputText: { flex: 1 },

  button: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },

  register: { textAlign: "center", marginTop: 20 },
});

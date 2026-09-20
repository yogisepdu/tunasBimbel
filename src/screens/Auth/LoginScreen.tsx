import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { RootStackParamList } from "../../navigation/types";
import { apiFetch } from "../../services/api";
import Colors from "../../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation, route }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  // =========================================================
  // REGISTER SUCCESS
  // =========================================================

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

  // =========================================================
  // LOGIN
  // =========================================================

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

      // =====================================================
      // EMAIL BELUM VERIFIED
      // =====================================================

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

  // =========================================================
  // RESEND VERIFICATION
  // =========================================================

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
        {/* ================================================= */}
        {/* BACKGROUND DECORATION */}
        {/* ================================================= */}

        <View pointerEvents="none" style={styles.circleTop} />

        <View pointerEvents="none" style={styles.circleBottom} />

        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <View style={styles.content}>
          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.brandBadge}>
              <View style={styles.brandDot} />

              <Text style={styles.brandText}>TUNAS BIMBEL</Text>
            </View>

            <Text style={styles.title}>Selamat Datang! 👋</Text>

            <Text style={styles.subtitle}>
              Masuk untuk melanjutkan perjalanan belajarmu
            </Text>
          </View>

          {/* ================================================= */}
          {/* LOGIN CARD */}
          {/* ================================================= */}

          <View style={styles.card}>
            {/* Card heading */}

            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>Masuk ke Akun</Text>

                <Text style={styles.cardSubtitle}>
                  Silakan masukkan data akun kamu
                </Text>
              </View>

              <View style={styles.secureIcon}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={21}
                  color={Colors.primary}
                />
              </View>
            </View>

            {/* ================================================= */}
            {/* EMAIL */}
            {/* ================================================= */}

            <Text style={styles.label}>Email</Text>

            <View style={styles.input}>
              <View style={styles.inputIcon}>
                <Ionicons
                  name="mail-outline"
                  size={19}
                  color={Colors.primary}
                />
              </View>

              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.inputText}
                placeholder="Masukkan email kamu"
                placeholderTextColor="#A1A1AA"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>

            {/* ================================================= */}
            {/* PASSWORD */}
            {/* ================================================= */}

            <View style={styles.passwordLabelRow}>
              <Text style={styles.label}>Password</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotPassword}>Lupa Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.input}>
              <View style={styles.inputIcon}>
                <Ionicons
                  name="lock-closed-outline"
                  size={19}
                  color={Colors.primary}
                />
              </View>

              <TextInput
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.inputText}
                placeholder="Masukkan password"
                placeholderTextColor="#A1A1AA"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#8F96A3"
                />
              </TouchableOpacity>
            </View>

            {/* ================================================= */}
            {/* LOGIN BUTTON */}
            {/* ================================================= */}

            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.button, loading && styles.buttonLoading]}
              onPress={loading ? undefined : handleLogin}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#FFFFFF" />

                  <Text style={styles.buttonText}>Memproses...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Masuk</Text>

                  <View style={styles.buttonArrow}>
                    <Ionicons
                      name="arrow-forward"
                      size={17}
                      color={Colors.primary}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>

            {/* ================================================= */}
            {/* SECURITY */}
            {/* ================================================= */}

            <View style={styles.security}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color="#A1A1AA"
              />

              <Text style={styles.securityText}>
                Informasi akun kamu aman dan terlindungi
              </Text>
            </View>
          </View>

          {/* ================================================= */}
          {/* UNVERIFIED EMAIL */}
          {/* ================================================= */}

          {unverifiedEmail ? (
            <View style={styles.verificationCard}>
              <View style={styles.verificationIcon}>
                <Ionicons
                  name="mail-unread-outline"
                  size={22}
                  color="#EA580C"
                />
              </View>

              <View style={styles.verificationBody}>
                <Text style={styles.verificationTitle}>
                  Email belum diverifikasi
                </Text>

                <Text style={styles.verificationDescription}>
                  Silakan cek inbox email kamu atau kirim ulang email
                  verifikasi.
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={resendLoading}
                  onPress={handleResendVerification}
                  style={styles.resendButton}
                >
                  {resendLoading ? (
                    <ActivityIndicator size="small" color="#EA580C" />
                  ) : (
                    <>
                      <Text style={styles.resendText}>Kirim ulang email</Text>

                      <Ionicons
                        name="arrow-forward"
                        size={15}
                        color="#EA580C"
                      />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {/* ================================================= */}
          {/* REGISTER */}
          {/* ================================================= */}

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Belum punya akun?</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.registerLink}>Daftar sekarang</Text>
            </TouchableOpacity>
          </View>

          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <View style={styles.footer}>
            <View style={styles.footerLine} />

            <Text style={styles.footerText}>Tunas Bimbel</Text>

            <View style={styles.footerLine} />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

// =============================================================
// STYLES
// =============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingHorizontal: 20,
    overflow: "hidden",
  },

  content: {
    flex: 1,
  },

  // ===========================================================
  // BACKGROUND
  // ===========================================================

  circleTop: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#EAF1FF",
    top: -145,
    right: -90,
  },

  circleBottom: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#F0EBFF",
    bottom: -100,
    left: -100,
  },

  // ===========================================================
  // HEADER
  // ===========================================================

  header: {
    alignItems: "center",
    paddingTop: 18,
    marginBottom: 23,
  },

  logoContainer: {
    width: 78,
    height: 78,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,

    elevation: 5,

    marginBottom: 11,
  },

  logo: {
    width: 58,
    height: 58,
  },

  brandBadge: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#EDF3FF",

    paddingHorizontal: 11,
    paddingVertical: 5,

    borderRadius: 20,

    marginBottom: 9,
  },

  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,

    backgroundColor: Colors.primary,

    marginRight: 6,
  },

  brandText: {
    fontSize: 9.5,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: Colors.primary,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#737B8C",
    textAlign: "center",
    lineHeight: 19,
    maxWidth: 300,
  },

  // ===========================================================
  // CARD
  // ===========================================================

  card: {
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 19,
    paddingVertical: 20,

    borderRadius: 23,

    borderWidth: 1,
    borderColor: "#EEF0F4",

    shadowColor: "#182033",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.07,
    shadowRadius: 20,

    elevation: 6,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 20,
  },

  cardHeaderText: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#171A21",
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 11.5,
    color: "#9298A4",
  },

  secureIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#EDF3FF",
  },

  // ===========================================================
  // INPUT
  // ===========================================================

  label: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#303541",

    marginBottom: 7,
  },

  passwordLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 2,
  },

  forgotPassword: {
    fontSize: 11.5,
    fontWeight: "700",
    color: Colors.primary,

    marginBottom: 7,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",

    height: 54,

    backgroundColor: "#F7F8FA",

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "#ECEEF2",

    paddingHorizontal: 10,

    marginBottom: 16,
  },

  inputIcon: {
    width: 35,
    height: 35,

    borderRadius: 11,

    backgroundColor: "#EAF1FF",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 9,
  },

  inputText: {
    flex: 1,

    height: 54,

    fontSize: 14,
    color: "#1F2937",

    paddingVertical: 0,
  },

  eyeButton: {
    width: 36,
    height: 42,

    alignItems: "center",
    justifyContent: "center",
  },

  // ===========================================================
  // BUTTON
  // ===========================================================

  button: {
    height: 55,

    borderRadius: 15,

    backgroundColor: Colors.primary,

    marginTop: 2,

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 11,

    elevation: 4,
  },

  buttonLoading: {
    opacity: 0.7,
  },

  buttonContent: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
  },

  loadingContainer: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 14.5,
    fontWeight: "800",
  },

  buttonArrow: {
    width: 29,
    height: 29,

    borderRadius: 9,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 10,
  },

  // ===========================================================
  // SECURITY
  // ===========================================================

  security: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 13,
  },

  securityText: {
    marginLeft: 5,

    fontSize: 10,

    color: "#A1A1AA",
  },

  // ===========================================================
  // VERIFICATION
  // ===========================================================

  verificationCard: {
    flexDirection: "row",

    marginTop: 13,

    padding: 14,

    borderRadius: 18,

    backgroundColor: "#FFF8F2",

    borderWidth: 1,
    borderColor: "#FDE4D0",
  },

  verificationIcon: {
    width: 42,
    height: 42,

    borderRadius: 13,

    backgroundColor: "#FFEDD5",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 11,
  },

  verificationBody: {
    flex: 1,
  },

  verificationTitle: {
    fontSize: 12.5,

    fontWeight: "800",

    color: "#9A3412",
  },

  verificationDescription: {
    marginTop: 3,

    fontSize: 11,

    lineHeight: 16,

    color: "#A16207",
  },

  resendButton: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 7,
  },

  resendText: {
    fontSize: 11.5,

    fontWeight: "800",

    color: "#EA580C",

    marginRight: 5,
  },

  // ===========================================================
  // REGISTER
  // ===========================================================

  registerContainer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 21,
  },

  registerText: {
    fontSize: 12.5,

    color: "#7B8290",
  },

  registerLink: {
    marginLeft: 5,

    fontSize: 12.5,

    fontWeight: "800",

    color: Colors.primary,
  },

  // ===========================================================
  // FOOTER
  // ===========================================================

  footer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 17,
  },

  footerLine: {
    width: 30,
    height: 1,

    backgroundColor: "#E1E5EB",
  },

  footerText: {
    marginHorizontal: 8,

    fontSize: 9,

    color: "#A4AAB5",
  },
});

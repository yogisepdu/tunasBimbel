import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/colors";
import { apiFetch } from "../../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (loading) return; // 🔥 prevent double click

    const trimmedEmail = email.trim();

    // 🔥 VALIDASI KOSONG
    if (!trimmedEmail) {
      Toast.show({
        type: "error",
        text1: "Oops!",
        text2: "Email wajib diisi",
      });
      return;
    }

    // 🔥 VALIDASI FORMAT
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(trimmedEmail)) {
      Toast.show({
        type: "error",
        text1: "Format salah",
        text2: "Masukkan email yang valid",
      });
      return;
    }

    try {
      setLoading(true);

      await apiFetch("/forgot-password", {
        method: "POST",
        body: { email: trimmedEmail },
      });

      Toast.show({
        type: "success",
        text1: "Cek Email 📩",
        text2: "Link reset password sudah dikirim",
      });

      // 🔥 UX: kasih jeda biar user baca
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error: any) {
      console.log("Forgot Password Error:", error);

      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: error?.message || "Terjadi kesalahan, coba lagi nanti",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lupa Password</Text>

        <Text style={styles.subtitle}>
          Masukkan email, kami akan mengirim link reset password
        </Text>

        <View style={styles.input}>
          <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.inputText}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            returnKeyType="send"
            onSubmitEditing={handleSend} // 🔥 enter langsung submit
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            (loading || !email.trim()) && { opacity: 0.6 },
          ]}
          onPress={handleSend}
          disabled={loading || !email.trim()}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Kirim Link Reset</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.info}>
          Setelah menerima email, silakan buka link dan reset password melalui
          browser.
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 20,
  },

  info: {
    textAlign: "center",
    marginTop: 14,
    color: "#9CA3AF",
    fontSize: 12,
    lineHeight: 18,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 12,
  },

  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },

  button: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

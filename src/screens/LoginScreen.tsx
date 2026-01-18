import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Input from "../components/HomeMenu/Input";
import Colors from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (): void => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    navigation.replace("MainTabs");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo */}
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        {/* Header */}
        <Text style={styles.title}>Selamat Datang Kembali! 👋</Text>
        <Text style={styles.subtitle}>
          Masuk dan lanjutkan perjalanan belajarmu
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Masuk ke akun Anda</Text>

          <Input
            placeholder="Masukkan email anda..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Masukkan password anda..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}>Lupa kata sandi ?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Masuk</Text>
          </TouchableOpacity>

          <Text style={styles.registerText}>
            Belum punya akun? <Text style={styles.registerLink}>Daftar</Text>
          </Text>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Persiapkan Masa Depanmu dengan Belajar yang Berkualitas! 🎓
          </Text>
          <Text style={styles.infoText}>
            Bersama Kami, Raih Prestasi Terbaikmu! ⭐
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2026 Tunas Bimbel. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.textDark,
  },
  subtitle: {
    textAlign: "center",
    color: Colors.textLight,
    marginBottom: 30,
  },
  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    color: Colors.textDark,
  },
  forgot: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: Colors.secondary,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerText: {
    textAlign: "center",
    marginTop: 15,
    color: Colors.textLight,
  },
  registerLink: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#E9FFD6",
    padding: 15,
    borderRadius: 15,
    marginTop: 30,
  },
  infoText: {
    textAlign: "center",
    color: Colors.textDark,
    marginBottom: 5,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 30,
  },
});

export default LoginScreen;

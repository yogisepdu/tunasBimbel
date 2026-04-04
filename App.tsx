import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "./src/navigation/types";
import { navigationRef } from "./src/navigation/navigationRef";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import KalenderScreen from "./src/screens/KalenderScreen";
import RedirectScreen from "./src/screens/redirect/redirectScreen";
import EbookDetailScreen from "./src/screens/Ebook/EbookDetailScreen";
import MateriDetailScreen from "./src/screens/Ebook/MateriDetailScreen";
import QuizScreen from "./src/screens/Quiz/QuizScreen";
import ResultScreen from "./src/screens/Quiz/ResultScreen";
import SoalWarningScreen from "./src/screens/Soal/SoalWarningScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import Toast from "react-native-toast-message";
import CustomToast from "./src/components/CustomToast";

// 🔥 CUSTOM TOAST CONFIG
const toastConfig = {
  error: (props: any) => <CustomToast {...props} />,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<"Login" | "MainTabs">(
    "Login",
  );
  const [loading, setLoading] = useState(true);

  // 🔑 LOAD FONT
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  // 🔥 AUTO LOGIN CHECK
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          setInitialRoute("MainTabs");
        }
      } catch (error) {
        console.log("Check login error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  // ⏳ LOADING SCREEN
  if (!fontsLoaded || loading) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#22C1DC" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          {/* AUTH */}
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* REDIRECT */}
          <Stack.Screen name="Redirect" component={RedirectScreen} />

          {/* MAIN */}
          <Stack.Screen name="MainTabs" component={HomeScreen} />

          {/* OTHERS */}
          <Stack.Screen name="Kalender" component={KalenderScreen} />

          {/* EBOOK */}
          <Stack.Screen name="EbookDetail" component={EbookDetailScreen} />
          <Stack.Screen name="MateriDetail" component={MateriDetailScreen} />

          {/* QUIZ */}
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="SoalWarning" component={SoalWarningScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* 🔥 GLOBAL TOAST (WAJIB PAKAI CONFIG) */}
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}

// 🎨 STYLE
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
});

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "./src/navigation/types";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import KalenderScreen from "./src/screens/KalenderScreen";
import RedirectScreen from "./src/screens/redirect/redirectScreen";
import EbookDetailScreen from "./src/screens/Ebook/EbookDetailScreen";
import MateriDetailScreen from "./src/screens/Ebook/MateriDetailScreen";
import QuizScreen from "./src/screens/Quiz/QuizScreen";
import ResultScreen from "./src/screens/Quiz/ResultScreen";
import SoalWarningScreen from "./src/screens/Soal/SoalWarningScreen";

import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<"Login" | "MainTabs">(
    "Login",
  );
  const [loading, setLoading] = useState(true);

  // 🔑 PRELOAD FONT IONICONS
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  // 🔥 CHECK TOKEN UNTUK AUTO LOGIN
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

  // ⏳ TAHAN RENDER SEBELUM FONT DAN TOKEN CHECK SELESAI
  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          {/* AUTH */}
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* REDIRECT */}
          <Stack.Screen name="Redirect" component={RedirectScreen} />

          {/* MAIN APP */}
          <Stack.Screen name="MainTabs" component={HomeScreen} />

          {/* NON TAB SCREENS */}
          <Stack.Screen name="Kalender" component={KalenderScreen} />

          {/* EBOOK */}
          <Stack.Screen name="EbookDetail" component={EbookDetailScreen} />
          <Stack.Screen name="MateriDetail" component={MateriDetailScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="SoalWarning" component={SoalWarningScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* GLOBAL TOAST */}
      <Toast />
    </SafeAreaProvider>
  );
}

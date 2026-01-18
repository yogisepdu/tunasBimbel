import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "./types";

// Screens
import LoginScreen from "../screens/LoginScreen";
import RedirectScreen from "../screens/redirect/redirectScreen";

// Bottom Tabs
import MainTabs from "../screens/HomeScreen";

import QuizScreen from "../screens/Quiz/QuizScreen";

// Other screens
import KalenderScreen from "../screens/KalenderScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* AUTH */}
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* REDIRECT (REUSABLE) */}
      <Stack.Screen name="Redirect" component={RedirectScreen} />
      {/* MAIN APP */}
      <Stack.Screen name="MainTabs" component={MainTabs} />

      <Stack.Screen name="Quiz" component={QuizScreen} />
      {/* OTHER SCREENS */}
    </Stack.Navigator>
  );
}

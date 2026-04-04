import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

import HomeTab from "./HomeTab";
import EbookTab from "./EbookTab";
import AktivitasTab from "./AktivitasTab";
import ProfileStack from "../navigation/ProfileStack";
import Colors from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "HomeTab":
              iconName = focused ? "home" : "home-outline";
              break;
            case "EbookTab":
              iconName = focused ? "book" : "book-outline";
              break;
            case "AktivitasTab":
              iconName = focused ? "pulse" : "pulse-outline";
              break;
            case "ProfileTab":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },

        tabBarLabel: ({ focused, color }) => {
          let label = "";

          switch (route.name) {
            case "HomeTab":
              label = "Home";
              break;
            case "EbookTab":
              label = "Ebook";
              break;
            case "AktivitasTab":
              label = "Aktivitas";
              break;
            case "ProfileTab":
              label = "Profil";
              break;
          }

          return (
            <Text
              style={{
                fontSize: 11,
                color,
                marginBottom: 4,
                fontWeight: focused ? "600" : "400",
              }}
            >
              {label}
            </Text>
          );
        },

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#9CA3AF",
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeTab} />
      <Tab.Screen name="EbookTab" component={EbookTab} />
      <Tab.Screen name="AktivitasTab" component={AktivitasTab} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingTop: 6,
    borderTopWidth: 0.5,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
});

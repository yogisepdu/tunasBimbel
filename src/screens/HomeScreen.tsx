import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeTab from "./HomeTab";
import EbookTab from "./EbookTab";
import AktivitasTab from "./AktivitasTab";
import ProfileTab from "./ProfileTab";
import Colors from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          height: 80,
          paddingBottom: 6,
        },
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
              iconName = focused ? "list" : "list-outline";
              break;
            case "ProfileTab":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="EbookTab"
        component={EbookTab}
        options={{ title: "E-Book" }}
      />
      <Tab.Screen
        name="AktivitasTab"
        component={AktivitasTab}
        options={{ title: "Aktivitas" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
}

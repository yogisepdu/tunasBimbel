import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RedirectScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { targetTab, initialInnerTab } = route.params as {
    targetTab: string;
    initialInnerTab?: "materi" | "soal";
  };

  useEffect(() => {
    navigation.replace("MainTabs", {
      screen: targetTab,
      params: {
        initialInnerTab,
      },
    });
  }, []);

  return null;
}

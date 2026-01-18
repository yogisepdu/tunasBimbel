import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/types";

export type MenuBadge = "NEW" | "HOT" | undefined;

export type MenuItemType = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: keyof RootStackParamList;
  params?: {
    targetTab: string;
    initialInnerTab?: "materi" | "soal";
  };
  badge?: MenuBadge;
};

export const menus: MenuItemType[] = [
  { label: "Peta Seleksi", icon: "map", route: "PetaSeleksi" },
  {
    label: "Latsol",
    icon: "pencil",
    route: "Redirect",
    params: {
      targetTab: "EbookTab",
      initialInnerTab: "soal",
    },
  },
  {
    label: "Materi",
    icon: "book",
    route: "Redirect",
    params: { targetTab: "EbookTab", initialInnerTab: "materi" },
  },
  {
    label: "Informasi Beasiswa",
    icon: "school",
    route: "Beasiswa",
    badge: "HOT",
  },
  { label: "Informasi Kampus", icon: "business", route: "Kalender" },
  { label: "Grup Mentoring", icon: "people", route: "GrupGratis" },
  { label: "Analisis Skor", icon: "analytics", route: "Analisis" },
  { label: "Kalender", icon: "calendar", route: "Kalender" },
];

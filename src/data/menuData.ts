import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/types";

export type MenuBadge = "NEW" | "HOT" | undefined;

export type MenuItemType = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: keyof RootStackParamList;
  params?: {
    targetTab: string;
    initialInnerTab?: "materi" | "soal";
  };
  badge?: MenuBadge;
  externalKey?: string;
};

export const menus: MenuItemType[] = [
  {
    label: "Peta Seleksi",
    icon: "map",
    externalKey: "peta_seleksi",
  },
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
    externalKey: "informasi_beasiswa",
    badge: "HOT",
  },
  {
    label: "Informasi Kampus",
    icon: "business",
    externalKey: "informasi_kampus",
  },
  {
    label: "Grup Mentoring",
    icon: "people",
    externalKey: "grup_mentoring",
  },
  { label: "Analisis Skor", icon: "analytics", route: "Analisis" },
  { label: "Kalender", icon: "calendar", route: "Kalender" },
];

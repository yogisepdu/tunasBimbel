import { Ionicons } from "@expo/vector-icons";

export type EbookType = {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  type: "materi" | "soal";
  mapel?: string;
  pdfUrl?: string;
};

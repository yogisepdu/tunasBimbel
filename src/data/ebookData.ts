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

export const ebookData: EbookType[] = [
  {
    id: "1",
    title: "Mutasi",
    subject: "Biologi",
    date: "Selasa, 19 Februari 2026",
    duration: "20:30",
    icon: "leaf",
    color: "#F59E0B",
    type: "materi",
    mapel: "TAP",
  },
  {
    id: "2",
    title: "Trigonometri",
    subject: "Matematika Peminatan",
    date: "Selasa, 19 Februari 2026",
    duration: "10:00",
    icon: "calculator",
    color: "#8B5CF6",
    type: "materi",
  },
  {
    id: "3",
    title: "Latihan Trigonometri",
    subject: "Matematika",
    date: "Senin, 18 Februari 2026",
    duration: "15 Soal",
    icon: "create",
    color: "#22C55E",
    type: "soal",
  },
];

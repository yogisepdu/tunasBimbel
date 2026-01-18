export type AgendaType = {
  date: string; // format YYYY-MM-DD
  title: string;
  description: string;
};

export const kalenderAgenda: AgendaType[] = [
  {
    date: "2026-03-01",
    title: "Pendaftaran Dibuka",
    description: "Pendaftaran beasiswa SDMPKS resmi dibuka",
  },
  {
    date: "2026-04-10",
    title: "Tryout Nasional",
    description: "Tryout persiapan seleksi SDMPKS",
  },
  {
    date: "2026-05-02",
    title: "Tes Seleksi",
    description: "Tes seleksi tahap utama SDMPKS",
  },
  {
    date: "2026-05-20",
    title: "Pengumuman Hasil",
    description: "Pengumuman kelulusan peserta SDMPKS",
  },
];

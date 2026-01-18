type ChapterItem = {
  id: string;
  type: "video" | "rangkuman" | "kuis";
  isDone?: boolean;
};

export function isItemLocked(item: ChapterItem, chapterItems: ChapterItem[]) {
  const index = chapterItems.findIndex((i) => i.id === item.id);

  if (index === -1) return true;

  /* =====================
     1️⃣ VIDEO
     ===================== */
  if (item.type === "video") {
    // cari video sebelumnya
    for (let i = index - 1; i >= 0; i--) {
      if (chapterItems[i].type === "video") {
        return chapterItems[i].isDone !== true;
      }
    }
    // video pertama selalu terbuka
    return false;
  }

  /* =====================
     2️⃣ RANGKUMAN
     ===================== */
  if (item.type === "rangkuman") {
    // rangkuman tergantung video tepat sebelumnya
    for (let i = index - 1; i >= 0; i--) {
      if (chapterItems[i].type === "video") {
        return chapterItems[i].isDone !== true;
      }
    }
    // jika tidak ada video sebelumnya (edge case)
    return false;
  }

  /* =====================
     3️⃣ KUIS
     ===================== */
  if (item.type === "kuis") {
    // kuis terbuka jika semua materi selesai
    return chapterItems.some((i) => i.type !== "kuis" && i.isDone !== true);
  }

  return true;
}

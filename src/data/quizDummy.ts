export type QuizOption = {
  key: "A" | "B" | "C" | "D" | "E";
  text: string;
};

export type QuizQuestion = {
  id: number;
  category: "TWK" | "TIU" | "TKP";
  subCategory?: string;
  text: string;
  options: QuizOption[];
  correctAnswer: QuizOption["key"];
};

export const quizDummy: QuizQuestion[] = [
  {
    id: 1,
    category: "TWK",
    subCategory: "Nasionalisme",
    text: "Sarekat Dagang Islam (SDI) merupakan organisasi yang berperan penting dalam sejarah nasionalisme Indonesia pada awal abad ke-20. Berikut adalah pernyataan tentang SDI, kecuali:",
    options: [
      {
        key: "A",
        text: "SDI didirikan pada tahun 1905 di Surabaya sebagai respons terhadap ketidakpuasan terhadap pemerintah kolonial Belanda.",
      },
      {
        key: "B",
        text: "SDI mengedepankan semangat kebersamaan dan persatuan umat Islam di Hindia Belanda.",
      },
      {
        key: "C",
        text: "Tokoh yang berperan dalam pendirian SDI antara lain H. O. S. Tjokroaminoto dan Sartono.",
      },
      {
        key: "D",
        text: "SDI aktif dalam menyuarakan nasionalisme dan perlawanan terhadap pemerintah kolonial Belanda.",
      },
      {
        key: "E",
        text: "SDI lebih fokus pada aspek perdagangan dan keagamaan, bukan nasionalisme.",
      },
    ],
    correctAnswer: "C",
  },

  {
    id: 2,
    category: "TWK",
    subCategory: "Pancasila",
    text: "Nilai yang terkandung dalam sila kedua Pancasila adalah …",
    options: [
      { key: "A", text: "Persatuan dan kesatuan bangsa" },
      { key: "B", text: "Keadilan sosial bagi seluruh rakyat Indonesia" },
      { key: "C", text: "Kemanusiaan yang adil dan beradab" },
      { key: "D", text: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan" },
      { key: "E", text: "Ketuhanan Yang Maha Esa" },
    ],
    correctAnswer: "C",
  },

  {
    id: 3,
    category: "TWK",
    subCategory: "UUD 1945",
    text: "Perubahan UUD 1945 dilakukan sebanyak …",
    options: [
      { key: "A", text: "Satu kali" },
      { key: "B", text: "Dua kali" },
      { key: "C", text: "Tiga kali" },
      { key: "D", text: "Empat kali" },
      { key: "E", text: "Lima kali" },
    ],
    correctAnswer: "D",
  },

  {
    id: 4,
    category: "TWK",
    subCategory: "NKRI",
    text: "Bentuk Negara Kesatuan Republik Indonesia ditegaskan dalam UUD 1945 Pasal …",
    options: [
      { key: "A", text: "Pasal 1 ayat (1)" },
      { key: "B", text: "Pasal 2 ayat (1)" },
      { key: "C", text: "Pasal 3 ayat (1)" },
      { key: "D", text: "Pasal 18 ayat (1)" },
      { key: "E", text: "Pasal 37 ayat (5)" },
    ],
    correctAnswer: "A",
  },

  {
    id: 5,
    category: "TWK",
    subCategory: "Bhinneka Tunggal Ika",
    text: "Makna semboyan Bhinneka Tunggal Ika adalah …",
    options: [
      { key: "A", text: "Berbeda-beda tetapi tetap satu jua" },
      { key: "B", text: "Persatuan dalam keberagaman budaya" },
      { key: "C", text: "Kesatuan wilayah Indonesia" },
      { key: "D", text: "Keragaman suku bangsa" },
      { key: "E", text: "Kebersamaan dalam pembangunan" },
    ],
    correctAnswer: "A",
  },
];

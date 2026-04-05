export type RootStackParamList = {
  Login:
    | {
        registered?: boolean;
        email?: string;
      }
    | undefined;

  Register: undefined;

  MainTabs:
    | {
        screen?: string;
      }
    | undefined;

  ForgotPassword: undefined;

  Redirect: {
    targetTab: string;
  };

  EbookDetail: {
    chapterId: string;
    title: string;
    subtitle?: string;
    progress: number;
    videoUrl: string;
  };

  MateriDetail: {
    title: string;
    pdfUrl: string;
  };

  VideoDetail: {
    chapterId: string;
    title: string;
    youtubeId: string;
  };

  // 🔥 FIX BESAR
  Quiz: {
    source: "quiz" | "soal";

    // quiz
    chapterId?: string;
    quizId?: number;

    // soal
    setId?: number;
  };

  SoalWarning: {
    soalId: number;
    title: string;
    duration: string;
    totalSoal: number;
  };

  Result: {
    source: "quiz" | "soal";

    quizId: number; // universal id
    setId?: number; // 🔥 TAMBAHAN

    title: string;
    total: number;
    correct: number;
    wrong: number;
    empty: number;
    score: number;

    userAnswers: {
      questionId: number;
      selectedAnswer?: string;
    }[];
  };

  Kalender: undefined;
  EditProfile: undefined;
};

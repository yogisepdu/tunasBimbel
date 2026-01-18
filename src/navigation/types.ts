export type RootStackParamList = {
  Login: undefined;

  MainTabs:
    | {
        screen?: string;
      }
    | undefined;

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

  Quiz: {
    quizId: string;
    chapterId?: string;
    source: "quiz" | "soal";
  };

  SoalWarning: {
    soalId: string;
    title: string;
    duration: string;
    totalSoal: number;
  };

  Result: {
    quizId: string;
    source: "quiz" | "soal";
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
};

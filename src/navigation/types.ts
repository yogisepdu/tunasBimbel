import {
  AssessmentQuestion,
  AssessmentReviewItem,
} from "../types/AssessmentType";

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
    videoUrl?: string;
  };

  MateriDetail: {
    title: string;
    pdfUrl: string;

    /**
     * ID asli materi_pdfs.
     */
    resourceId?: number;

    /**
     * true untuk file pada private storage.
     */
    requiresAuth?: boolean;
  };

  VideoDetail: {
    chapterId: string;
    title: string;
    youtubeId?: string;
    videoUrl?: string;
    sourceType?: "youtube" | "private_file";
    requiresAuth?: boolean;
  };

  Quiz: {
    source: "quiz" | "soal";

    chapterId?: string;

    quizId?: number;

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

    chapterId?: number;

    quizId: number;

    setId?: number;

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

    /**
     * Questions TANPA correctAnswer.
     */
    questions?: AssessmentQuestion[];

    /**
     * Kunci jawaban baru dikirim backend SETELAH submit.
     */
    review?: AssessmentReviewItem[];
  };

  Kalender: undefined;

  EditProfile: undefined;
};

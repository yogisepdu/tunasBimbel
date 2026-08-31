export type AssessmentSource = "quiz" | "soal";

export type AssessmentOption = {
  key: string;
  text: string;
};

export type AssessmentQuestion = {
  id: number;
  text: string;
  options: AssessmentOption[];
  category?: string | null;
  subCategory?: string | null;
  image?: string | null;
};

export type AssessmentAttemptResponse = {
  quiz_id?: number;
  set_id?: number;
  title: string;
  duration: number;
  attempt_token: string;
  started_at: string;
  expires_at: string;
  questions: AssessmentQuestion[];
};

export type AssessmentReviewItem = {
  question_id: number;
  selected_answer: string | null;
  correct_answer: string;
  is_correct: boolean;
};

export type AssessmentResultData = {
  result_id: number;
  quiz_id?: number;
  soal_set_id?: number;
  score: number;
  correct: number;
  wrong: number;
  empty: number;
  review: AssessmentReviewItem[];
};

export type AssessmentSubmitResponse = {
  message: string;
  data: AssessmentResultData;
};

export type AnswerPayload = Record<number, string>;

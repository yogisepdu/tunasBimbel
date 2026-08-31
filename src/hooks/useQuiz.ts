import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useRef, useState } from "react";
import { getQuizQuestions } from "../services/quizService";
import { getSoalQuestions } from "../services/soalService";
import {
  AnswerPayload,
  AssessmentQuestion,
  AssessmentSource,
} from "../types/AssessmentType";

type SavedProgress = {
  attemptToken: string;
  currentIndex: number;
  answers: Record<number, string>;
};

const STORAGE_KEY = (id: string | number, source: AssessmentSource) =>
  `assessment_progress_${source}_${id}`;

type QuizMeta = {
  id: number;
  title: string;
  duration: number;
  attemptToken: string;
  startedAt: string;
  expiresAt: string;
};

export function useQuiz(
  sourceId: string | number | null | undefined,
  source: AssessmentSource,
  enabled: boolean = true,
) {
  const [meta, setMeta] = useState<QuizMeta>({
    id: 0,
    title: "",
    duration: 0,
    attemptToken: "",
    startedAt: "",
    expiresAt: "",
  });

  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [timeLeft, setTimeLeft] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [isTimeUp, setIsTimeUp] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const numericId = useMemo(() => {
    if (sourceId === null || sourceId === undefined) {
      return 0;
    }

    if (typeof sourceId === "number") {
      return sourceId;
    }

    return Number(sourceId.replace("c-", ""));
  }, [sourceId]);

  useEffect(() => {
    if (!enabled || !numericId || Number.isNaN(numericId)) {
      return;
    }

    let mounted = true;

    const loadAssessment = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsTimeUp(false);

        const response =
          source === "quiz"
            ? await getQuizQuestions(numericId)
            : await getSoalQuestions(numericId);

        if (!mounted) return;

        const attemptToken = response.attempt_token;

        const expiresAt = response.expires_at;

        const id =
          source === "quiz"
            ? Number(response.quiz_id ?? 0)
            : Number(response.set_id ?? numericId);

        setMeta({
          id,
          title: response.title ?? (source === "quiz" ? "Quiz" : "Try Out"),
          duration: Number(response.duration ?? 0) * 60,
          attemptToken,
          startedAt: response.started_at,
          expiresAt,
        });

        setQuestions(response.questions ?? []);

        const savedRaw = await AsyncStorage.getItem(
          STORAGE_KEY(numericId, source),
        );

        if (savedRaw && mounted) {
          try {
            const saved: SavedProgress = JSON.parse(savedRaw);

            if (saved.attemptToken === attemptToken) {
              setCurrentIndex(saved.currentIndex ?? 0);

              setAnswers(saved.answers ?? {});
            } else {
              await AsyncStorage.removeItem(STORAGE_KEY(numericId, source));

              setCurrentIndex(0);
              setAnswers({});
            }
          } catch {
            await AsyncStorage.removeItem(STORAGE_KEY(numericId, source));

            setCurrentIndex(0);
            setAnswers({});
          }
        }

        const remainingSeconds = Math.max(
          0,
          Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000),
        );

        setTimeLeft(remainingSeconds);

        if (remainingSeconds <= 0) {
          setIsTimeUp(true);
        }
      } catch (err: any) {
        if (!mounted) return;

        setError(err?.message ?? "Gagal memuat soal.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAssessment();

    return () => {
      mounted = false;
    };
  }, [enabled, numericId, source]);

  useEffect(() => {
    if (!enabled || !meta.expiresAt) {
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const updateTimer = () => {
      const remainingSeconds = Math.max(
        0,
        Math.ceil((new Date(meta.expiresAt).getTime() - Date.now()) / 1000),
      );

      setTimeLeft(remainingSeconds);

      if (remainingSeconds <= 0) {
        setIsTimeUp(true);

        if (timerRef.current) {
          clearInterval(timerRef.current);

          timerRef.current = null;
        }
      }
    };

    updateTimer();

    timerRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);

        timerRef.current = null;
      }
    };
  }, [enabled, meta.expiresAt]);

  useEffect(() => {
    if (!enabled || !numericId || !meta.attemptToken) {
      return;
    }

    const save = async () => {
      const payload: SavedProgress = {
        attemptToken: meta.attemptToken,
        currentIndex,
        answers,
      };

      await AsyncStorage.setItem(
        STORAGE_KEY(numericId, source),
        JSON.stringify(payload),
      );
    };

    save();
  }, [enabled, numericId, source, meta.attemptToken, currentIndex, answers]);

  const selectAnswer = (option: string) => {
    setAnswers((previous) => ({
      ...previous,
      [currentIndex]: option,
    }));
  };

  const buildAnswerPayload = (): AnswerPayload => {
    const payload: AnswerPayload = {};

    questions.forEach((question, index) => {
      const selected = answers[index];

      if (selected) {
        payload[question.id] = selected;
      }
    });

    return payload;
  };

  const userAnswers = useMemo(
    () =>
      questions.map((question, index) => ({
        questionId: question.id,
        selectedAnswer: answers[index],
      })),
    [questions, answers],
  );

  const clearSavedProgress = async () => {
    if (!numericId) return;

    await AsyncStorage.removeItem(STORAGE_KEY(numericId, source));
  };

  return {
    meta,
    questions,
    question: questions[currentIndex],
    total: questions.length,
    currentIndex,
    answers,
    timeLeft,
    loading,
    error,
    isTimeUp,
    setCurrentIndex,
    selectAnswer,
    buildAnswerPayload,
    userAnswers,
    clearSavedProgress,
  };
}

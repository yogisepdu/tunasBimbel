import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getQuizQuestions } from "../services/quizService";

type QuizSource = "quiz" | "soal";

const STORAGE_KEY = (chapterId: string, source: QuizSource) =>
  `quiz_progress_${source}_${chapterId}`;

type SavedProgress = {
  currentIndex: number;
  answers: Record<number, string>;
  timeLeft: number;
};

export function useQuiz(
  chapterId: string,
  source: QuizSource,
  onTimeUp?: (result: any) => void,
) {
  const [meta, setMeta] = useState({
    id: 0,
    title: "",
    duration: 0,
  });

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);

  const hasSubmitted = useRef(false);

  // ================= LOAD QUIZ =================
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const numericChapterId =
          typeof chapterId === "string"
            ? Number(chapterId.replace("c-", ""))
            : chapterId;

        const res = await getQuizQuestions(numericChapterId);

        setMeta({
          id: res.quiz_id,
          title: res.title,
          duration: res.duration * 60,
        });

        setQuestions(res.questions || []);
        setTimeLeft(res.duration * 60);
      } catch (err) {
        console.log("quiz load error:", err);
      }
    };

    loadQuiz();
  }, [chapterId]);

  // ================= RESUME PROGRESS =================
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY(chapterId, source));

      if (saved) {
        const data: SavedProgress = JSON.parse(saved);

        setCurrentIndex(data.currentIndex);
        setAnswers(data.answers);
        setTimeLeft(data.timeLeft);
      }
    })();
  }, [chapterId, source]);

  // ================= TIMER =================
  useEffect(() => {
    if (!meta.duration) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);

          if (!hasSubmitted.current) {
            hasSubmitted.current = true;
            const result = submitQuiz();
            onTimeUp?.(result);
          }

          return 0;
        }

        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [meta.duration]);

  // ================= AUTO SAVE =================
  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY(chapterId, source),
      JSON.stringify({
        currentIndex,
        answers,
        timeLeft,
      }),
    );
  }, [currentIndex, answers, timeLeft]);

  const selectAnswer = (opt: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: opt,
    }));
  };

  const clearProgress = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY(chapterId, source));
  };

  // ================= SUBMIT QUIZ =================
  const submitQuiz = () => {
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    const userAnswers = questions.map((q, index) => {
      const selected = answers[index];

      if (!selected) empty++;
      else if (selected === q.correctAnswer) correct++;
      else wrong++;

      return {
        questionId: q.id,
        selectedAnswer: selected,
      };
    });

    const score = questions.length
      ? Math.round((correct / questions.length) * 100)
      : 0;

    clearProgress();

    return {
      chapterId,
      quizId: meta.id,
      source,
      title: meta.title,
      total: questions.length,
      correct,
      wrong,
      empty,
      score,
      userAnswers,
    };
  };

  return {
    meta,
    question: questions.length > 0 ? questions[currentIndex] : null,
    total: questions.length,
    currentIndex,
    answers,
    timeLeft,
    setCurrentIndex,
    selectAnswer,
    submitQuiz,
  };
}

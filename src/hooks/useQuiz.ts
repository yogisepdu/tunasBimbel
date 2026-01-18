import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { quizMeta } from "../data/quizCard";
import { quizDummy } from "../data/quizDummy";
import { soalDummy } from "../data/soalDummy";

type QuizSource = "quiz" | "soal";

const STORAGE_KEY = (quizId: string, source: QuizSource) =>
  `quiz_progress_${source}_${quizId}`;

type SavedProgress = {
  currentIndex: number;
  answers: Record<number, string>;
  timeLeft: number;
};

export function useQuiz(
  quizId: string,
  source: QuizSource,
  onTimeUp?: (result: any) => void,
) {
  const questions = source === "soal" ? soalDummy : quizDummy;
  const meta = quizMeta;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(meta.duration);

  const hasSubmitted = useRef(false);

  // 🔄 RESUME
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY(quizId, source));
      if (saved) {
        const data: SavedProgress = JSON.parse(saved);
        setCurrentIndex(data.currentIndex);
        setAnswers(data.answers);
        setTimeLeft(data.timeLeft);
      }
    })();
  }, [quizId, source]);

  // ⏱ TIMER
  useEffect(() => {
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
  }, []);

  // 💾 AUTO SAVE
  useEffect(() => {
    AsyncStorage.setItem(
      STORAGE_KEY(quizId, source),
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
    await AsyncStorage.removeItem(STORAGE_KEY(quizId, source));
  };

  // ✅ FINAL SUBMIT (INI KUNCI)
  const submitQuiz = () => {
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    const userAnswers = questions.map((q: any, index) => {
      const selected = answers[index];

      if (!selected) empty++;
      else if (selected === q.correctAnswer) correct++;
      else wrong++;

      return {
        questionId: q.id ?? index + 1,
        selectedAnswer: selected,
      };
    });

    const score = Math.round((correct / questions.length) * 100);

    clearProgress();

    return {
      quizId,
      source,
      title: meta.title,
      total: questions.length,
      correct,
      wrong,
      empty,
      score,
      userAnswers, // 🔥 INI YANG SEBELUMNYA HILANG
    };
  };

  return {
    meta,
    question: questions[currentIndex],
    total: questions.length,
    currentIndex,
    answers,
    timeLeft,
    setCurrentIndex,
    selectAnswer,
    submitQuiz,
  };
}

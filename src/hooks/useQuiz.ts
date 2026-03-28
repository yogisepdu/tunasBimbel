import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getQuizQuestions } from "../services/quizService";
import { apiFetch } from "../services/api";

type QuizSource = "quiz" | "soal";

const STORAGE_KEY = (chapterId: string | number, source: QuizSource) =>
  `quiz_progress_${source}_${chapterId}`;

export function useQuiz(
  chapterId: string | number,
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

  // ================= LOAD =================
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const id = Number(
          typeof chapterId === "string"
            ? chapterId.replace("c-", "")
            : chapterId,
        );

        // console.log("🔥 FETCH SOAL ID:", id, "SOURCE:", source);

        // ❌ GUARD biar gak error lagi
        if (!id || isNaN(id)) {
          console.log("❌ ID INVALID:", chapterId);
          return;
        }

        // ================= SOAL =================
        if (source === "soal") {
          const res = await apiFetch(`/soal-sets/${id}/questions`);

          const mapped = res.questions.map((q: any) => ({
            id: q.id,
            text: q.text,
            options: q.options.map((opt: any) => ({
              key: opt.key,
              text: opt.text,
            })),
            correctAnswer: q.correctAnswer,
          }));

          setQuestions(mapped);

          setMeta({
            id: res.set_id ?? id,
            title: res.title ?? "Try Out",
            duration: (res.duration ?? 0) * 60,
          });

          setTimeLeft((res.duration ?? 0) * 60);

          return;
        }

        // ================= QUIZ =================
        const res = await getQuizQuestions(id);

        const mapped = (res.questions || []).map((q: any) => ({
          id: q.id,
          text: q.text,
          options: (q.options || []).map((opt: any) => ({
            key: opt.key ?? opt.option_key ?? opt.label,
            text: opt.text ?? opt.option_text ?? opt.value,
          })),
          correctAnswer: q.correctAnswer ?? q.correct_answer,
        }));

        setQuestions(mapped);

        setMeta({
          id: res.quiz_id,
          title: res.title,
          duration: res.duration * 60,
        });

        setTimeLeft(res.duration * 60);
      } catch (err) {
        console.log("quiz load error:", err);
      }
    };

    loadQuiz();
  }, [chapterId, source]);

  // ================= RESUME (QUIZ ONLY) =================
  useEffect(() => {
    if (source !== "quiz") return;

    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY(chapterId, source));

      if (saved) {
        const data = JSON.parse(saved);
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

  // ================= SAVE (QUIZ ONLY) =================
  useEffect(() => {
    if (source !== "quiz") return;

    AsyncStorage.setItem(
      STORAGE_KEY(chapterId, source),
      JSON.stringify({
        currentIndex,
        answers,
        timeLeft,
      }),
    );
  }, [currentIndex, answers, timeLeft]);

  // ================= LOGIC =================
  const selectAnswer = (opt: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: opt,
    }));
  };

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

    return {
      chapterId,
      quizId: meta.id, // 🔥 ini jadi soal_set_id juga
      setId: source === "soal" ? meta.id : undefined, // 🔥 AUTO ISI
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

import { useMemo, useState } from "react";
import Colors from "../theme/colors";
import { kalenderAgenda } from "../data/kalenderData";

export function useKalender() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const years = useMemo(
    () => Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i),
    [],
  );

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  const markedDates = useMemo(() => {
    const marked: any = {};

    kalenderAgenda.forEach((a) => {
      const [y, m] = a.date.split("-").map(Number);
      if (y === selectedYear && m === selectedMonth) {
        marked[a.date] = { marked: true, dotColor: "#16A34A" };
      }
    });

    if (selectedDate) {
      marked[selectedDate] = {
        selected: true,
        selectedColor: Colors.primary,
      };
    }

    return marked;
  }, [selectedDate, selectedMonth, selectedYear]);

  const filteredAgenda = useMemo(() => {
    return selectedDate
      ? kalenderAgenda.filter((a) => a.date === selectedDate)
      : kalenderAgenda.filter((a) => {
          const [y, m] = a.date.split("-").map(Number);
          return y === selectedYear && m === selectedMonth;
        });
  }, [selectedDate, selectedMonth, selectedYear]);

  const importantDays = useMemo(
    () =>
      kalenderAgenda
        .filter((a) => {
          const [y, m] = a.date.split("-").map(Number);
          return y === selectedYear && m === selectedMonth;
        })
        .map((a) => a.date),
    [selectedMonth, selectedYear],
  );

  return {
    // state
    selectedDate,
    selectedMonth,
    selectedYear,

    // data
    years,
    months,
    markedDates,
    filteredAgenda,
    importantDays,

    // actions
    setSelectedDate,
    setSelectedMonth,
    setSelectedYear,
  };
}

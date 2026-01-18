import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";

import { kalenderStyles as styles } from "../assets/styles/kalenderStyles";
import Colors from "../theme/colors";

import Header from "../components/HeaderBack/Header";
import { useKalender } from "../utils/useKalender";
import KalenderFilter from "../components/Kalender/KalenderFilter";
import KalenderSummary from "../components/Kalender/KalenderSummary";
import KalenderAgendaList from "../components/Kalender/KalenderAgendaList";

export default function KalenderScreen() {
  const k = useKalender();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header title="Kalender" iconName="calendar" />

        <KalenderFilter
          years={k.years}
          months={k.months}
          selectedYear={k.selectedYear}
          selectedMonth={k.selectedMonth}
          onYearChange={k.setSelectedYear}
          onMonthChange={k.setSelectedMonth}
        />

        <Calendar
          key={`${k.selectedYear}-${k.selectedMonth}`}
          current={`${k.selectedYear}-${String(k.selectedMonth).padStart(
            2,
            "0",
          )}-01`}
          onDayPress={(d) => k.setSelectedDate(d.dateString)}
          markedDates={k.markedDates}
          theme={{
            todayTextColor: Colors.primary,
            selectedDayBackgroundColor: Colors.primary,
            arrowColor: Colors.primary,
          }}
        />

        <KalenderSummary days={k.importantDays} />
        <KalenderAgendaList data={k.filteredAgenda} />
      </View>
    </SafeAreaView>
  );
}


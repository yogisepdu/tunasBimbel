import { View, ScrollView, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

import SoalHeader from "../../components/Soal/SoalHeader";
import SoalSectionCard from "../../components/Soal/SoalSectionCard";
import SoalFooter from "../../components/Soal/SoalFooter";
import { soalSections } from "../../data/soalSections";

type Props = NativeStackScreenProps<RootStackParamList, "SoalWarning">;

export default function SoalWarningScreen({ route, navigation }: Props) {
  const { soalId, title } = route.params;

  return (
    <View style={styles.container}>
      <SoalHeader title={title} onBack={navigation.goBack} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {soalSections.map((section, index) => (
          <SoalSectionCard key={index} {...section} />
        ))}
      </ScrollView>

      <SoalFooter
        onStart={() =>
          navigation.replace("Quiz", {
            quizId: soalId,
            source: "soal",
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
});

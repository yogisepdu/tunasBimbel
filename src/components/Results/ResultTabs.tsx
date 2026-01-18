import { View, Text, TouchableOpacity } from "react-native";
import { resultStyles } from "../../assets/styles/resultStyles";

const tabs = ["Statistik", "Pembahasan", "Peringkat"] as const;

type Props = {
  activeTab: (typeof tabs)[number];
  onChange: (tab: (typeof tabs)[number]) => void;
};

export default function ResultTabs({ activeTab, onChange }: Props) {
  return (
    <View style={resultStyles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            resultStyles.tabItem,
            activeTab === tab && resultStyles.tabActive,
          ]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={[
              resultStyles.tabText,
              activeTab === tab && resultStyles.tabTextActive,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

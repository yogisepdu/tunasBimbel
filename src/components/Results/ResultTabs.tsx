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
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            style={resultStyles.tabItem}
            onPress={() => onChange(tab)}
          >
            <Text
              style={[
                resultStyles.tabText,
                isActive && resultStyles.tabTextActive,
              ]}
            >
              {tab}
            </Text>

            {isActive && <View style={resultStyles.tabUnderline} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

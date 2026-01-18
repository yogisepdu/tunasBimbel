import { ScrollView, View } from "react-native";
import Header from "../components/HomeMenu/Header";
import Banner from "../components/HomeMenu/Banner";
import MenuGrid from "../components/MenuGrid";
import TryoutCard from "../components/HomeMenu/TryoutCard";

export default function HomeTab() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F5F6FA" }}>
      <Header />
      <Banner />
      <MenuGrid />

      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <TryoutCard title="Tryout RBB D3-S2" participants={3} />
        <TryoutCard title="Tryout RBB SMA/K Sederajat" participants={9} />
        <TryoutCard title="Tryout Tahap 1 D3-S2 RBB" participants={1435} />
        <TryoutCard title="Tryout RBB D3-S2" participants={3} />
        <TryoutCard title="Tryout RBB SMA/K Sederajat" participants={9} />
        <TryoutCard title="Tryout Tahap 1 D3-S2 RBB" participants={1435} />
      </View>
    </ScrollView>
  );
}

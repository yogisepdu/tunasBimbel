import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedHeader from "../components/Activity/segmentedHeader";
import AnnouncementCard from "../components/Activity/announcementCard";
import { styles } from "../assets/styles/activityStyles";

const AktivitasScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <SegmentedHeader />

      <AnnouncementCard
        category="Informasi"
        date="Selasa, 27 Jan 26"
        title="Update Aplikasi"
        description="Kami baru saja melakukan pembaruan aplikasi supaya proses belajar kamu lebih lancar, lebih rapi, dan minim gangguan."
        isNew
      />
    </SafeAreaView>
  );
};

export default AktivitasScreen;

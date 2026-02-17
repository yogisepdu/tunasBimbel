import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileTab from "../screens/ProfileTab";
import EditProfileScreen from "../screens/ProfileDetail/EditProfileScreen";

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileTab} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import Profile from "../components/Profile";
import LoginScreen from "./Auth/LoginScreen";

export default function TabTwoScreen() {
  const User = useSelector((state) => state.User.IS_LOGGED);
  return (
    <View style={styles.container}>{User ? <Profile /> : <LoginScreen />}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import LoginScreen from "../screens/Auth/LoginScreen";

import BottomTabNavigator from "./BottomTabNavigator";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <>
      <RootNavigator />
    </>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

const HeaderOption = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#186eb8",
  },
  headerTitleStyle: { color: "white" },
  headerShown: true,
  headerTintColor: "#fff",
};

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="Main"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={HeaderOption}
      />
    </Stack.Navigator>
  );
}

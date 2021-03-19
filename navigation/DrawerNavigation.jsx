import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../components/Drawer";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContentOptions={{
        inactiveTintColor: "#186eb8",
        style: { backgroundColor: "#FFF" },
        contentContainerStyle: {
          backgroundColor: "#fff",
          flex: 1,
        },
      }}
      openByDefault={false}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

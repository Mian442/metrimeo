import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import { Icon } from "react-native-elements";
import ContactUsScreen from "../screens/ContactUsScreen";
import CareersScreen from "../screens/CareersScreen";
import { IconButton } from "react-native-paper";
import DashBoard from "../screens/DashBoard";
import { useSelector } from "react-redux";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const IS_LOGGED = useSelector((state) => state.User.IS_LOGGED);
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{
        activeTintColor: "#FFFFFF",
        inactiveTintColor: "#bdbdbd",
        style: { backgroundColor: "#186eb8" },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" type="entypo" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Careers"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="stairs-up"
              type="material-community"
              color={color}
            />
          ),
        }}
      />
      {IS_LOGGED && (
        <BottomTab.Screen
          name="DashBoard"
          component={TabFiveNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="dashboard" type="material" color={color} />
            ),
          }}
        />
      )}
      <BottomTab.Screen
        name="Contact Us"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="contact-support" type="material" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-alt" type="font-awesome-5" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HeaderOption = ({ navigation }) => {
  return {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#186eb8",
    },
    headerTitleStyle: { color: "white" },
    headerLeftContainerStyle: { paddingLeft: 5 },
    headerRightContainerStyle: { paddingRight: 10 },
    headerLeft: () => (
      <IconButton
        icon="menu"
        color="#fff"
        size={32}
        onPress={() => navigation.openDrawer()}
      />
    ),
  };
};

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon({ name, color, type }) {
  return <Icon size={30} style={{}} name={name} color={color} type={type} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Home"
        component={HomeScreen}
        options={HeaderOption}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Careers"
        component={CareersScreen}
        options={HeaderOption}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={HeaderOption}
      />
    </TabFourStack.Navigator>
  );
}

const TabFiveStack = createStackNavigator();

function TabFiveNavigator() {
  return (
    <TabFiveStack.Navigator>
      <TabFiveStack.Screen
        name="DashBoard"
        component={DashBoard}
        options={HeaderOption}
      />
    </TabFiveStack.Navigator>
  );
}

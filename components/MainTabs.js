import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GetIcon } from "../utils/LoadIcons";
import Play from "../screens/Play";
import TaskList from "../screens/TaskList";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Play"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return GetIcon(route.name, size, color, color);
        },
        tabBarActiveTintColor: "blue",
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          height: 70,
          paddingTop: 15,
        },
        header: () => null,
      })}
    >
      <Tab.Screen name="Play" component={Play} />
      <Tab.Screen name="TaskList" component={TaskList} />
    </Tab.Navigator>
  );
};

export default MainTabs;

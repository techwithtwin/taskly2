import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import { theme } from "../theme";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colorCerulian,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Shopping List",

            tabBarIcon: ({ color, size }) => (
              <Feather name="list" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="counter"
          options={{
            title: "Counter",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="clockcircleo" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="idea"
          options={{
            title: "Idea",
            tabBarIcon: ({ color, size }) => (
              <Octicons name="light-bulb" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

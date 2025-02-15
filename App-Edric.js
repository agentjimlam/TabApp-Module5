import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEvent } from "expo";
import { useEffect, useCallback } from "react";
import { useState } from "react";

const HomeScreen = () => {
  const navigate = useNavigation();
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to settings"
        onPress={() => {
          navigate.navigate("Settings");
        }}
      ></Button>
      <Button
        title="Go to profile"
        onPress={() => {
          navigate.navigate("Profile"); // "Profile" is from <Stack.Screen name="___" ...>
        }}
      ></Button>
    </View>
  );
};

const SettingsScreen = ({ route }) => {
  const [active, setActive] = useState(false);
  useFocusEffect(
    useCallback(() => {
      console.log("Settings screen is focused");
      return () => {
        console.log("Settings screen is unfocused");
      };
    }, [])
  );

  useEffect(() => {
    console.log("Settings screen is mounted");
    return () => {}; // clean up
  }, []);

  const { name, age } = route.params || { name: "Default name", age: 10 };
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Age: {age}</Text>
      <Button
        title="Toggle"
        onPress={() => {
          setActive(!active);
        }}
      ></Button>
    </View>
  );
};

const ProfileScreen = () => {
  const navigate = useNavigation();
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Navigate to Settings"
        onPress={() => {
          navigate.navigate("Tab Navigator", { screen: "Settings" }); // Navigate to a screen inside a nested navigator.
        }}
      ></Button>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "blue",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home Page",
          tabBarIcon: ({ color, size }) => {
            return (
              <AntDesign name="home" size={size} color={color}></AntDesign>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="settings" size={size} color={color} />;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <TabNavigator /> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Tab Navigator"
          component={TabNavigator}
        ></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

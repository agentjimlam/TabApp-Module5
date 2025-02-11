import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useCallback, useEffect } from 'react';

const HomeScreen = () => {
  const navigate = useNavigation();
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to settings"
        onPress={() => {
          navigate.navigate("Settings", { name: "Jane", age: 20 }); // hardcoded input parameters
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
  useFocusEffect(
    useCallback(()=>{
      console.log("Settings screen is focused");
      return () => {
        console.log("Settings screen is unfocused"); // put clean-up logic here
      };
    }, [])
  );

  useEffect(()=>{
    console.log("Settings screen is mounted");
    return () => {}; // clean up
  }, [])

  const { name, age } = route.params || { name: "Default name", age: 10 };
  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Age: {age}</Text>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
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
        component={HomeScreen} // the component that will be shown in Settings tab of the bottom TabNavigator
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
        component={SettingsScreen} // the component that will be shown in Settings tab of the bottom TabNavigator
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// whatever inside <stack.navigator> will have back arrow
// bc there is a previous screen which is the tab navigator, there is a back button when we go to profile.
// but for settings, there is no back button bc it is part of the tab.navigator instead of stack navigator

// tab navigator exists in parallel with the stack navigator.

// useCallback hook is for: prevent reinitialization of a function

// useEffect only triggered once at start, useFocus triggers each time we click on Settings
// settings screen alr created that's why useEffect doesn't run again.


// what scenario need cleanup?
// when you have listeners, counters
// you want to clean up at set intervals.


import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons
import { useCallback, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// SCREENS
const HomeScreen = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text>This is the Home Screen</Text>
      <Text style={styles.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to settings"
          onPress={() => {
            navigate.navigate("Settings", {
              name: "Jane",
              age: 20,
              login: "trio",
              email: "trio@gmail.com",
            }); // hardcoded input parameters. This button will pass different data to Settings screen
          }}
        ></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to profile"
          onPress={() => {
            navigate.navigate("Profile", {
              name: "Jane",
              age: 20,
              login: "user123",
              email: "U123@gmail.com",
              // sends { login: "dummy_user", email: "dummy@email.com" } as route parameters to ProfileScreen
              // Inside ProfileScreen, route.params now contains { login: "dummy_user", email: "dummy@email.com" }.
            });
          }}
        ></Button>
      </View>
    </View>
  );
};

const SettingsScreen = ({ route }) => {
  const [active, setActive] = useState(false);
  useFocusEffect(
    useCallback(() => {
      console.log("Settings screen is focused");
      return () => {
        console.log("Settings screen is unfocused"); // put clean-up logic here
      };
    }, [])
  );

  useEffect(() => {
    console.log("Settings screen is mounted");
    return () => {}; // clean up
  }, []);

  const { login, email } = route.params || {
    login: "No Login Username",
    email: "No Email",
  };
  const { name, age, text } = route.params || {
    name: "Default name",
    age: 10,
    text: "no text received",
  };

  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>Age: {age}</Text>
      <Text>Login: {login}</Text>
      <Text>Email: {email}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Toggle"
          onPress={() => {
            setActive(!active);
            console.log(active);
          }}
        ></Button>
      </View>
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  const dummyLogin = route.params?.login || "default_user";
  const dummyEmail = route.params?.email || "default@email.com";
  const dummyName = route.params?.name || "default_name";
  const dummyAge = route.params?.age || "default_age";
  const navigate = useNavigation();

  console.log("checking route:", route);
  console.log("Checking navigate", navigate);
  return (
    <View>
      <Text>This is the Profile Screen</Text>
      <Text>name: {dummyName}</Text>
      <Text>age: {dummyAge}</Text>
      <Text>login: {dummyLogin}</Text>
      <Text>email: {dummyEmail} </Text>
      <Button
        title="Navigate to Settings"
        onPress={() => {
          navigation.navigate("Tabs", {
            screen: "Settings",
            params: {
              name: dummyName,
              age: dummyAge,
              login: dummyLogin,
              email: dummyEmail,
            },
          });
          // navigate.navigate("Tab Navigator", { screen: "Settings" }); // Navigate to a screen inside a nested navigator.
        }}
      ></Button>
    </View>
  );
};

function Feed({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to settings"
          onPress={() => {
            navigation.navigate("Tabs", {
              screen: "Settings",
              params: {
                name: "Jango",
                age: 40,
                login: "alamo",
                email: "rango@gmail.com",
                text: "From out the dust, Came a man true and bold, Champion of the fandango. By night he drank whiskey, By day killed bad men. And the townspeople knew him as Rango. Coming down the mountainside, The people hailed his name, And of his legend they sang-o. With iron in his heart, And steel in his claw, He pumped their heads all full of lead and Rango. Rango. Rango. Rango. Rango.  Rango",
              },
            }); // hardcoded input parameters. This button will pass different data to Settings screen
          }}
        ></Button>
      </View>
    </View>
  );
}

function Article() {
  return (
    <View>
      <Text>Article</Text>
    </View>
  );
}

// Tab Navigator
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
        component={HomeScreen} // the component that will be shown in Home tab of the bottom TabNavigator
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
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome
                name="user-circle-o"
                size={size}
                color={color}
              ></FontAwesome>
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

// Drawer Navigator: Drawer wraps the Tab Navigator -> drawer applies to all tabs
// Recommended DrawerNavigator wraps TabNavigator so that the drawer applies to all screens.
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ title: "Main Screens" }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Article"
        component={Article}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <TabNavigator /> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        ></Stack.Screen>
        {/* <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// What was inside App() when you just create expo app
{
  /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  innerContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  text: {
    marginTop: 20,
    fontFamily: "serif",
    fontSize: 16,
  },
});

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

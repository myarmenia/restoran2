import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screen/splashScreen/SplashScreen";
import WelcomeScreen from "../screen/authScreens/WelcomeScreen";
import LoginScreen from "../screen/authScreens/LoginScreen";
import RegisterScreen from "../screen/authScreens/RegisterScreen";
import SendCode from "../components/authBlocks/SendCode";
import SendNumber from "../components/authBlocks/SendNumber";
import SimpleHeader from "../components/headers/SimpleHeader"

const Stack = createStackNavigator();

export const screenOptionStyle = (title, right) => ({
  headerStyle: {
    backgroundColor: "#01B0F1",
    height: 100,
  },
  header: (props) => <SimpleHeader title right />,
  headerTintColor: "#FFFFFF",
  headerTitleStyle: {
      fontWeight: '100',
      fontSize: 22,
      textAlign: "center",
  },
  headerTitleAlign: 'center',
});

export const AutoStack = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen
      name="splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
      <Stack.Screen
          name="sendCode"
          component={SendCode}
          options={{
              headerStyle: {
                  backgroundColor: "#01B0F1",
                  height: 100,
              },
              header: () => <SimpleHeader title={"Вход по номеру телефона"} />,
              headerTintColor: "#FFFFFF",
              headerTitleStyle: {
                  fontWeight: '100',
                  fontSize: 22,
                  textAlign: "center",
              },
              headerTitleAlign: 'center',
          }}
      />
      <Stack.Screen
          name="sendNumber"
          component={SendNumber}
          options={{
              headerStyle: {
                  backgroundColor: "#01B0F1",
                  height: 100,
              },
              header: () => <SimpleHeader title={"Вход по номеру телефона"} />,
              headerTintColor: "#FFFFFF",
              headerTitleStyle: {
                  fontWeight: '100',
                  fontSize: 22,
                  textAlign: "center",
              },
              headerTitleAlign: 'center',
          }}
      />
  </Stack.Navigator>
);

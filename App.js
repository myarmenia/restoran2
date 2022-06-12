import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { LogBox, StyleSheet, StatusBar } from "react-native";
import Route from "./src/navigation/Route";
import { store } from "./src/store";
import { Provider } from "react-redux";

const App = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={"#0E1013"} />
      <NavigationContainer>
        <Route/>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },

  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },

  highlight: {
    fontWeight: "700",
  },
});

export default App;

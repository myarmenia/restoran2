import {NavigationContainer} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import React from 'react';
import {LogBox, StyleSheet, StatusBar} from 'react-native';
import Route from './src/navigation/Route';
import {store} from './src/store';
import {Provider} from 'react-redux';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#0E1013'} />
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

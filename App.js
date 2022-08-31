import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import Route from './src/navigation/Route';
import {store} from './src/store';
import {Provider} from 'react-redux';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#0E1013'} />
      <NavigationContainer theme={{colors: {background: '#000'}}}>
        <Route />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

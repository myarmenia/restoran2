import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screen/homBlock/HomeScreen';
import TitleBlock from '../screen/homBlock/TitleBlock';
import OrderTypeScreen from '../screen/orderTypeScreen/OrderTypeScreen';

const Stack = createStackNavigator();

// export const screenOptionStyle = {
//   header: props => <SearchHeader {...props} />,
// };

export const HomeStackNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  />
);

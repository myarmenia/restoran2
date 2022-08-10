import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from '../navigation/BottomTabNavigation';

const RootStack = createStackNavigator();

export const SummaryNavigation = () => (
  <RootStack.Navigator
    initialRouteName={'BottomTabNavigator'}
    screenOptions={({route}) => ({
      headerShown: false,
    })}>
    <RootStack.Screen
      options={{headerShown: false}}
      name="BottomTabNavigator"
      component={BottomTabNavigator}
    />
  </RootStack.Navigator>
);

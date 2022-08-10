import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screen/homBlock/HomeScreen';
import ChooseTableScreen from '../../screen/homBlock/ChooseTableScreen';
import OrderTypeScreen from '../../screen/orderTypeScreen/OrderTypeScreen';
import TitleBlock from '../../screen/homBlock/TitleBlock';
import SelectMenuScreen from '../../screen/selectMenuScreen/SelectMenuScreen';
import AddDishesScreen from '../../screen/addDishesScreen/AddDishesScreen';
import SearchScreen from '../../screen/searchScreen/SearchScreen';
import BookScreen from '../../screen/bookScreen/BookScreen';
import ProfileScreen from '../../screen/profileBlock/ProfileScreen';
import MapScreen from '../../screen/mapBlock/MapScreen';
import PrivacyPolicyScreen from '../../screen/privacyPolicyScreen/PrivacyPolicyScreen';
import ConsentToProcessing from '../../screen/consentToProcessing/ConsentToProcessing';
import TermsScreen from '../../screen/termsScreen/TermsScreen';
import MenuCategoriesScreen from '../../screen/menuCategories/MenuCategoriesScreen';
import MainDishesScreen from '../../screen/mainDishesScreen/MainDishesScreen';
import NameDishScreen from '../../screen/nameDishScreen/NameDishScreen';

const Stack = createStackNavigator();

export const screenOptionStyle = {
  headerStyle: {
    height: 0,
  },
  // header:(props) => <SearchHeader {...props}/>,
};

export const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChooseTable" component={ChooseTableScreen} />
      <Stack.Screen name="OrderTypeScreen" component={OrderTypeScreen} />
      <Stack.Screen name="RestTitle" component={TitleBlock} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name="ConsentToProcessing"
        component={ConsentToProcessing}
      />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen
        name="MenuCategoriesScreen"
        component={MenuCategoriesScreen}
      />
      <Stack.Screen name="MainDishesScreen" component={MainDishesScreen} />
      <Stack.Screen name="NameDishScreen" component={NameDishScreen} />
    </Stack.Navigator>
  );
};

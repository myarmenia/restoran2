import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screen/homBlock/HomeScreen';
import ChooseTableScreen from '../../screen/homBlock/ChooseTableScreen';
import OrderTypeScreen from '../../screen/orderTypeScreen/OrderTypeScreen';
import TitleBlock from '../../screen/homBlock/TitleBlock';
import SelectMenuScreen from '../../screen/selectMenuScreen/SelectMenuScreen';
import AddDishesScreen from '../../screen/addDishesScreen/AddDishesScreen';
import OrderHistoryScreen from '../../screen/orderHistoryScreen/OrderHistoryScreen';
import PreferencesScreen from '../../screen/preferencesScreen/PreferencesScreen';
import FavoritesScreen from '../../screen/favoritesScreen/FavoritesScreen';
import FeedBackScreen from '../../screen/feedBackScreen/FeedBackScreen';
import SearchScreen from '../../screen/searchScreen/SearchScreen';
import BookScreen from '../../screen/bookScreen/BookScreen';
import ProfileScreen from '../../screen/profileBlock/ProfileScreen';
import MapScreen from '../../screen/mapBlock/MapScreen';
import PrivacyPolicyScreen from '../../screen/privacyPolicyScreen/PrivacyPolicyScreen';
import ConsentToProcessing from '../../screen/consentToProcessing/ConsentToProcessing';
import TermsScreen from '../../screen/termsScreen/TermsScreen';
import {useHeaderHeight} from '@react-navigation/elements';
import {Platform} from 'react-native';

const Stack = createStackNavigator();

export const screenOptionStyle = {
  headerStyle: {
    height: 0,
  },
  // header:(props) => <SearchHeader {...props}/>,
};

export const HomeStackNavigation = () => {
  const headerHeight = useHeaderHeight();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: Platform.OS === 'ios' ? headerHeight : 0,
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChooseTable" component={ChooseTableScreen} />
      <Stack.Screen name="OrderTypeScreen" component={OrderTypeScreen} />
      <Stack.Screen name="RestTitle" component={TitleBlock} />
      <Stack.Screen name="addDishes" component={AddDishesScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="FeedBack" component={FeedBackScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="BookScreen" component={BookScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="select" component={SelectMenuScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name="ConsentToProcessing"
        component={ConsentToProcessing}
      />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
    </Stack.Navigator>
  );
};

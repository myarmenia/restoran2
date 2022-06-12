import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/homBlock/HomeScreen";
import HomeTabSvg from "../assets/svg/tabs/HomeTabSvg";
import FocusHomeTabSvg from "../assets/svg/tabsFocus/FocusHomeTabSvg";
import MapScreen from "../screen/mapBlock/MapScreen";
import FocusMapTabSvg from "../assets/svg/tabsFocus/FocusMapTabSvg";
import MapTabSvg from "../assets/svg/tabs/MapTabSvg";
import OrdersTabSvg from "../assets/svg/tabs/OrdersTabSvg";
import FocusOrdersTabSvg from "../assets/svg/tabsFocus/FocusOrdersTabSvg";
import BasketTabSvg from "../assets/svg/tabs/BasketTabSvg";
import FocusBasketTabSvg from "../assets/svg/tabsFocus/FocusBasketTabSvg";
import ProfileTabSvg from "../assets/svg/tabs/ProfileTab";
import FocusProfileTabSvg from "../assets/svg/tabsFocus/FocusProfileTabSvg";
import ProfileScreen from "../screen/profileBlock/ProfileScreen";
import LinearGradient from "react-native-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";
import TextFocusBasketSvg from "../assets/svg/tabsFocus/TextFocusBasketSvg";
import BasketScreen from "../screen/basketBlock/BasketScreen";
import OrdersScreen from "../screen/ordersBlock/OrdersScreen";
import TextFocusHomeSvg from "../assets/svg/tabsFocus/TextFocusHomeSvg";
import TextFocusMapSvg from "../assets/svg/tabsFocus/TextFocusMapSvg";
import TextFocusOrdersSvg from "../assets/svg/tabsFocus/TextFocusOrdersSvg";
import TextFocusProfileSvg from "../assets/svg/tabsFocus/TextFocusProfileSvg";
import HomeTabTextSvg from "../assets/svg/tabs/HomeTabTextSvg";
import MapTabTextSvg from "../assets/svg/tabs/MapTabTextSvg";
import OrdersTabTextSvg from "../assets/svg/tabs/OrdersTabTextSvg";
import BasketTabTextSvg from "../assets/svg/tabs/BasketTabTextSvg";
import ProfileTabTextSvg from "../assets/svg/tabs/ProfileTabTextSvg";
import { HomeStackNavigation } from "../navigation/stacks/HomeStack";
import OrderHistoryScreen from "../screen/orderHistoryScreen/OrderHistoryScreen";
import FavoritesScreen from "../screen/favoritesScreen/FavoritesScreen";
import FeedBackScreen from "../screen/feedBackScreen/FeedBackScreen";
import AddDishesScreen from "../screen/addDishesScreen/AddDishesScreen";
import SelectMenuScreen from "../screen/selectMenuScreen/SelectMenuScreen";
import PrivacyPolicyScreen from '../screen/privacyPolicyScreen/PrivacyPolicyScreen';
import ConsentToProcessing from '../screen/consentToProcessing/ConsentToProcessing';
import TermsScreen from '../screen/termsScreen/TermsScreen';
import { axiosInstance } from "../request";



const ProfileComponent = () => {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="FeedBack" component={FeedBackScreen} />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const Drawer = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Главная"}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "rgba(32, 33, 36, 1)",
          height: 70,
          paddingBottom: 10,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Главная"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <TextFocusHomeSvg /> : <HomeTabTextSvg />,
          tabBarIcon: ({ focused }) =>
            focused ? <FocusHomeTabSvg /> : <HomeTabSvg />,
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: ({ focused, color, size }) =>
            focused ? <TextFocusMapSvg /> : <MapTabTextSvg />,
          tabBarIcon: ({ focused }) =>
            focused ? <FocusMapTabSvg /> : <MapTabSvg />,
        }}
      />
      <Tab.Screen
        name="select"
        component={SelectMenuScreen}
        options={{
          tabBarLabel: ({ focused, color, size }) =>
            focused ? <TextFocusOrdersSvg /> : <OrdersTabTextSvg />,
          tabBarIcon: ({ focused }) =>
            focused ? <FocusOrdersTabSvg /> : <OrdersTabSvg />,
        }}
      />
      <Tab.Screen
        name="addDishes"
        component={AddDishesScreen}
        options={{
          tabBarLabel: ({ focused, color, size }) =>
            focused ? <TextFocusBasketSvg /> : <BasketTabTextSvg />,
          tabBarIcon: ({ focused }) =>
            focused ? <FocusBasketTabSvg /> : <BasketTabSvg />,
        }}
      />
      <Tab.Screen
        name="ProfileComponent"
        component={ProfileComponent}
        options={{
          tabBarLabel: ({ focused, color, size }) =>
            focused ? <TextFocusProfileSvg /> : <ProfileTabTextSvg />,
          tabBarIcon: ({ focused }) =>
            focused ? <FocusProfileTabSvg /> : <ProfileTabSvg />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;





import { createSlice } from "@reduxjs/toolkit";
import {
  Favorite,
  Favorites,
  Feedback,
  Kitchen,
  Menu,
  Menus,
  MenusByMenuID,
  Orders,
  orderStore,
  Preference,
  Preferences,
  Restaurant,
  Restaurants
} from "./action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  restaurants: []
};

const slice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
  },
  extraReducers: {
    [Restaurant.fulfilled]: (state, {payload}) => {
      state.restaurants = payload;
    },
    [Restaurants.fulfilled]: (state) => {
      state.name = { ...state.name };
    },
    [Menu.fulfilled]: (state) => {
      state.name = { ...state.name };
    },
    [Menus.fulfilled]: (state) => {
      state.name = { ...state.name };
    },
    [MenusByMenuID.fulfilled]: (state) => {
      state.name = { ...state.name };
    },
    [Kitchen.fulfilled]: (state) => {
      state.name = { ...state.name };
    },
    [Orders.fulfilled]: (state, action) => {
      state.load = false
      state.user = action.payload
      AsyncStorage.setItem('http://back.tap-table.ru/api/order', action.payload.token)
      state.error = ''
      state.message = ''
      state.isAuth = true
    },
    [orderStore.fulfilled]: (state, action) => {
      state.load = false
      state.user = action.payload
      AsyncStorage.setItem('http://back.tap-table.ru/api/order/store', action.payload.token)
      state.error = ''
      state.message = ''
      state.isAuth = true
    },
    [Favorite.fulfilled]: (state, action) => {
      state.load = false
      state.user = action.payload
      AsyncStorage.setItem('http://back.tap-table.ru/api/restaurant/favorites', action.payload.token)
      state.error = ''
      state.message = ''
      state.isAuth = true
    },
    [Favorites.fulfilled]: (state, action) => {
      state.load = false
      state.user = action.payload
      AsyncStorage.setItem('http://back.tap-table.ru/api/restaurant/favorites/${data?.id}', action.payload.token)
      state.error = ''
      state.message = ''
      state.isAuth = true
    },
    [Preference.fulfilled]: (state, action) => {
      state.load = false
      state.user = action.payload
      AsyncStorage.setItem('http://back.tap-table.ru/api/restaurant/menu/preference', action.payload.token)
      state.error = ''
      state.message = ''
      state.isAuth = true
    },
    [Preferences.fulfilled]: (state, action) => {
      state.load = false
      state.user = action.payload
      AsyncStorage.setItem('http://back.tap-table.ru/api/menu/preference/${data?.id}', action.payload.token)
      state.error = ''
      state.message = ''
      state.isAuth = true
    },
    [Feedback.fulfilled]: (state, action) => {
      state.load = false
      state.user = action.payload
      AsyncStorage.setItem('http://back.tap-table.ru/api/feedback', action.payload.token)
      state.error = ''
      state.message = ''
      state.isAuth = true
    },

  },
});

export default slice.reducer;
const { signOut } = slice.actions;
export { signOut };

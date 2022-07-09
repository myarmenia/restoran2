import {createSlice} from '@reduxjs/toolkit';
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
  Restaurants,
} from './action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  restaurants: [],
};

const slice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: {
    [Restaurant.fulfilled]: (state, {payload}) => {
      state.restaurants = payload;
    },
    [Restaurants.fulfilled]: (state, action) => {
      state.restaurant = action.payload;
    },
    [Menu.fulfilled]: (state, action) => {
      state.menu = action.payload;
    },
    [Menus.fulfilled]: (state, action) => {
      state.menus = action.payload;
    },
    [MenusByMenuID.fulfilled]: (state, action) => {
      state.byId = action.payload;
    },
    [Kitchen.fulfilled]: (state, action) => {
      state.kitchen = action.payload;
    },
    [Orders.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [orderStore.fulfilled]: (state, action) => {
      state.orderStore = action.payload;
    },
    [Favorite.fulfilled]: (state, action) => {
      state.favorite = action.payload;
    },
    [Favorites.fulfilled]: (state, action) => {
      state.favorites = action.payload;
    },
    [Preference.fulfilled]: (state, action) => {
      state.preference = action.payload;
    },
    [Preferences.fulfilled]: (state, action) => {
      state.preferences = action.payload;
    },
    [Feedback.fulfilled]: (state, action) => {
      state.feedback = action.payload;
    },
    [Restaurant.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Restaurants.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Menu.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Menus.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [MenusByMenuID.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Kitchen.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Orders.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [orderStore.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Favorite.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Favorites.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Preference.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Preferences.rejected]: (state, {payload}) => {
      state.error = payload;
    },
    [Feedback.rejected]: (state, {payload}) => {
      state.error = payload;
    },
  },
});

export default slice.reducer;
const {signOut} = slice.actions;
export {signOut};

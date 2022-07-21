import {createSlice} from '@reduxjs/toolkit';
import {
  Favorite,
  Favorites,
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

const initialState = {
  restaurants: [],
  restaurant: [],
  menu: '',
  menus: [],
  byId: '',
  kitchen: '',
  orders: '',
  orderStore: '',
  favorite: [],
  favorites: '',
  preference: [],
  preferences: '',
  error: '',
  yourOrder: [],
  reserveOrders: [],
};

const slice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    addDish: (state, {payload}) => {
      const restIndex = state.yourOrder[payload[0]].menus.findIndex(
        el => el.id === payload[1],
      );
      if (restIndex !== -1) {
        state.yourOrder[payload[0]].menus.push(payload[2]);
        state.reserveOrders.push(payload[3]);
      } else {
        state.yourOrder[payload[0]].menus[restIndex].count +=
          payload[2][payload[1]].count;
        if (payload[2][payload[0]].menus.comment) {
          state.yourOrder[payload[0]].menus[restIndex].comment +=
            '\n' + payload[2][payload[0]].comment;
        }
      }
      if (state.yourOrder[payload[0]].menus.length) {
        state.yourOrder[payload[0]].menus.count += payload[2][payload[0]].count;
        if (payload[1][payload[0]].menus.comment) {
          state.yourOrder[payload[0]].menus.count +=
            '\n' + payload[2][payload[0]].comment;
        }
      }
    },
    addRest: (state, {payload}) => {
      state.yourOrder.push({[payload.restaurant_id]: payload});
    },
    changeMenu: (state, {payload}) => {
      state.yourOrder.menus = payload;
    },
  },
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
  },
});

export default slice.reducer;
const {addDish, addRest, changeMenu} = slice.actions;
export {addDish, addRest, changeMenu};

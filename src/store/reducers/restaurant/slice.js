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
  yourOrder: {},
  reserveOrders: {},
  phoneNumbers: {},
};

const slice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    addDish: (state, {payload}) => {
      const restIndex = state.yourOrder[payload[0]].menus.findIndex(
        el => el.id === payload[1],
      );

      if (restIndex === -1) {
        state.yourOrder[payload[0]].menus.push(payload[2]);
        state.reserveOrders[payload[0]].push(payload[3]);
      } else {
        state.yourOrder[payload[0]].menus[restIndex].count += payload[2].count;
        if (payload[2].comment) {
          state.yourOrder[payload[0]].menus[restIndex].comment +=
            '\n' + payload[2].comment;
        }
      }
    },
    addRest: (state, {payload}) => {
      state.yourOrder[payload[0].restaurant_id] = payload[0];
      state.reserveOrders[payload[0].restaurant_id] = [];
      state.phoneNumbers[payload[0].restaurant_id] = payload[1];
    },
    changeMenu: (state, {payload}) => {
      state.yourOrder[payload[0]].menus = payload[1];
    },
    deleteDish: (state, {payload}) => {
      let index = 0;
      state.yourOrder[payload[0]].menus = state.yourOrder[
        payload[0]
      ].menus.filter((val, ind) => {
        if (val.id !== payload[1]) {
          index = ind;
        }
        return val.id !== payload[1];
      });
      state.reserveOrders[payload[0]] = state.reserveOrders[payload[0]].filter(
        (_, ind) => ind !== index,
      );
    },
    broneRest: (state, {payload}) => {
      const otherOrders = state.yourOrder;
      const otherDesc = state.reserveOrders;
      for (const k in otherOrders) {
        if (+k === +payload[0]) {
          delete otherOrders[k];
          delete otherDesc[k];
        }
      }
      state.yourOrder = otherOrders;
      state.reserveOrders = otherDesc;
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
const {addDish, addRest, changeMenu, deleteDish, broneRest} = slice.actions;
export {addDish, addRest, changeMenu, deleteDish, broneRest};

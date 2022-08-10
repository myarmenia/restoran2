import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../../request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Restaurant = createAsyncThunk(
  'restaurant/Restaurant',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get('restaurant');
      console.log('aaa', response.data);
      return response.data.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Restaurants = createAsyncThunk(
  'restaurant/Restaurants',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(`restaurant/${data}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Menu = createAsyncThunk(
  'restaurant/Menu',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(
        `restaurant/menu/${data.id}?category=${data.catId}`,
      );
      console.log(response.data);
      return response.data.data;
    } catch (e) {
      console.log('oooops mta2', e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Menus = createAsyncThunk(
  'restaurant/Menus',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(
        `restaurant/menu/categories/${data}`,
      );
      console.log(response.data);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const MenusByMenuID = createAsyncThunk(
  'restaurant/MenusByMenuID',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(
        `restaurant/menu/single/${data}`,
      );
      console.log(response.data);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Kitchen = createAsyncThunk(
  'restaurant/Kitchen',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get('restaurant/kitchen');
      console.log('kitchen', response.data);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Orders = createAsyncThunk(
  'restaurant/Orders',
  async (data, thunkAPI) => {
    console.log(data);
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.get('order', {
        headers: {Authorization: `${bearer} ${token}`},
      });
      console.log('orders', response.data.data);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const orderStore = createAsyncThunk(
  'restaurant/orderStore',
  async (data, thunkAPI) => {
    console.log('get', data);
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.post('order/store', data, {
        headers: {
          Authorization: `${bearer} ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log('safdjhfiahi', e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Favorite = createAsyncThunk(
  'restaurant/Favorite',
  async (data, thunkAPI) => {
    console.log(data);
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.get('restaurant/favorites', {
        headers: {Authorization: `${bearer} ${token}`},
      });
      console.log('favorite: ', response.data);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Favorites = createAsyncThunk(
  'restaurant/Favorites',
  async (data, thunkAPI) => {
    console.log(data);
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.patch(
        `restaurant/favorites/${data?.id}`,
        data,
        {
          headers: {Authorization: `${bearer} ${token}`},
        },
      );
      console.log(response.data);
      thunkAPI.dispatch(Favorite());
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Preference = createAsyncThunk(
  'restaurant/Preference',
  async (data, thunkAPI) => {
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    console.log(data);
    try {
      const response = await axiosInstance.get('menu/preference', {
        headers: {Authorization: `${bearer} ${token}`},
      });
      console.log('favorite dishes', response.data);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const Preferences = createAsyncThunk(
  'restaurant/Preferences',
  async (data, thunkAPI) => {
    console.log(data);
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.patch(
        `menu/preference/${data?.id}`,
        data,
        {
          headers: {Authorization: `${bearer} ${token}`},
        },
      );
      console.log('preference', response.data);
      return response.data;
    } catch (e) {
      console.log('error pref ', e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../../request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = createAsyncThunk('auth/Login', async (data, thunkAPI) => {
  try {
    console.log('data ----> ', data);
    const response = await axiosInstance.post('get_pass', {
      ...data,
    });
    console.log('login: ', response.data);
    if (response.data?.access_token) {
      await AsyncStorage.setItem('token', response.data?.access_token);
      await AsyncStorage.setItem('bearer', response.data?.token_type);
      await AsyncStorage.setItem('refreshToken', response.data?.refresh_token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem(
        'phoneNumber',
        JSON.stringify(response.data.user?.phone_number),
      );
    }
    return response.data;
  } catch (e) {
    console.log(e.message);
    return thunkAPI.rejectWithValue('Error Here');
  }
});

export const AutoSignIn = createAsyncThunk(
  'auth/AutoSignIn',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const bearer = await AsyncStorage.getItem('bearer');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const user = await AsyncStorage.getItem('user');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      return {token, bearer, refreshToken, user};
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue('Error Here');
    }
  },
);
export const SendCodeNum = createAsyncThunk(
  'auth/SendCode',
  async (data, thunkAPI) => {
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    console.log(data);
    try {
      const response = await axiosInstance.post('phone/check', data, {
        headers: {Authorization: `${bearer} ${token}`},
      });
      console.log(response.data);
      const message = response.data.message;
      const userData = await AsyncStorage.getItem('user');
      const reserveUser = JSON.parse(userData);
      reserveUser.phone_number = response.data.phone_number;
      await AsyncStorage.clear();
      return {message: message, canAuth: true, user: reserveUser};
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue('Error Here');
    }
  },
);

export const SendPhone = createAsyncThunk(
  'auth/SendPhone',
  async (data, thunkAPI) => {
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.get(
        `phone/reg?phone_number=${data.phone_number}`,
        {
          headers: {Authorization: `${bearer} ${token}`},
        },
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue('Error Here');
    }
  },
);

export const Registration = createAsyncThunk(
  'auth/Registration',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.post('sign_up', {
        ...data,
      });
      console.log('reg ----> ', response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const ProfileUpdate = createAsyncThunk(
  'auth/ProfileUpdate',
  async (data, thunkAPI) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('dob', data.dob);
    formData.append('gender', data.gender);
    formData.append('phone_number', data.phone_number);
    if (data?.avatar) {
      formData.append('avatar', data.avatar);
    }
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.post('user/update', formData, {
        headers: {
          Authorization: `${bearer} ${token}`,
          'Content-Type': 'multipart/form-data; ',
        },
      });
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const GetProfileData = createAsyncThunk(
  'auth/GetProfileData',
  async (_, thunkAPI) => {
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.get('user', {
        headers: {
          Authorization: `${bearer} ${token}`,
        },
      });
      console.log('reg ----> ', response.data);
      return response.data;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const SignOut = createAsyncThunk('auth/SignOut', async () => {
  await AsyncStorage.clear();
  return true;
});

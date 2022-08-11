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
    }
    return response.data;
  } catch (e) {
    console.log(e.message);
    return thunkAPI.rejectWithValue('Error Here');
  }
});

export const AutoSignIn = createAsyncThunk(
  'auth/AutoSignIn',
  async (data, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const bearer = await AsyncStorage.getItem('bearer');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const user = await AsyncStorage.getItem('user');
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
      const response = await axiosInstance.post(
        'phone/check',
        {
          ...data,
        },
        {headers: {Authorization: `${bearer} ${token}`}},
      );
      console.log(response.data);
      return response.data;
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
    formData.append('avatar', data.avatar);
    console.log(data, formData);
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.post('user/update', formData, {
        headers: {
          Authorization: `${bearer} ${token}`,
          'Content-Type': 'multipart/form-data; ',
        },
      });
      const localUserData = await AsyncStorage.getItem('user');
      const user = JSON.parse(localUserData);
      user.phone_number = data.phone_number;
      user.gender = data.gender;
      user.avatar = data.avatar;
      user.dob = data.dob;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('reg ----> ', response.data);
      return user;
    } catch (e) {
      console.log(e.message);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const SignOut = createAsyncThunk('auth/SignOut', async () => {
  await AsyncStorage.setItem('token', '');
  await AsyncStorage.setItem('bearer', '');
  await AsyncStorage.setItem('refreshToken', '');
  await AsyncStorage.setItem('user', JSON.stringify({}));
  return true;
});

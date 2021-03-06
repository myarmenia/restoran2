import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../../../request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = createAsyncThunk('auth/Login', async data => {
  try {
    console.log(data);
    const response = await axiosInstance.post('get_pass', {
      ...data,
    });
    console.log('login: ', response.data);
    if (response.data.access_token) {
      await AsyncStorage.setItem('token', response.data.access_token);
      await AsyncStorage.setItem('bearer', response.data.token_type);
      await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
    }
    return response.data;
  } catch (e) {
    console.log(e.message);
    return 'Error Here';
  }
});
export const SendCodeNum = createAsyncThunk('auth/SendCode', async data => {
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
    return 'Error Here';
  }
});

export const SendPhone = createAsyncThunk('auth/SendPhone', async data => {
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
    return 'Error Here';
  }
});

export const Registration = createAsyncThunk(
  'auth/Registration',
  async data => {
    console.log(data);
    try {
      const response = await axiosInstance.post('register', {
        ...data,
      });
      console.log('reg ----> ', response.data);
      return response.data;
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  },
);

export const ProfileUpdate = createAsyncThunk(
  'auth/ProfileUpdate',
  async data => {
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.post('user/update', data, {
        headers: {
          Authorization: `${bearer} ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('reg ----> ', response.data);
      return response.data;
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  },
);

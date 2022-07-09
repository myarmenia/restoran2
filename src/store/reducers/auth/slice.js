import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Login, Registration, SendCodeNum, SendPhone} from './action';

const initialState = {
  auth: false,
  token: '',
  tokenType: '',
  user: {},
  message: '',
  error: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: async state => {
      state.auth = false;
      await AsyncStorage.setItem('token', '');
      await AsyncStorage.setItem('bearer', '');
      await AsyncStorage.setItem('refreshToken', '');
      state.token = '';
      state.tokenType = '';
      state.refreshToken = '';
      state.error = '';
      state.message = '';
      state.user = {};
    },
    signIn: async state => {
      state.auth = true;
      state.token = await AsyncStorage.getItem('token');
      state.tokenType = await AsyncStorage.getItem('bearer');
      state.refreshToken = await AsyncStorage.getItem('refreshToken');
      const asyncUser = await AsyncStorage.getItem('user');
      state.user = JSON.parse(asyncUser);
    },
  },
  extraReducers: {
    [Login.fulfilled]: async (state, {payload}) => {
      if (payload === 'Error Here') {
        state.error = payload;
      } else {
        state.error = '';
        if (payload['access_token']) {
          await AsyncStorage.multiSet([
            ['token', 'bearer', 'refreshToken', 'user'],
            [
              payload['access_token'],
              payload['token_type'],
              payload['refresh_token'],
              JSON.stringify(payload.user),
            ],
          ]);
        }
        if (payload?.user.phone_number) {
          state.auth = true;
        }
        state.token = payload.access_token;
        state.tokenType = payload.token_type;
        state.refreshToken = payload.refresh_token;
        state.user = payload.user;
      }
    },
    [Registration.fulfilled]: state => {
      state.name = {...state.name};
    },
    [SendCodeNum.fulfilled]: (state, {payload}) => {
      state.message = payload.message;
      state.auth = true;
    },
    [SendPhone.fulfilled]: state => {
      state.name = {...state.name};
    },
  },
});

export default slice.reducer;
const {signOut, signIn} = slice.actions;
export {signOut, signIn};

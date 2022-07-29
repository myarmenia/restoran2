import {createSlice} from '@reduxjs/toolkit';
import {
  AutoSignIn,
  Login,
  ProfileUpdate,
  Registration,
  SendCodeNum,
  SendPhone,
} from './action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  canAuth: false,
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
      await AsyncStorage.setItem('token', '');
      await AsyncStorage.setItem('bearer', '');
      await AsyncStorage.setItem('refreshToken', '');
      await AsyncStorage.setItem('user', JSON.stringify({}));
      state.canAuth = false;
      state.token = '';
      state.tokenType = '';
      state.refreshToken = '';
      state.error = '';
      state.message = '';
      state.user = {};
    },
    clearError: state => {
      state.error = '';
    },
  },
  extraReducers: {
    [Login.fulfilled]: (state, {payload}) => {
      if (payload === 'Error Here') {
        state.error = payload;
      } else {
        state.error = '';
        if (payload?.access_token) {
          state.token = payload.access_token;
          state.tokenType = payload.token_type;
          state.refreshToken = payload.refresh_token;
        }
        if (payload?.user?.phone_number) {
          console.log('ok');
          state.canAuth = true;
          state.user = payload.user;
        }
      }
    },
    [AutoSignIn.fulfilled]: (state, {payload}) => {
      const {token, bearer, refreshToken, user} = payload;
      state.canAuth = true;
      state.token = token;
      state.tokenType = bearer;
      state.refreshToken = refreshToken;
      state.error = '';
      state.message = '';
      state.user = JSON.parse(user);
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
    [ProfileUpdate.fulfilled]: (state, {payload}) => {
      state.user = {...state.user, payload};
    },
  },
});

export default slice.reducer;
const {signOut, clearError} = slice.actions;
export {signOut, clearError};

import {createSlice} from '@reduxjs/toolkit';
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
    signOut: state => {
      state.auth = false;
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
          state.auth = true;
          state.user = payload.user;
        }
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
const {signOut, clearError} = slice.actions;
export {signOut, clearError};

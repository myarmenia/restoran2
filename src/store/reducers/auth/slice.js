import {createSlice} from '@reduxjs/toolkit';
import {
  AutoSignIn,
  Login,
  ProfileUpdate,
  Registration,
  SendCodeNum,
  SendPhone,
  SignOut,
  GetProfileData,
} from './action';

const initialState = {
  canAuth: false,
  token: '',
  tokenType: '',
  user: {},
  message: '',
  error: '',
  emailError: '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      const reserveState = state;
      reserveState.error = '';
      reserveState.emailError = '';
      return reserveState;
    },
  },
  extraReducers: {
    [Login.fulfilled]: (state, {payload}) => {
      if (payload === 'Error Here') {
        state.error = payload;
      } else {
        state.error = '';
        if (payload?.access_token) {
          state.token = payload?.access_token;
          state.tokenType = payload?.token_type;
          state.refreshToken = payload?.refresh_token;
        }
        if (payload?.user?.phone_number) {
          state.canAuth = true;
          state.user = payload?.user;
        }
      }
      return state;
    },
    [SignOut.fulfilled]: state => {
      state = initialState;
      return state;
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
      state.emailError = '';
    },
    [Registration.rejected]: state => {
      state.emailError = 'email';
    },
    [SendCodeNum.fulfilled]: (state, {payload}) => {
      if (payload.message === 'Your Phone Number Saved Success') {
        state.message = payload.message;
        state.canAuth = payload.canAuth;
        state.user = payload.user;
      }
    },
    [SendPhone.fulfilled]: state => {
      state.name = {...state.name};
    },
    [ProfileUpdate.fulfilled]: (state, {payload}) => {
      state.user = {...state.user, payload};
    },
    [GetProfileData.fulfilled]: (state, {payload}) => {
      state.user = payload;
    },
    [GetProfileData.rejected]: state => {
      state.error = 'error';
    },
  },
});

export default slice.reducer;
const {clearError} = slice.actions;
export {clearError};

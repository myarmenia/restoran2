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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  extraReducers: builder => {
    builder
      .addCase(Login.fulfilled, (state, {payload}) => {
        console.log('login', payload);
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
      })
      .addCase(SignOut.fulfilled, state => {
        state = initialState;
        return state;
      })
      .addCase(AutoSignIn.fulfilled, (state, {payload}) => {
        const {token, bearer, refreshToken, user} = payload;
        state.canAuth = true;
        state.token = token;
        state.tokenType = bearer;
        state.refreshToken = refreshToken;
        state.error = '';
        state.message = '';
        state.user = JSON.parse(user);
      })
      .addCase(Registration.fulfilled, state => {
        state.emailError = '';
        state.name = {...state.name};
      })
      .addCase(Registration.rejected, state => {
        state.emailError = 'email';
      })
      .addCase(SendCodeNum.fulfilled, async (state, {payload}) => {
        console.log(
          'message',
          payload.message === 'Your Phone Number Saved Success',
        );
        if (payload.message === 'Your Phone Number Saved Success') {
          state.message = payload.message;
          const userData = await AsyncStorage.getItem('user');
          const reserveUser = JSON.parse(userData);
          reserveUser.phone_number = payload.phone_number;
          state.canAuth = true;
          state.user = reserveUser;
          await AsyncStorage.clear();
        }
      })
      .addCase(SendPhone.fulfilled, state => {
        state.name = {...state.name};
      })
      .addCase(ProfileUpdate.fulfilled, state => {
        state = {...state};
      })
      .addCase(GetProfileData.fulfilled, (state, {payload}) => {
        state.user = payload;
      })
      .addCase(GetProfileData.rejected, state => {
        state.error = 'error';
      });
  },
});

export default slice.reducer;
const {clearError} = slice.actions;
export {clearError};

import {createSlice} from '@reduxjs/toolkit';
import {
  AutoSignIn,
  Login,
  ProfileUpdate,
  Registration,
  SendCodeNum,
  SendPhone,
  SignOut,
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
        console.log('besame1', state.canAuth);
        if (payload === 'Error Here') {
          console.log('besaem2');
          state.error = payload;
        } else {
          console.log('besaem3');
          state.error = '';
          if (payload?.access_token) {
            console.log('besaem4');
            state.token = payload?.access_token;
            state.tokenType = payload?.token_type;
            state.refreshToken = payload?.refresh_token;
          }
          if (payload?.user?.phone_number) {
            console.log('besaem5');
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
        state.message = payload.message;
        state.user.phone_number = payload.phone_number;
        const userData = await AsyncStorage.getItem('user');
        const reserveUser = JSON.parse(userData);
        reserveUser.phone_number = payload.phone_number;
        await AsyncStorage.setItem('user', JSON.stringify(reserveUser));
        state.auth = true;
        state.canAuth = true;
        state.user = reserveUser
      })
      .addCase(SendPhone.fulfilled, state => {
        state.name = {...state.name};
      })
      .addCase(ProfileUpdate.fulfilled, (state, {payload}) => {
        state.user = payload;
      });
  },
});

export default slice.reducer;
const {clearError} = slice.actions;
export {clearError};

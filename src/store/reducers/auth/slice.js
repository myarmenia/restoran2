import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Login, Registration, SendCodeNum, SendPhone} from "./action";

const initialState = {
  auth: false,
  token: "",
  tokenType: "",
  user: {},
  message: ""
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.auth = false;
      AsyncStorage.setItem("token", "");
      AsyncStorage.setItem("bearer", "");
      AsyncStorage.setItem("refreshToken", "");
      state.token = "";
      state.tokenType = "";
      state.refreshToken = "";
      state.user = {};
    },
  },
  extraReducers: {
    [Login.fulfilled]: (state, {payload}) => {
      if (payload["access_token"]) {
        AsyncStorage.setItem("token", payload["access_token"]);
        AsyncStorage.setItem("bearer", payload["token_type"]);
        AsyncStorage.setItem("refreshToken", payload["refresh_token"]);
      }
      if (!!payload?.user["phone_number"]) {
          state.auth = true;
      }
      state.token = payload["access_token"];
      state.tokenType = payload["token_type"];
      state.refreshToken = payload["refresh_token"];
      state.user = payload.user;
    },
    [Registration.fulfilled]: (state) => {
      state.name = { ...state.name };
    },
    [SendCodeNum.fulfilled]: (state, {payload}) => {
      state.message = payload.message;
      state.auth = true;
    },
    [SendPhone.fulfilled]: (state) => {
      state.name = { ...state.name };
    },
  },
});

export default slice.reducer;
const { signOut } = slice.actions;
export { signOut };

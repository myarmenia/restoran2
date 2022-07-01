import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login, Registration } from "./action";

const initialState = {
  auth: false,
  token: "",
  tokenType: "",
  user: {}
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.auth = false;
      AsyncStorage.setItem("token", "");
      AsyncStorage.setItem("bearer", "");
    },
  },
  extraReducers: {
    [Login.fulfilled]: (state, action) => {
      if (action.payload["access_token"]) {
        console.log('stegh em es');
        AsyncStorage.setItem("token", JSON.stringify(action.payload["access_token"]));
        AsyncStorage.setItem("bearer", JSON.stringify(action.payload["token_type"]));
      }
      if (!!action.payload["email_verified_at"]) {
          state.auth = true;
      }
      state.tokenType = action.payload["token_type"];
      state.refreshToken = action.payload["refresh_token"];
    },
    [Registration.fulfilled]: (state) => {
      state.name = { ...state.name };
    },
  },
});

export default slice.reducer;
const { signOut } = slice.actions;
export { signOut };

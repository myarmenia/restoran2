import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Login, Registration } from "./action";

const initialState = {
  auth: false,
  token: "",
  tokenType: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      console.log("mtaaaaa");
      state.auth = false;
      AsyncStorage.setItem("token", "");
    },
  },
  extraReducers: {
    [Login.fulfilled]: (state, action) => {
      if (action.payload["access_token"]) {
        AsyncStorage.setItem("token", action.payload["access_token"]);
      }
      state.auth = true;
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

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth/slice";
import HomeReducer from "./reducers/HomeReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AuthReducer from './reducers/auth/slice';
import restaurant from './reducers/restaurant/slice';
import support from './reducers/support/slice';
import HomeReducer from './reducers/HomeReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  home: HomeReducer,
  restaurant,
  support,
});

export const store = configureStore({
  reducer: rootReducer,
});

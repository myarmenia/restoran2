import {createSlice} from '@reduxjs/toolkit';
import { axiosInstance } from '../../request';

const initialState = {
  auth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const {changeStatus, resetAuth} = authSlice.actions
export default authSlice.reducer;



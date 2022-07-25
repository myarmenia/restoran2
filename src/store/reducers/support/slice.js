import {createSlice} from '@reduxjs/toolkit';
import {Feedback} from './action';

const initialState = {
  status: '',
  error: '',
};

const slice = createSlice({
  name: 'support',
  initialState,
  reducers: {},
  extraReducers: {
    [Feedback.fulfilled]: (state, {payload}) => {
      state.status = payload?.status;
    },
    [Feedback.rejected]: (state, {payload}) => {
      state.error = payload;
    },
  },
});

export default slice.reducer;

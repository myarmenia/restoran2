import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../../request';

export const Feedback = createAsyncThunk(
  'restaurant/Feedback',
  async (data, thunkAPI) => {
    console.log(data);
    const bearer = await AsyncStorage.getItem('bearer');
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axiosInstance.post(
        'feedback',
        {...data},
        {
          headers: {Authorization: `${bearer} ${token}`},
        },
      );
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

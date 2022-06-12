import {createSlice} from '@reduxjs/toolkit';
import { axiosInstance } from '../../request';

const initialState = {
  categories: [
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/burger.png'),
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/cake.png'),
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/fri.png'),
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/pizza.png'),
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/rols.png'),
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/spageti.png'),
    },
  ],
  restaurants: [
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: true,
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: true,
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: false,
    },
  ],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
});

export default homeSlice.reducer;




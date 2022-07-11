import {createSlice} from '@reduxjs/toolkit';
import {axiosInstance} from '../../request';

const initialState = {
  categories: [
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/burger.png'),
      navigate: 'ChooseTable',
      category: 'hamburger',
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/cake.png'),
      category: 'cake',
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/fri.png'),
      category: 'fri',
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/pizza.png'),
      category: 'pizza',
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/rols.png'),
      category: 'rols',
    },
    {
      id: Math.random(),
      img: require('../../assets/img/home/categories/spageti.png'),
      category: 'spageti',
    },
  ],
  restaurants: [
    {
      id: Math.random(),
      img: require('../../assets/img/home/restaurants/1.png'),
      choosed: false,
      categories: ['hamburger,spagetti'],
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

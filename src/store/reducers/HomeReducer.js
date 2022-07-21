import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: Math.random(),
      img: 'Европейская',
      category: 'Европейская',
    },
    {
      id: Math.random(),
      img: 'Русская',
      category: 'Русская',
    },
    {
      id: Math.random(),
      img: 'Американская',
      category: 'Американская',
    },
    {
      id: Math.random(),
      img: 'Грузинская',
      category: 'Грузинская',
    },
    {
      id: Math.random(),
      img: 'Итальянская',
      category: 'Итальянская',
    },
    {
      id: Math.random(),
      img: 'Японская',
      category: 'Японская',
    },
    {
      id: Math.random(),
      img: 'Корейская',
      category: 'Корейская',
    },
    {
      id: Math.random(),
      img: 'Азиатская',
      category: 'Азиатская',
    },
    {
      id: Math.random(),
      img: 'Кавказская',
      category: 'Кавказская',
    },
    {
      id: Math.random(),
      img: 'Армянская',
      category: 'Армянская',
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

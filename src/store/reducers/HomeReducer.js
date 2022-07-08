import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../request";

const initialState = {
  categories: [
    {
      id: Math.random(),
      img: require("../../assets/img/home/categories/burger.png"),
      navigate: "ChooseTable",
      desc: "hamburger",
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/categories/cake.png"),
      desc: "cake",
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/categories/fri.png"),
      desc: "fri",
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/categories/pizza.png"),
      desc: "pizza",
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/categories/rols.png"),
      desc: "rols",
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/categories/spageti.png"),
      desc: "spageti",
    },
  ],
  restaurants: [
    {
      id: Math.random(),
      img: require("../../assets/img/home/restaurants/1.png"),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/restaurants/1.png"),
      choosed: true,
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/restaurants/1.png"),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/restaurants/1.png"),
      choosed: true,
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/restaurants/1.png"),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/restaurants/1.png"),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/restaurants/1.png"),
      choosed: false,
    },
    {
      id: Math.random(),
      img: require("../../assets/img/home/restaurants/1.png"),
      choosed: false,
    },
  ],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
});

export default homeSlice.reducer;

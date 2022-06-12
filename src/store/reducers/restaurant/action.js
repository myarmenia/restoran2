import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";



export const Restaurant = createAsyncThunk(
  "restaurant",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(`restaurant`);
      console.log('aaa',response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue("inch vor arjeq");
    }
    
  }
);



export const Restaurants = createAsyncThunk(
  "restaurant/{id}",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(`restaurant/${data?.id}`);
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("inch vor arjeq");
    }
  }
);

export const Menu = createAsyncThunk(
  "menu/{id}",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      console.log("mta1");
      const response = await axiosInstance.get(`restaurant/menu/${data?.id}`);
      console.log(response.data);
      return response.data;
    } catch {
      console.log("mta2");
      return thunkAPI.rejectWithValue("inch vor arjeq");
    }
  }
);

export const Menus = createAsyncThunk(
  "categories/{id}",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get("restaurant/menu/categories/${data?.id}");
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);

export const MenusByMenuID = createAsyncThunk(
  "restaurant/menu/single/{id}",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(
        `restaurant/menu/single/${data?.id}`
      );
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);

export const Kitchen = createAsyncThunk(
  "restaurant/kitchen",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get("restaurant/kitchen");
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);

export const Orders = createAsyncThunk(
  "order",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get("order", {
        headers: { Authorization: `Bearer: ${AsyncStorage.getItem("token")}` },
      });
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);


export const orderStore = createAsyncThunk(
  "order/store",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("order/store", {
        headers: { Authorization: `Bearer: ${AsyncStorage.getItem("token")}` },
      });
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);


export const Favorite = createAsyncThunk(
  "restaurant/favorites",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get("restaurant/favorites", {
        headers: { Authorization: `Bearer: ${AsyncStorage.getItem("token")}` },
      });
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);

export const Favorites = createAsyncThunk(
  "restaurant/favorites/{id}",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.patch("restaurant/favorites/${data?.id}", {
        headers: { Authorization: `Bearer: ${AsyncStorage.getItem("token")}` },
      });
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);


export const Preference = createAsyncThunk(
  "menu/preference",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get("menu/preference", {
        headers: { Authorization: `Bearer: ${AsyncStorage.getItem("token")}` },
      });
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);


export const Preferences = createAsyncThunk(
  "menu/preference/{id}",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.patch("menu/preference/${data?.id}", {
        headers: { Authorization: `Bearer: ${AsyncStorage.getItem("token")}` },
      });
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);



export const Feedback = createAsyncThunk(
  "feedback",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("feedback", {
        headers: { Authorization: `Bearer: ${AsyncStorage.getItem("token")}` },
      });
      console.log(response.data);
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue("voreve arjeq");
    }
  }
);



export const postDataApi = createAsyncThunk("", async (url, post, token) => {
  const res = await axiosInstance.post(`/api/${url}`, post, {
    headers: { Authorization: `Bearer: ${AsyncStorage.getItem("token")}` },
  });

  return res.data;
});



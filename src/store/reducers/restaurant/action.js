import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../request";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Restaurant = createAsyncThunk(
  "restaurant/Restaurant",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.get(`restaurant`);
      console.log('aaa',response.data);
      return response.data.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue("inch vor arjeq");
    }

  }
);



export const Restaurants = createAsyncThunk(
  "restaurant/Restaurants",
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
  "restaurant/Menu",
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
  "restaurant/Menus",
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
  "restaurant/MenusByMenuID",
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
  "restaurant/Kitchen",
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
  "restaurant/Orders",
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
  "restaurant/orderStore",
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
  "restaurant/Favorite",
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
  "restaurant/Favorites",
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
  "restaurant/Preference",
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
  "restaurant/Preferences",
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
  "restaurant/Feedback",
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



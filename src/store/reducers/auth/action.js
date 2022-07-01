import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../../request";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = createAsyncThunk("auth/Login", async (data) => {
  try {
    console.log(data);
    const response = await axiosInstance.post("get_pass", {
      ...data,
    });
    console.log(response.data);
    return response.data;
  } catch {
    console.log("something went wrong during login thunk");
    thunkAPI.rejectWithValue("some value");
  }
});
export const SendCode = createAsyncThunk("auth/SendCode", async (data) => {
  const bearer = await AsyncStorage.getItem("bearer");
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axiosInstance.post("phone/check", {
      ...data,
      headers: { Authorization: `${bearer}: ${token}` },
    });
    console.log(response.data);
    return response.data;
  } catch {
    console.log("something went wrong during login thunk");
    thunkAPI.rejectWithValue("some value");
  }
});


export const SendPhone = createAsyncThunk("auth/SendPhone", async (data) => {
  const bearer = await AsyncStorage.getItem("bearer");
  const token = await AsyncStorage.getItem("token");
  console.log('num', data, bearer, token);
  try {
    const response = await axiosInstance.get("phone/register", {
      ...data,
      headers: { Authorization: `${bearer}: ${token}` },
    });
    console.log(response.data);
    return response.data;
  } catch {
    console.log("something went wrong during login thunk");
    thunkAPI.rejectWithValue("some value");
  }
});

export const Registration = createAsyncThunk(
  "auth/Registration",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("register", {
        ...data,
      });
      console.log("reg ----> ", response.data);
      return response.data;
    } catch (e) {
      console.log("error -----> ", e.message);
      return thunkAPI.rejectWithValue("inch vor arjeq");
    }
  }
);


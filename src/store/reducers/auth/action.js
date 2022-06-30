import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../../request";

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
  try {
    console.log(data);
    const response = await axiosInstance.post("phone/check", {
      ...data,
    });
    console.log(response.data);
    return response.data;
  } catch {
    console.log("something went wrong during login thunk");
    thunkAPI.rejectWithValue("some value");
  }
});


export const SendPhone = createAsyncThunk("auth/SendPhone", async (data) => {
  try {
    console.log(data);
    const response = await axiosInstance.get("phone/register", {
      ...data,
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


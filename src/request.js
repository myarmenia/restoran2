import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://back.tap-table.ru/api/";
const token = AsyncStorage.getItem("token")
  ? AsyncStorage.getItem("token")
  : null;

export const axiosInstance = axios.create({
  baseURL,
});


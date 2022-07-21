import axios from 'axios';

const baseURL = 'https://back.tap-table.ru/api/';
export const axiosInstance = axios.create({
  baseURL,
});

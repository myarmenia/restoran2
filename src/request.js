import axios from 'axios';

const baseURL = 'https://tap-table.ru/api/';
export const axiosInstance = axios.create({
  baseURL,
});

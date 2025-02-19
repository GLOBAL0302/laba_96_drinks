import axios from 'axios';
import { apiUrl } from './GlobalConstant.ts';

export const axiosApi = axios.create({
  baseURL:apiUrl
})
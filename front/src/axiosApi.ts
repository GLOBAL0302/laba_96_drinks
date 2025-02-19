import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { apiUrl } from './GlobalConstant.ts';
import { RootState } from './store/app.ts';
import { Store } from '@reduxjs/toolkit';

export const axiosApi = axios.create({
  baseURL: apiUrl,
});

export const addInteceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users?.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);

    console.log(token);
    return config;
  });
};

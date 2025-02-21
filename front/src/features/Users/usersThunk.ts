import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  IGlobalError,
  ILoginMutation,
  IRegisterMutation,
  IRegisterResponse,
  IUser,
  IValidationError,
} from '../../types';
import { isAxiosError } from 'axios';
import { axiosApi } from '../../axiosApi.ts';

export const googleLogin = createAsyncThunk<IUser, string, { rejectValue: IGlobalError }>(
  'user/googleLogin',
  async (credential, { rejectWithValue }) => {
    console.log(credential);
    try {
      const response = await axiosApi.post('users/google', { credential });
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const signUpUserThunk = createAsyncThunk<
  IRegisterResponse,
  IRegisterMutation,
  { rejectValue: IValidationError }
>('users/signUpUsersThunk', async (registerMutation: IRegisterMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(registerMutation) as (keyof typeof registerMutation)[];
    keys.forEach((key) => {
      if (registerMutation[key]) {
        formData.append(key, registerMutation[key]);
      }
    });
    const response = await axiosApi.post<IRegisterResponse>('/users/register', formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

export const signInThunk = createAsyncThunk<IUser, ILoginMutation, { rejectValue: IGlobalError }>(
  'users/signInThunk',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<IRegisterResponse>('users/sessions', loginMutation);
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as IGlobalError);
      }
      throw error;
    }
  },
);

export const logOutThunk = createAsyncThunk('users/logOutThunk', async () => {
  await axiosApi.delete('/users/logout');
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICocktails, ITest } from '../../types';
import { axiosApi } from '../../axiosApi.ts';
import { RootState } from '../../store/app.ts';

export const fetchAllCocktailsThunk = createAsyncThunk<
  ICocktails[],
  void,
  {
    state: RootState;
  }
>('cocktails/fetchAllCocktails', async (_arg, thunkAPI) => {
  let response;
  let role = thunkAPI.getState().users?.user?.role;
  response = await axiosApi.get(`/cocktails?role=${role}`);
  return response.data;
});

export const submitCocktailThunk = createAsyncThunk<void, ITest>(
  'cocktails/submitCocktailThunk',
  async (cocktailMutation) => {
    const formData = new FormData();
    const keys = Object.keys(cocktailMutation) as (keyof ITest)[];
    keys.forEach((key) => {
      if (cocktailMutation[key]) {
        formData.append(key, cocktailMutation[key]);
      }
    });

    const response = await axiosApi.post('/cocktails', formData);
    return response.data;
  },
);

export const deleteOneCocktailThunk = createAsyncThunk<void, string>('cocktails/deleteOne', async (id) => {
  await axiosApi.delete(`/cocktails/${id}`);
});

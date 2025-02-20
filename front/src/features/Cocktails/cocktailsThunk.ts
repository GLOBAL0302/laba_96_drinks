import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICocktails, ITest } from '../../types';
import { axiosApi } from '../../axiosApi.ts';

export const fetchAllCocktailsThunk = createAsyncThunk<ICocktails[], void>('cocktails/fetchAllCocktails', async () => {
  const response = await axiosApi.get('/cocktails');
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

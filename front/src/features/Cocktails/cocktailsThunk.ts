import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITest } from '../../types';
import { axiosApi } from '../../axiosApi.ts';

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

    console.log(formData);
    const response = await axiosApi.post('/cocktails', formData);
    return response.data;
  },
);

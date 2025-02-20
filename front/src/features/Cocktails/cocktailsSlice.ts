import { ICocktails } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCocktailsThunk, submitCocktailThunk } from './cocktailsThunk.ts';

interface CocktailsState {
  cocktails: ICocktails[];
  cocktailLoading: boolean;
  cocktailsSubmitting: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  cocktailLoading: false,
  cocktailsSubmitting: false,
};

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitCocktailThunk.pending, (state) => {
        state.cocktailLoading = true;
      })
      .addCase(submitCocktailThunk.fulfilled, (state) => {
        state.cocktailLoading = false;
      })
      .addCase(submitCocktailThunk.rejected, (state) => {
        state.cocktailLoading = false;
      });

    builder
      .addCase(fetchAllCocktailsThunk.pending, (state) => {
        state.cocktailLoading = true;
      })
      .addCase(fetchAllCocktailsThunk.fulfilled, (state, { payload }) => {
        state.cocktailLoading = false;
        state.cocktails = payload;
      })
      .addCase(fetchAllCocktailsThunk.rejected, (state) => {
        state.cocktailLoading = false;
      });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectCocktailsLoading: (state) => state.cocktailLoading,
    selectCocktailsSubmitting: (state) => state.cocktailsSubmitting,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const { selectCocktails, selectCocktailsSubmitting, selectCocktailsLoading } = cocktailsSlice.selectors;

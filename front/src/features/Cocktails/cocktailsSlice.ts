import { ICocktails } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { deleteOneCocktailThunk, fetchAllCocktailsThunk, submitCocktailThunk } from './cocktailsThunk.ts';

interface CocktailsState {
  cocktails: ICocktails[];
  cocktailLoading: boolean;
  cocktailsSubmitting: boolean;
  cocktailDeleting: boolean;
}

const initialState: CocktailsState = {
  cocktails: [],
  cocktailLoading: false,
  cocktailsSubmitting: false,
  cocktailDeleting: false,
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

    builder
      .addCase(deleteOneCocktailThunk.pending, (state) => {
        state.cocktailDeleting = true;
      })
      .addCase(deleteOneCocktailThunk.fulfilled, (state) => {
        state.cocktailDeleting = false;
      })
      .addCase(deleteOneCocktailThunk.rejected, (state) => {
        state.cocktailDeleting = false;
      });
  },
  selectors: {
    selectCocktails: (state) => state.cocktails,
    selectCocktailsLoading: (state) => state.cocktailLoading,
    selectCocktailsSubmitting: (state) => state.cocktailsSubmitting,
    selectCocktailDeleting: (state) => state.cocktailDeleting,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const { selectCocktails, selectCocktailDeleting, selectCocktailsSubmitting, selectCocktailsLoading } =
  cocktailsSlice.selectors;

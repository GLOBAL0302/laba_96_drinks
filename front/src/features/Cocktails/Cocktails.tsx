import { Grid2 } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllCocktailsThunk } from './cocktailsThunk.ts';
import { selectCocktails } from './cocktailsSlice.ts';
import Cocktail from './Cocktail.tsx';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);

  const getCocktails = useCallback(async () => {
    await dispatch(fetchAllCocktailsThunk());
  }, []);

  useEffect(() => {
    void getCocktails();
  }, []);
  return (
    <Grid2 container gap={3}>
      {cocktails.map((item) => (
        <Grid2
          key={item._id}
          sx={{
            borderRadius: 10,
            padding: 3,
            border: '3px solid brown',
          }}
        >
          <Cocktail cocktail={item} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Cocktails;

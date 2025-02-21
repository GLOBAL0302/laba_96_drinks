import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { selectCocktails } from './cocktailsSlice.ts';
import { Button, CardMedia, Grid2, Typography } from '@mui/material';
import { apiUrl } from '../../GlobalConstant.ts';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import { selectUser } from '../Users/usersSlice.ts';
import { deleteOneCocktailThunk } from './cocktailsThunk.ts';

const OneCocktailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const cocktail = useAppSelector(selectCocktails).filter((item) => item._id === id)[0];
  const pic = apiUrl + '/' + cocktail.image;
  const navigate = useNavigate();

  const deleteCocktail = async () => {
    if (id) await dispatch(deleteOneCocktailThunk(id));
    navigate('/');
  };

  return (
    <Grid2>
      <Grid2 container>
        <Grid2>
          <CardMedia
            component="img"
            sx={{
              height: '20rem',
              width: '20rem',
            }}
            title={cocktail.title}
            image={pic}
          />
        </Grid2>
        <Grid2 spacing={2}>
          <Typography component="h5" variant="h5">
            {cocktail.title}
          </Typography>
          <Grid2>
            <strong>ingredients:</strong>
            {cocktail.ingredients.map((ingredient, index) => (
              <Grid2 key={ingredient._id}>
                <Typography>
                  {index + 1}) {ingredient.title} {ingredient.amount}
                </Typography>
              </Grid2>
            ))}
          </Grid2>
          {user?.role === 'admin' && (
            <Button
              onClick={deleteCocktail}
              variant="outlined"
              color="error"
              size="large"
              endIcon={<DeleteOutlineSharpIcon />}
            >
              Delete
            </Button>
          )}
        </Grid2>
      </Grid2>
      <Grid2>
        <strong>Recipe:</strong>
        <br />
        {cocktail.recipe}
      </Grid2>
    </Grid2>
  );
};

export default OneCocktailPage;

import { ICocktailMutation } from '../../types';
import { ChangeEvent, useState } from 'react';
import { Avatar, Box, Button, Divider, Grid2, TextField, Typography } from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { useAppDispatch } from '../../store/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastifySuccess } from '../../GlobalConstant.ts';
import { submitCocktailThunk } from './cocktailsThunk.ts';
import CloseIcon from '@mui/icons-material/Close';

const initialState: ICocktailMutation = {
  title: '',
  ingredients: [
    {
      title: '',
      amount: '',
    },
  ],
  recipe: '',
  image: null,
};

const AddCocktails = () => {
  const [cocktailForm, setCocktailForm] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const index = parseInt(name.replace(/\D/g, ''), 10);

    if (!isNaN(index)) {
      setCocktailForm((prevState) => {
        const updatedIngredients = [...prevState.ingredients];
        if (name.startsWith('title')) {
          updatedIngredients[index].title = value;
        } else if (name.startsWith('amount')) {
          updatedIngredients[index].amount = value;
        }
        return {
          ...prevState,
          ingredients: updatedIngredients,
        };
      });
    } else {
      setCocktailForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setCocktailForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const onClickAddReceipt = () => {
    setCocktailForm((prevState) => ({
      ...prevState,
      ingredients: [...prevState.ingredients, { title: '', amount: '' }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCocktailMutation = { ...cocktailForm, ingredients: JSON.stringify(cocktailForm.ingredients) };
    await dispatch(submitCocktailThunk(newCocktailMutation)).unwrap();
    toast.info('Under Review, please wait...', toastifySuccess);
    navigate('/');
  };

  const removeOneIngredient = (index: number) => {
    const ingredientDeleted = cocktailForm.ingredients;
    ingredientDeleted.splice(index, 1);
    setCocktailForm((prevState) => ({
      ...prevState,
      ingredients: ingredientDeleted,
    }));
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ p: 1, bgcolor: 'secondary.main', size: 'large' }}>
          <LocalBarIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cocktail Receipt
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container direction={'column'} spacing={2}>
            <Grid2>
              <TextField
                required
                onChange={handleChange}
                fullWidth
                value={cocktailForm.title}
                name="title"
                label="Title"
                type="text"
                id="title"
              />
            </Grid2>
            <Grid2
              sx={{
                maxHeight: '250px',
                overflow: 'scroll',
              }}
            >
              <Divider sx={{ marginBottom: 2 }} textAlign="left">
                <Typography>Receipts</Typography>
              </Divider>

              {cocktailForm.ingredients.map((ingredient, index) => (
                <Grid2 container alignItems="center" gap={1} marginBottom={2} key={index}>
                  <Grid2>
                    <TextField
                      required
                      onChange={handleChange}
                      value={ingredient.title}
                      name={`title${index}`}
                      label="Title"
                      type="text"
                      id={`title${index}`}
                    />
                  </Grid2>
                  <Grid2>
                    <TextField
                      required
                      onChange={handleChange}
                      value={ingredient.amount}
                      name={`amount${index}`}
                      label="amount"
                      type="text"
                      id={`amount${index}`}
                    />
                  </Grid2>
                  <Button
                    onClick={() => removeOneIngredient(index)}
                    type="button"
                    color="error"
                    endIcon={<CloseIcon />}
                  />
                </Grid2>
              ))}

              <Divider textAlign="right">
                <Typography>Receipts</Typography>
              </Divider>
            </Grid2>
            <Button
              onClick={onClickAddReceipt}
              type="button"
              variant="contained"
              color="success"
              sx={{ marginLeft: 'auto' }}
            >
              add recipe
            </Button>
            <Grid2>
              <TextField
                required
                onChange={handleChange}
                fullWidth
                value={cocktailForm.recipe}
                name="recipe"
                label="Recipe"
                type="text"
                id="recipe"
              />
            </Grid2>
            <Grid2>
              <FileInput onGetFile={onChangeFile} name="image" label="image" />
            </Grid2>
          </Grid2>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit Cocktail
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddCocktails;

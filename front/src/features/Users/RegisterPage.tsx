import { Avatar, Box, Button, Container, Grid2, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { IRegisterMutation } from '../../types';
import { googleLogin, signUpUserThunk } from './usersThunk.ts';

import { selectRegisterError } from './usersSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { GoogleLogin } from '@react-oauth/google';

const initialState = {
  email: '',
  password: '',
  displayName: '',
  avatar: null,
};

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState<IRegisterMutation>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(signUpUserThunk(userForm)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setUserForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ p: 1, bgcolor: 'secondary.main', size: 'large' }}>
            <LockPersonIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ pt: 2 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
              onError={() => alert('Login failed with credential response: ')}
            />
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid2 container direction={'column'} size={12} spacing={2}>
              <Grid2 size={12}>
                <TextField
                  onChange={handleChange}
                  value={userForm.email}
                  name="email"
                  fullWidth
                  id="email"
                  label="email"
                  error={Boolean(getFieldError('email'))}
                  helperText={getFieldError('email')}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  onChange={handleChange}
                  value={userForm.displayName}
                  name="displayName"
                  fullWidth
                  id="displayName"
                  label="Display name"
                  error={Boolean(getFieldError('displayName'))}
                  helperText={getFieldError('displayName')}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  onChange={handleChange}
                  fullWidth
                  value={userForm.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                />
              </Grid2>
              <Grid2>
                <FileInput onGetFile={onChangeFile} name="avatar" label="avatar" />
              </Grid2>
            </Grid2>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid2 container justifyContent="flex-end">
              <Grid2>
                <NavLink to={'/login'}>Already have an account? Sign in</NavLink>
              </Grid2>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterPage;

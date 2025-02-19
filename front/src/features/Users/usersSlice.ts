import { IGlobalError, IUser, IValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, signInThunk, signUpUserThunk } from './usersThunk.ts';

interface UsersState {
  user: IUser | null;
  registerLoading: boolean;
  registerError: IValidationError | null;
  loginLoading: boolean;
  loginError: IGlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserThunk.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(signUpUserThunk.fulfilled, (state, { payload: IRegisterResponse }) => {
        state.user = IRegisterResponse.user;
        state.registerLoading = false;
      })
      .addCase(signUpUserThunk.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      });
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(signInThunk.rejected, (state, { payload: error }) => {
        state.loginError = error || null;
        state.loginLoading = false;
      });

    builder
      .addCase(googleLogin.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(googleLogin.rejected, (state, { payload: error }) => {
        state.loginError = error || null;
        state.loginLoading = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;
export const { selectUser, selectLoginLoading, selectRegisterLoading, selectRegisterError, selectLoginError } =
  usersSlice.selectors;

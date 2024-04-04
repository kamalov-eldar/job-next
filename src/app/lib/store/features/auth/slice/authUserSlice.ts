import { type PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthUser, fetchDeleteUser } from '../api/data';
import { AuthApiResponse, AuthUserSchema, LoginData, RegistrData } from '../types/authUserChema';
import { createAppSlice } from '../../../createAppSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';

const initialState: AuthUserSchema = {
  status: 'idle',
  authUser: null,
  error: null,
};

export const authUserSlice = createAppSlice({
  name: 'authUser',
  initialState,
  reducers: (create) => ({
    logoutUser: create.reducer((state) => {
      state.authUser = null;
    }),
    registrUser: create.asyncThunk<AuthApiResponse, RegistrData>(
      async (registrData, thunkApi) => {
        try {
          const res = await axios.post<AuthApiResponse>('https://6ede402e6a352dfb.mokky.dev/register', registrData);
          return res.data;
        } catch (error) {
          const err = error as AxiosError;
          return thunkApi.rejectWithValue({
            message: 'Ошибка в обработке запроса: ' + err.message,
            additionalMessage: (err.response as AxiosResponse)?.data.message,
            code: err.status || (err.response as AxiosResponse)?.data.statusCode,
          });
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        fulfilled: (state, action: PayloadAction<AuthApiResponse>) => {
          state.status = 'idle';
          state.error = null;
          state.authUser = action.payload.data;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
    loginUser: create.asyncThunk<AuthApiResponse, LoginData>(
      async (loginData, thunkApi) => {
        try {
          const response = await fetchAuthUser(loginData);
          return response;
        } catch (error) {
          const err = error as AxiosError;
          return thunkApi.rejectWithValue({
            message: 'Ошибка в обработке запроса: ' + err.message,
            additionalMessage: (err.response as AxiosResponse)?.data.message,
            code: err.status || (err.response as AxiosResponse)?.data.statusCode,
          });
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        fulfilled: (state, action: PayloadAction<AuthApiResponse>) => {
          state.status = 'idle';
          state.error = null;
          state.authUser = action.payload.data;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
    deleteUser: create.asyncThunk<void, string>(
      async (userId, thunkApi) => {
        try {
          const response = await fetchDeleteUser(userId);
          return response;
        } catch (error) {
          const err = error as AxiosError;
          return thunkApi.rejectWithValue({
            message: 'Ошибка в обработке запроса: ' + err.message,
            additionalMessage: (err.response as AxiosResponse)?.data.message,
            code: err.status || (err.response as AxiosResponse)?.data.statusCode,
          });
        }
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        rejected: (state, action) => {
          state.status = 'error';
          state.error = action.error;
        },
        fulfilled: (state) => {
          state.status = 'idle';
          state.authUser = null;
        },
        // settled вызывается как за отклоненные, так и за выполненные действия
        settled: (state) => {
          state.status = 'idle';
        },
      }
    ),
  }),
  selectors: {
    selectAuthUser: (state) => state.authUser,
    selectStatusAuth: (state) => state.status,
  },
});

export const { loginUser, logoutUser, deleteUser, registrUser } = authUserSlice.actions;
export const { selectAuthUser } = authUserSlice.selectors;
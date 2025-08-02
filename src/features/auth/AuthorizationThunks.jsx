import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../config/api';

export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (userData) => {
    try {
      const response = await loginUser(userData);
      return response.data;
    } catch (error) {
      console.log('Kesalahan dari API login:', error.response.data.message);
      throw error.response.data.message;
    }
  }
);

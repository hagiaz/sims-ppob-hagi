/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Topup, Transaction, API } from '../../config/api';
import { setAuthToken } from '../../config/api';
import Swal from 'sweetalert2';

export const TopUpAsync = createAsyncThunk(
  'transaction/topUp',
  async (payload) => {
    setAuthToken(localStorage.getItem('authToken'));
    try {
      const response = await Topup(payload);
      return response.data.data;
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Gagal Top Up',
        text: error.response?.data?.message || 'Terjadi kesalahan',
      });
      throw error.response?.data?.message || error.message;
    }
  }
);

export const payTransactionAsync = createAsyncThunk(
  'transaction/payTransaction',
  async (payload) => {
    setAuthToken(localStorage.getItem('authToken'));
    try {
      const response = await Transaction(payload);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
);

export const fetchTransactionListAsync = createAsyncThunk(
  'transaction/fetchTransactionList',
  async (offset = 0) => {
    setAuthToken(localStorage.getItem('authToken'));
    try {
      const response = await API.get(`/transaction/history?offset=${offset}&limit=5`);
      return { data: response.data.data, offset };
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
);

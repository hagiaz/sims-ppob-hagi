import { createSlice } from '@reduxjs/toolkit';
import {
  TopUpAsync,
  payTransactionAsync,
  fetchTransactionListAsync,
} from './TransactionThunks';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    history: [],
    offset: 0,
    balance: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TopUpAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.balance = action.payload;
      })
      .addCase(payTransactionAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.balance = action.payload;
      })
      .addCase(payTransactionAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTransactionListAsync.fulfilled, (state, action) => {
        state.status = 'success';
        const { data, offset } = action.payload;
        if (offset === 0) {
          state.history = data.records;
        } else {
          state.history = [...state.history, ...data.records];
        }
        state.offset = offset + 5;
      })
      .addCase(fetchTransactionListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;

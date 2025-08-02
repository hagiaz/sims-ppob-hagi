import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { loginUserAsync, registerUserAsync } from './AuthorizationThunks';

const authAdapter = createEntityAdapter();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...authAdapter.getInitialState(),
    status: 'idle',
    error: null,
    message: null,
    token: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        authAdapter.addOne(state, action.payload);
        state.status = 'success';
        state.message = action.payload.message;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = action.payload.message;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { selectAll: selectAllAuth } = authAdapter.getSelectors((state) => state.auth);

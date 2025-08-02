import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  fetchProfile,
  editProfileAsync,
  editProfileImageAsync,
  fetchBalance,
  fetchServices,
  fetchBanner,
  TopUpMoney,
  TransactioAsync,
  listTransactionAsync,
} from "./ProfilThunks";

const profileAdapter = createEntityAdapter();

const initialState = {
  ...profileAdapter.getInitialState(),
  data: null,
  balance: null,
  services: null,
  banner: null,
  transaction: [],
  offset: 0,
  error: null,
  status: "idle",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(editProfileAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editProfileAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(editProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editProfileImageAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editProfileImageAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(editProfileImageAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "success";
        state.balance = action.payload.balance;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "success";
        state.services = action.payload.data;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.status = "success";
        state.banner = action.payload;
      })
      .addCase(TopUpMoney.fulfilled, (state, action) => {
        state.status = "success";
        state.balance = action.payload;
      })
      .addCase(TransactioAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.balance = action.payload;
      })
      .addCase(TransactioAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(listTransactionAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.transaction = action.payload;
        state.offset = action.payload.offset + 5;
      });
  },
});

export default profileSlice.reducer;
export const { selectAll: selectAllprofiles } = profileAdapter.getSelectors(
  (state) => state.profile
);

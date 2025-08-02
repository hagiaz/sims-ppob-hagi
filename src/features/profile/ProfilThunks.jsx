/* eslint-disable react-refresh/only-export-components */

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  profile,
  profileEdit,
  ProfileEditImage,
  Balance,
  Services,
  Banner,
  Topup,
  Transaction,
  API,
  setAuthToken,
} from "../../config/api";
import Swal from "sweetalert2";

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  setAuthToken(localStorage.getItem("authToken"));
  const response = await profile();
  return response.data.data;
});

export const editProfileAsync = createAsyncThunk("profile/editProfile", async (profileData, { rejectWithValue }) => {
  try {
    setAuthToken(localStorage.getItem("authToken"));
    const response = await profileEdit(profileData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Gagal edit profil");
  }
});

export const editProfileImageAsync = createAsyncThunk("profile/editProfileImage", async (formData, { rejectWithValue }) => {
  try {
    setAuthToken(localStorage.getItem("authToken"));
    const response = await ProfileEditImage(formData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Gagal edit foto profil");
  }
});

export const fetchBalance = createAsyncThunk("profile/fetchBalance", async () => {
  setAuthToken(localStorage.getItem("authToken"));
  const response = await Balance();
  return response.data.data;
});

export const fetchServices = createAsyncThunk("profile/fetchServices", async () => {
  setAuthToken(localStorage.getItem("authToken"));
  const response = await Services();
  return response.data;
});

export const fetchBanner = createAsyncThunk("profile/fetchBanner", async () => {
  setAuthToken(localStorage.getItem("authToken"));
  const response = await Banner();
  return response.data.data;
});

export const TopUpMoney = createAsyncThunk("profile/topup", async (formData, { rejectWithValue }) => {
  try {
    setAuthToken(localStorage.getItem("authToken"));
    const response = await Topup(formData);
    return response.data.data;
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Gagal Top Up",
      text: error.response?.data?.message || "Terjadi kesalahan saat top up",
    });
    return rejectWithValue(error.response?.data?.message);
  }
});

export const TransactioAsync = createAsyncThunk("profile/transaction", async (formData, { rejectWithValue }) => {
  try {
    setAuthToken(localStorage.getItem("authToken"));
    const response = await Transaction(formData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Transaksi gagal");
  }
});

export const listTransactionAsync = createAsyncThunk("profile/listTransaction", async (offset = 0, { rejectWithValue }) => {
  try {
    setAuthToken(localStorage.getItem("authToken"));
    const response = await API.get(`/transaction/history?offset=${offset}&limit=5`);
    return { data: response.data.data, offset };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Gagal memuat riwayat transaksi");
  }
});
